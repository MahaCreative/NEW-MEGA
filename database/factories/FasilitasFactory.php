<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Fasilitas>
 */
class FasilitasFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama_fasilitas' => $this->faker->name(),
            'keterangan' => $this->faker->sentence(rand(50, 100)),
            'gambar' => 'Image/default_paket.jpg',
            'status' => 'sewa',
            'nama_pemilik' => $this->faker->name(),
            'contact_pemilik' => '082194255' . rand(100, 900),
            'harga_sewa' => rand(10000, 500000),
        ];
    }
}
