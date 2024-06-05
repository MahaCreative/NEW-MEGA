<?php

namespace App\Http\Controllers;

use App\Models\Galery;
use App\Models\User;
use Illuminate\Http\Request;

class GaleryController extends Controller
{
    public function index(Request $request)
    {
        $query = Galery::query();
        // $user = User::findOrFail(1);
        // if ($user->role !== 'admin') {
        //     $query->where('user_id', $user->id);
        // }
        $galery = $query->latest()->get();

        return inertia('Galery/Page/Index', compact('galery'));
    }
}
