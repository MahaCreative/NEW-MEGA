<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pesanan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PesananController extends Controller
{
    public function index(Request $request)
    {
        $pesanan = Pesanan::latest()->get();
        $oneYearAgo = Carbon::now()->subYear();

        // Query total pesanan per bulan dalam satu tahun terakhir
        $totalPesananPerBulan = Pesanan::select(
            DB::raw('YEAR(tanggal_pesanan) as year'),
            DB::raw('MONTH(tanggal_pesanan) as month'),
            DB::raw('COUNT(*) as total')
        )
            ->where('tanggal_pesanan', '>=', $oneYearAgo) // Hanya mengambil data satu tahun terakhir
            ->groupBy('year', 'month')
            ->orderBy('year', 'desc')
            ->orderBy('month', 'asc')
            ->get();
        $totalPesananPerTahun = Pesanan::select(
            DB::raw('YEAR(tanggal_pesanan) as year'),
            DB::raw('COUNT(*) as total')
        )
            ->groupBy('year')
            ->orderBy('year', 'desc')
            ->get();

        return inertia('PesananSaya/Index', compact('pesanan', 'totalPesananPerTahun', 'totalPesananPerBulan'));
    }
}
