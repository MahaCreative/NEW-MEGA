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
        Schema::create('galeries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable();
            $table->string('judul_galery');
            $table->string('tanggal_foto');
            $table->string('status'); //pengunjung, admin
            $table->string('gambar');
            $table->string('nama_pengunjung');
            $table->string('status_konfirmasi')->default('menunggu konfirmasi');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('galeries');
    }
};
