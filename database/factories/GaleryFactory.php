<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Galery>
 */
class GaleryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'judul_galery' => $this->faker->name(),
            'tanggal_foto' => $this->faker->dateTimeBetween('-1 years', 'now'),
            'status' => 'pengunjung',
            'gambar' => 'Image/default_paket.jpg',
            'nama_pengunjung' => $this->faker->name(),
        ];
    }
}
