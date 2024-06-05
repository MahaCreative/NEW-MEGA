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
        Schema::create('pesanans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('kd_pesanan')->unique();
            $table->text('token')->unique()->nullable();
            $table->string('waktu_perencanaan')->nullable();
            $table->string('tanggal_pesanan');
            $table->string('total_pesanan')->default(0);
            $table->string('total_harga')->default(0);
            $table->string('status_pembayaran')->default('pending'); //
            $table->string('payment_at')->nullable();
            $table->string('status_pesanan')->default('belum selesai'); // diterima, selesai
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pesanans');
    }
};
