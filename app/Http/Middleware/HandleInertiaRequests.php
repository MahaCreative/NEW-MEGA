<?php

namespace App\Http\Middleware;

use App\Models\Jumbotron;
use App\Models\Pesanan;
use App\Models\ProfilewWisata;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $jumbo = Jumbotron::latest()->get();
        $profile = ProfilewWisata::first();
        $cart = [null];

        if ($request->user()) {
            $pesanan = Pesanan::where('status_pembayaran', 'pending')
                ->where('user_id', $request->user()->id)
                ->latest()->first();
            if ($pesanan) {
                $cart = [
                    'kode_pesanan' => $pesanan->kd_pesanan,
                    'total' => $pesanan->total_pesanan,
                ];
            }
        }
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),

            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'jumbotron' => $jumbo,
            'profile' => $profile,
            'cart' => $cart,
        ];
    }
}
