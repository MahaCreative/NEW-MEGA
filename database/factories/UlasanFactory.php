<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ulasan>
 */
class UlasanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "foto" => 'Image/default_profil.png',
            "nama" => $this->faker->name(),
            "ulasan" => $this->faker->sentence(rand(20, 100)),
            "rating" => rand(1, 5),

        ];
    }
}
