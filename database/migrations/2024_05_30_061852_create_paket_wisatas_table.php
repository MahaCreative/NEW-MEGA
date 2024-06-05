<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('paket_wisatas', function (Blueprint $table) {
            $table->id();
            $table->string('nama_paket');
            $table->string('kategori_sewa'); // jam, dan hari, minggu, bulan
            $table->integer('harga_paket');
            $table->longText('deskripsi_paket');
            $table->integer('jumlah_max_pesanan');
            $table->longText('catatan_paket');
            $table->string('foto_paket');
            $table->string('aktif_paket')->default('yes');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paket_wisatas');
    }
};
