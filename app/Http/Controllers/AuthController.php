<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        return inertia('Login');
    }
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|confirmed|min:6',
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            // Jika otentikasi berhasil, redirect ke halaman yang ditentukan
            return redirect()->route('home');
        }
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }
    public function register(Request $request)
    {
        return inertia('Register');
    }
    public function register_store(Request $request)
    {
        $attr = $request->validate([
            "firstname" => 'required|string|min:3',
            "lastname" => 'nullable|string|min:3',
            "tempat_lahir" => 'required|string|min:5',
            "tanggal_lahir" => 'required|date|before:now',
            "jenis_kelamin" => 'required',
            "alamat" => 'required|string|min:20',
            "no_hp" => 'required|digits:12|numeric|unique:users,no_hp',
            "foto" => 'required|image|mimes:png,jpeg,jpg',
            "email" => 'required|email|unique:users,email',
            "password" => 'required|min:6|alpha_dash',
        ]);
        $attr['foto'] = $request->file('foto')->store('user');
        $attr['role'] = 'pengunjung';
        $user = User::create($attr);
        Auth::login($user);
        return redirect()->route('home');
    }
    public function logout(Request $request)
    {
        Auth::logout();
        return redirect()->route('login');
    }
}
