<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProfilewWisata;
use Illuminate\Http\Request;

class ProfilewisataController extends Controller
{
    public function update(Request $request)
    {

        $attr = $request->validate([
            'image' => 'nullable',
            'nama_wisata' => 'required|string|min:6|max:50',
            'alamat_wisata' => 'required|string|min:12',
            'deskripsi_wisata' => 'required|min:25|string',
            'harga_tiket' => 'required|numeric',
            'jam_buka' => 'required',
            'jam_tutup' => 'nullable',
            'kontak' => 'required|numeric',
            'hari_buka' => 'required|in:senin,selasa,rabu,kamis,jumat,sabtu,minggu',
            'hari_libur' => 'nullable|in:senin,selasa,rabu,kamis,jumat,sabtu,minggu',
            'url_lokasi_wisata' => 'required',
        ]);
        $profilewisata = ProfilewWisata::first();
        $attr['image'] = $request->image;
        if ($request->image) {
            $request->validate(['image' => 'mimes:jpg,jpeg,png,webp,gif']);
            $attr['image'] = $request->file('image')->store('profilewisata');
        }
        $profilewisata->update($attr);
        return redirect()->back();
    }
}
