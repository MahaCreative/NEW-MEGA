<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pesanan;
use Illuminate\Http\Request;

class PesananController extends Controller
{
    public function index(Request $request)
    {
        $pesanan = Pesanan::latest()->get();
        return inertia('PesananSaya/Index', compact('pesanan'));
    }
}
