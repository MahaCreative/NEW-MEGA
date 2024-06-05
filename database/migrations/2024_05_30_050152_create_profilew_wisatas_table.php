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
        Schema::create('profilew_wisatas', function (Blueprint $table) {
            $table->id();
            $table->string('image');
            $table->string('nama_wisata');
            $table->text('alamat_wisata');
            $table->longText('deskripsi_wisata');
            $table->string('harga_tiket');
            $table->string('jam_buka');
            $table->string('jam_tutup')->nullable();
            $table->string('kontak');
            $table->string('hari_buka');
            $table->string('hari_libur')->nullable();
            $table->longText('url_lokasi_wisata')->default('https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7970.841652442297!2d118.8688168!3d-2.6903179!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d92d9fd10f3b8fb%3A0x1dd6977dfa5f3a44!2sINRI%20SALON%202!5e0!3m2!1sid!2sid!4v1710366165226!5m2!1sid!2sid');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profilew_wisatas');
    }
};
