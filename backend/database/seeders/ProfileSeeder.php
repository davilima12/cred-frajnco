<?php


namespace Database\Seeders;

use App\Models\Profile;
use Illuminate\Database\Seeder;

class ProfileSeeder extends Seeder
{
    public function run()
    {
        Profile::updateOrCreate(
            [
                'name' => 'Financeiro',
            ],
            [
                'name' => 'Financeiro',
            ]
        );

        Profile::updateOrCreate(
            [
                'name' => 'Comercial ',
            ],
            [
                'name' => 'Comercial',
            ]
        );

    }
}
