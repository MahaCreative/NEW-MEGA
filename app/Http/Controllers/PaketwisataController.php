<?php

namespace App\Http\Controllers;

use App\Models\PaketWisata;
use Illuminate\Http\Request;

class PaketwisataController extends Controller
{
    public function index(Request $request)
    {
        $queryPaket = PaketWisata::query();
        $paket = $queryPaket->get();
        return inertia('Paket/Page/Index', compact('paket'));
    }
}
