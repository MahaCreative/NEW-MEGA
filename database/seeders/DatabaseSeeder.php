<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Fasilitas;
use App\Models\Galery;
use App\Models\PaketWisata;
use App\Models\Ulasan;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();
        User::create([
            "firstname" => 'Guntur ',
            "lastname" => 'Madjid',
            "tempat_lahir" => 'Makassar',
            "tanggal_lahir" => '1998-01-17',
            "jenis_kelamin" => 'laki-laki',
            "alamat" => 'Jl diponegoro kelurahan karema kecamatan mamuju',
            "no_hp" => '082194255718',
            "role" => 'pengunjung',
            "email" => 'gunturmadjid.3@gmail.com',
            "password" => bcrypt('password'),
        ]);

        User::create([
            "firstname" => 'Admin ',
            "lastname" => 'admin',
            "tempat_lahir" => 'Mamuju',
            "tanggal_lahir" => '1998-01-17',
            "jenis_kelamin" => 'Perempuan',
            "alamat" => 'Jl Rumah Tinggal Selalu ada',
            "no_hp" => '082397722566',
            "role" => 'admin',
            "email" => 'admin@gmail.com',
            "password" => bcrypt('password'),
        ]);
        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $this->call([
            JumbotronSeeder::class,
            ProfilewWisataSeeder::class,
        ]);
        PaketWisata::factory(10)->create();
        Fasilitas::factory(10)->create();
        Galery::factory(10)->create();
        Ulasan::factory(10)->create();
    }
}
