<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PaketWisata;
use Illuminate\Http\Request;

class PaketController extends Controller
{
    public function create(Request $request)
    {

        $attr = $request->validate([
            "nama_paket" => 'required|string',
            "kategori_sewa" => 'required',
            "harga_paket" => 'required|numeric',
            "deskripsi_paket" => 'required|string|min:50',
            "jumlah_max_pesanan" => 'required|numeric',
            "catatan_paket" => 'required|string|min:25|max:100',
            "foto_paket" => 'required|image|mimes:jpeg,png,jpg,gif,svg',
        ]);
        $attr['foto_paket'] = $request->file('foto_paket')->store('foto-paket', 'public');
        PaketWisata::create($attr);
        return redirect()->back();
    }

    public function delete(Request $request)
    {
        $paket = PaketWisata::findOrFail($request->id);
        $paket->delete();
        return redirect()->back();
    }
}
