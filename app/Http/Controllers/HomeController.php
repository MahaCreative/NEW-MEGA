<?php

namespace App\Http\Controllers;

use App\Models\Fasilitas;
use App\Models\Galery;
use App\Models\Jumbotron;
use App\Models\PaketWisata;
use App\Models\Ulasan;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $queryPaket = PaketWisata::query();
        $paket = $queryPaket->latest()->get();

        $queryFasilitas = Fasilitas::query();
        $fasilitas = $queryFasilitas->latest()->get();

        $queryGalery = Galery::query();
        $galery = $queryGalery->latest()->get();
        $ulasan = Ulasan::where('status_konfirmasi', 'menunggu konfirmasi')->latest()->get();
        $slider = Jumbotron::latest()->get();

        return inertia('Home/Home', compact('paket', 'fasilitas', 'galery', 'ulasan', 'slider'));
    }
}
