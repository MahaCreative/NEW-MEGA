<?php

namespace App\Http\Controllers;

use App\Models\Fasilitas;
use Illuminate\Http\Request;

class FasilitasWisataController extends Controller
{
    public function index(Request $request)
    {
        $query = Fasilitas::query();
        $fasilitas = $query->latest()->get();
        return inertia('Fasilitas/Page/Index', compact('fasilitas'));
    }

    public function create(Request $request)
    {

        $attr = $request->validate([
            'nama_fasilitas' => 'required|min:10|max:50',
            'keterangan' => 'required|min:25|max:100',
            'gambar' => 'required|image|mimes:jpg,jpeg,png,gif',
            'status' => 'required|in:gratis,sewa',
            'nama_pemilik' => 'required|string|min:6',
            'contact_pemilik' => 'required|numeric|digits:12',
        ]);

        if ($request->status == 'sewa') {
            $request->validate([
                'harga_sewa' => 'required|numeric',
            ]);
        }
        $attr['gambar'] = $request->file('gambar')->store('fasilitas');
        Fasilitas::create($attr);
        return redirect()->back();
    }
    public function delete(Request $request)
    {
        $fasilitas = Fasilitas::findOrFail($request->id);
        $fasilitas->delete();
        return redirect()->back();
    }
}
