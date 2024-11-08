<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pesanan>
 */
class PesananFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'kd_pesanan' => '',
            'token' => rand(111111111111111111, 9999999999999999999),
            'waktu_perencanaan' => $date = fake()->dateTimeBetween('-2 years', 'now'),
            'tanggal_pesanan' => Carbon::parse($date) + 1,
            'total_pesanan' => '3',
            'total_harga' => '',
            'status_pembayaran' => '',
            'payment_at' => '',
            'status_pesanan' => '',
        ];
    }
}
