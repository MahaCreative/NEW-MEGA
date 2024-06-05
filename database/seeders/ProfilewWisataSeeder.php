<?php

namespace Database\Seeders;

use App\Models\ProfilewWisata;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProfilewWisataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProfilewWisata::create([
            "image" => 'Image/mangrove.jpg',
            "nama_wisata" => 'Wista Mangrove wai Tumbur',
            "alamat_wisata" => 'Jl diponegoro kelurahan karema kecamatan mamuju',
            "deskripsi_wisata" => 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae at impedit labore nam, modi corporis soluta eveniet officia quo perferendis quidem rerum, quas alias neque veniam excepturi cum sed assumenda, repudiandae harum sapiente? Libero quasi facilis quisquam neque unde assumenda iure esse necessitatibus impedit odit quia in reprehenderit quos nemo, numquam nam? Voluptatem similique quidem modi obcaecati, dicta libero sit nam omnis quasi cum qui porro. Soluta, fuga sint veritatis saepe perferendis dolorem atque. Optio corporis asperiores in culpa sit, cupiditate accusantium magnam ab delectus fuga voluptates, facilis reiciendis quam autem temporibus natus laborum officia? Officia pariatur deserunt laboriosam maiores!',
            'harga_tiket' => '15000',
            "jam_buka" => '07.00',
            "jam_tutup" => '20.00',
            "kontak" => '082194255717',
            "hari_buka" => 'Senin',
            "hari_libur" => 'Minggu',
        ]);
    }
}
