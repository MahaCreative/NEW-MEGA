<?php

namespace App\Http\Controllers;

use App\Models\DetailPesanan;
use App\Models\Invoice;
use App\Models\PaketWisata;
use App\Models\Pesanan;
use Illuminate\Http\Request;

class PesananController extends Controller
{

    public function index(Request $request)
    {
        $pesanan = Pesanan::where('user_id', $request->user()->id)->latest()->get();
        return inertia('PesananSaya/Index', compact('pesanan'));
    }

    public function show(Request $request,)
    {
        $pesanan = Pesanan::where('kd_pesanan', $request->kd_pesanan)->with(['detail' => function ($q) {
            $q->with('paket');
        }])->first();


        return inertia('PesananSaya/Show', compact('pesanan'));
    }

    public function add_cart(Request $request)
    {
        $getPaket = PaketWisata::findOrFail($request->id);

        $cekPesanan = Pesanan::where('status_pembayaran', 'pending')
            ->where('user_id', $request->user()->id)->latest()->first();
        if ($cekPesanan) {
            $cekPaket = DetailPesanan::where('pesanan_id', $cekPesanan->id)->where('paket_wisata_id', $getPaket->id)->first();
            if ($cekPaket) {
                return redirect()->back()->withErrors(['message' => 'Paket sudah dipesan, silahkan memilih paket lain atau melakukan pembayaran']);
            } else {
                $cekPesanan->update([
                    'total_pesanan' => $cekPesanan->total_pesanan + 1,
                    'total_harga' => $cekPesanan->total_harga + $getPaket->harga_paket,
                ]);
                $detailPesanan = DetailPesanan::create([
                    'pesanan_id' => $cekPesanan->id,
                    'paket_wisata_id' => $getPaket->id,
                    'nama_paket' => $getPaket->nama_paket,
                    'harga_paket' => $getPaket->harga_paket,
                ]);
            }
        } else {
            $pesanan = Pesanan::create([
                'user_id' => $request->user()->id,
                'kd_pesanan' => now()->format('my') . $request->user()->id . count(Pesanan::all())  . rand(0, 1000),
                'tanggal_pesanan' => now(),
                'total_pesanan' => 1,
                'total_harga' => $getPaket->harga_paket,
            ]);
            $detailPesanan = DetailPesanan::create([
                'pesanan_id' => $pesanan->id,
                'paket_wisata_id' => $getPaket->id,
                'nama_paket' => $getPaket->nama_paket,
                'harga_paket' => $getPaket->harga_paket,
            ]);
            return redirect()->back();
        }
    }

    public function invoice(Request $request)
    {
        $invoice = Invoice::where('order_id', $request->kd_pesanan)->with(['user', 'pesanan' => function ($q) {
            $q->with('detail');
        }])->first();

        return inertia('PesananSaya/Invoice', compact('invoice'));
    }

    public function delete_cart(Request $request)
    {

        $detail = DetailPesanan::findOrFail($request->id);
        $pesanan = Pesanan::withCount('detail')->findOrFail($detail->pesanan_id);
        $detail->delete();
        if ($pesanan->detail_count == 1) {
            $pesanan->delete();
            return redirect()->route('home');
        }
        return redirect()->back();
    }

    public function canell_order(Request $request)
    {
        $pesanan = Pesanan::findOrFail($request->id);
        $pesanan->status_pesanan = 'dibatalkan';
        $pesanan->status_pembayaran = 'cancell';
        $pesanan->save();
        return redirect()->back();
    }

    public function delete_order(Request $request)
    {
        $pesanan = Pesanan::findOrFail($request->id);
        $pesanan->delete();
    }

    public function checkout(Request $request)
    {
        $pesanan = Pesanan::findOrFail($request->id);
        $pesanan->status = 'diproses';
        $pesanan->save();
        return redirect()->back();
    }


    public function update_diterima(Request $request)
    {
        $pesanan = Pesanan::with('user')->findOrFail($request->id);
        $pesanan->status_pesanan = 'selesai';

        $pesanan->save();


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
            CURLOPT_POSTFIELDS => array(
                // 'target' => $pesanan->user->no_hp,
                'target' => "085334703299",
                'message' => "
Halo, {$pesanan->user->firstname}
Kami sangat berterimakasih karena anda telah mengunjungi objek wisata kami dan melakukan pemesanan paket yang telah kami sediakan. kami berharap liburan anda di wisata kami terasa nyaman.
Jika anda berkenan silahkan meninggalkan ulasan anda guna membantu pengunjung lain untuk datang ke objek wisata kami.

*Terima Kasih*
                ",
                'countryCode' => '62', //optional
            ),
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
