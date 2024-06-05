<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Galery;
use Illuminate\Http\Request;

class GaleryController extends Controller
{
    public function create(Request $request)
    {
        $attr = $request->validate([
            'user_id' => 'nullable',
            'judul_galery' => 'required|string|min:6',
            'tanggal_foto' => 'required|date|before:now',
            'gambar' => 'required|image|mimes:jpeg,jpg,png',
            'nama_pengunjung' => 'required|string|min:6',

        ]);
        $attr['status'] = 'admin';
        if ($request->user_id) {
            $attr['status'] = 'pengunjung';
        }
        $attr['gambar'] = $request->file('gambar')->store('galery');
        $galery = Galery::create($attr);
        return redirect()->back();
    }

    public function confirm(Request $request)
    {
    }

    public function delete(Request $request)
    {
        $galery = Galery::findOrFail($request->id);
        $galery->delete();
        return redirect()->back();
    }
}
