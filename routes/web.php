<?php

use App\Http\Controllers\Admin\GaleryController as AdminGaleryController;
use App\Http\Controllers\Admin\PaketController;
use App\Http\Controllers\Admin\PesananController as AdminPesananController;
use App\Http\Controllers\Admin\ProfilewisataController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FasilitasWisataController;
use App\Http\Controllers\GaleryController;
use App\Http\Controllers\GetToken;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PaketwisataController;
use App\Http\Controllers\PesananController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\UlasanController;
use App\Models\Ulasan;
use Illuminate\Auth\Events\Login;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware(['guest'])->group(function () {
    Route::get('login', [AuthController::class, 'login'])->name('login');
    Route::post('login', [AuthController::class, 'store']);
    Route::get('register', [AuthController::class, 'register'])->name('register');
    Route::post('register', [AuthController::class, 'register_store']);
});

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('paket-wisata', [PaketwisataController::class, 'index'])->name('paket-wisata');
Route::get('fasilitas-wisata', [FasilitasWisataController::class, 'index'])->name('fasilitas-wisata');
Route::get('galery', [GaleryController::class, 'index'])->name('galery');
Route::get('ulasan', [UlasanController::class, 'index'])->name('ulasan');
Route::post('create-ulasan', [UlasanController::class, 'create'])->name('create-ulasan');
ROute::delete('delete-ulasan', [UlasanController::class, 'delete'])->name('delete-ulasan');
// rute untuk yang login baik user or pengunjung
Route::middleware(['auth'])->group(function () {
    Route::get('logout', [AuthController::class, 'logout'])->name('logout');
    Route::post('create-galery', [AdminGaleryController::class, 'create'])->name('admin.create-galery');
    Route::delete('delete-galery', [AdminGaleryController::class, 'delete'])->name('admin.delete-galery');
    Route::post('uodate-pesanan-diterima', [PesananController::class, 'update_diterima'])->name('admin.update-pesanan-diterima');
});
// Route untuk admin
Route::middleware([])->group(function () {
    Route::post('create-paket', [PaketController::class, 'create'])->name('admin.create-paket');
    Route::delete('delete-paket/{id}', [PaketController::class, 'delete'])->name('admin.delete-paket');
    Route::post('create-fasilitas-wisata', [FasilitasWisataController::class, 'create'])->name('admin.create-fasilitas');
    Route::delete('delete-fasilitas-wisata', [FasilitasWisataController::class, 'delete'])->name('admin.delete-fasilitas-wisata');
    Route::post('update-profile-wisata', [ProfilewisataController::class, 'update'])->name('admin-profile-wisata');
    Route::post('terima-ulasan', [UlasanController::class, 'confirm'])->name('admin.confirm-ulasan');
    Route::post('confirm-galery', [AdminGaleryController::class, 'confirm'])->name('admin.confirm-galery');
    Route::get('daftar-pesanan-pengunjung', [AdminPesananController::class, 'index'])->name('admin.daftar-pesanan-pengunjung');
    Route::delete('delete-slider', [SliderController::class, 'delete'])->name('delete-slider');
    Route::post('create-slider', [SliderController::class, 'create'])->name('create-slider');
});


// Route untuk pengunjung

Route::middleware(['auth'])->group(function () {
    Route::get('daftar-pesanan-saya', [PesananController::class, 'index'])->name('pesanan-saya');
    Route::get('lihat-pesanan-saya/', [PesananController::class, 'show'])->name('show-detail-pesanan');
    Route::get('invoice-pembayaran-pemesanan/', [PesananController::class, 'invoice'])->name('invoice-pesanan');

    Route::post('add-cart', [PesananController::class, 'add_cart'])->name('add-cart');
    Route::post('delete-cart', [PesananController::class, 'delete_cart'])->name('delete-cart');
    Route::post('batalkan-pesanan', [PesananController::class, 'canell_order'])->name('cancel-order');
    Route::post('delete-pesanan', [PesananController::class, 'delete_order'])->name('delete-order');
});


Route::post('generate-token', [GetToken::class, 'create_token'])->name('create-token');
