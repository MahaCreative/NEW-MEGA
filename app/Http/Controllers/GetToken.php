<?php

namespace App\Http\Controllers;

use App\Models\DetailPesanan;
use App\Models\Invoice;
use App\Models\Pesanan;
use Illuminate\Http\Request;

class GetToken extends Controller
{
    public function create_token(Request $request)
    {
        \Midtrans\Config::$serverKey = config('midtrans.MID_SERVER_KEY');
        // Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
        \Midtrans\Config::$isProduction = false;
        // Set sanitization on (default)
        \Midtrans\Config::$isSanitized = true;
        // Set 3DS transaction for credit card to true
        \Midtrans\Config::$is3ds = true;

        $pesanan = Pesanan::where('kd_pesanan', $request->kd_pesanan)->with('user', 'detail')->first();
        if ($pesanan->waktu_perencanaan == null) {
            $request->validate(['waktu_kunjungan' => 'required|date|after:now']);
            $pesanan->update([
                'waktu_perencanaan' => $request->waktu_kunjungan,
            ]);
        }
        $token = null;
        // cek apakan token pesanan sudah terbuat
        if ($pesanan->token) {
            $token = $pesanan->token;
        } else {
            // jika belum ada token maka akan membuat token
            $params = array(
                'transaction_details' => array(
                    'order_id' => $pesanan->kd_pesanan,
                    'gross_amount' => $pesanan->total_harga,
                ),
                'customer_details' => array(
                    'first_name' => $pesanan->user->firstname,
                    'last_name' => $pesanan->user->lastname,
                    'email' => $pesanan->user->email,
                    'phone' => $pesanan->user->no_hp,
                ),
                'item_details' => $pesanan->detail->map(fn ($item) => [
                    'id' => $item->paket_wisata_id,
                    'price' => $item->harga_paket,
                    'name' => $item->nama_paket,
                    'quantity' => 1,
                ])
            );
            $snapToken = \Midtrans\Snap::getSnapToken($params);
            $token = $snapToken;
            $pesanan->update([
                'token' => $token,
            ]);
        }

        return redirect()->back();
    }

    public function callback_after_payment(Request $request)
    {
        $serverKey = config('midtrans.MID_SERVER_KEY');
        $hashed = hash('sha512', $request->order_id . $request->status_code . $request->gross_amount . $serverKey);

        if ($hashed == $request->signature_key) {
            if ($request->transaction_status == 'capture' or $request->transaction_status == 'settlement') {
                $pesanan = Pesanan::with('user')->where('kd_pesanan', $request->order_id)->first();
                $detail = DetailPesanan::where('pesanan_id', $pesanan->id)->latest()->get();
                $invoice = Invoice::create([
                    'user_id' => $pesanan->user_id,
                    'order_id' => $request->order_id,
                    'total_pembayaran' => $request->gross_amount,
                    'payment_info' => $detail,

                    'payment_type' => $request->payment_type,
                    'succeeded_at' => now(),
                    'snap_token' => $pesanan->token,
                    'status' => $request->transaction_status,
                ]);
                $pesanan->update([
                    'payment_at' => now(),
                    'status_pembayaran' => $request->transaction_status,
                ]);
                $message = array(
                    // 'target' => "082397722566",
                    'target' => "085334703299",
                    'message' => "
Halo Admin, ada calon pengunjung yang telah melakukan pembayaran pesanan paket dengan detail seperti berikut
    *order_id:{$pesanan->kd_pesanan}*
    *Jumlah Paket:{$pesanan->total_pesanan}*
    *Total Pembayaran:{$request->gross_amount}*
    *Nama:{$pesanan->user->firstname} {$pesanan->user->lastname}*
    *No. HP:{$pesanan->user->no_hp}*

Silahkan menghubungi pelanggan yang tertera diatas untuk mengetahui informasi lebih lanjut.

*Terima Kasi*

",
                    'countryCode' => '62', //optional
                );
                $this->sendMessage($message);
            }
        }
    }

    public function sendMessage($message)
    {
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://api.fonnte.com/send',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => $message,
            CURLOPT_HTTPHEADER => array(
                'Authorization: AiND+5eFUBHjS53uWzB5' //change TOKEN to your actual token
            ),
        ));

        $response = curl_exec($curl);
        if (curl_errno($curl)) {
            $error_msg = curl_error($curl);
        }
        curl_close($curl);

        if (isset($error_msg)) {
            echo $error_msg;
        }
        echo $response;
    }
}
