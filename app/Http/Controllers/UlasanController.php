<?php

namespace App\Http\Controllers;

use App\Models\Ulasan;
use Illuminate\Http\Request;

class UlasanController extends Controller
{
    public function index(Request $request)
    {
        $query = Ulasan::query();
        $ulasan = $query->latest()->get();

        return inertia('Ulasan/Page/Index', compact('ulasan'));
    }

    public function confirm(Request $request)
    {
        $ulasan = Ulasan::findOrFail($request->id);
        $ulasan->update(['status_konfirmasi' => $request->status]);
        return redirect()->back();
    }

    public function create(Request $request)
    {

        $attr = $request->validate([
            'nama_lengkap' => 'required',
            'ulasan' => 'required|string|min:20',
            'rating' => 'required',
            'foto' => 'nullable|image|mimes:jpg,jpeg,png',
        ]);
        $attr['foto'] = $request->file('foto') ? $request->file('foto')->store('ulasan') : 'Image/default_profil.png';

        $ulasan = Ulasan::create([
            'foto' =>
            $attr['foto'],
            'nama' => $request->nama_lengkap,
            'ulasan' => $request->ulasan,
            'rating' => $request->rating,
        ]);
    }
}
