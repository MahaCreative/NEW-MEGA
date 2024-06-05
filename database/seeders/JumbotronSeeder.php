<?php

namespace Database\Seeders;

use App\Models\Jumbotron;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JumbotronSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Jumbotron::create([
            'title' => 'Selamat Datang Di Wisata Alam Mangrove Wai Tumbur',
            'tagline' => 'Tempat wisata yang terletak di kabupaten Mamuju Tengah',
            'image' => 'Image/mangrove.jpg',
        ]);
        Jumbotron::create([
            'title' => 'Selamat Datang Di Wisata Alam Mangrove Wai Tumbur',
            'tagline' => 'Tempat wisata yang terletak di kabupaten Mamuju Tengah',
            'image' => 'Image/default_slider1.jpg',
        ]);
        Jumbotron::create([
            'title' => 'Selamat Datang Di Wisata Alam Mangrove Wai Tumbur',
            'tagline' => 'Tempat wisata yang terletak di kabupaten Mamuju Tengah',
            'image' => 'Image/default_slider2.webp',
        ]);
    }
}
