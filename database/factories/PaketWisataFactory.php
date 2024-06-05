<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PaketWisata>
 */
class PaketWisataFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $kategori = ['jam', 'hari', 'minggu'];
        return [
            'nama_paket' => $this->faker->name(),
            'kategori_sewa' => $kategori[rand(0, 2)],
            'harga_paket' => rand(10000, 1000000),
            'deskripsi_paket' => $this->faker->sentence(rand(50, 100)),
            'jumlah_max_pesanan' => 5,
            'catatan_paket' => $this->faker->sentence(),
            'foto_paket' => "Image/default_paket.jpg",
        ];
    }
}
