<?php


namespace Database\Seeders;

use App\Enums\Profile;
use Illuminate\Database\Seeder;
use App\Models\User;

class AdminUserSeeder extends Seeder
{
    public function run()
    {
        User::updateOrCreate(
            [
                'email' => 'admin@admin.com',
            ],
            [
                'name' => 'admin',
                'password' => bcrypt('admin'),
                'profile_id' => Profile::FINANCIAL->value
            ]
        );

        $persons = [
            ['name' => 'Gilberto Mendes'],
            ['name' => 'Vanessa Costa'],
            ['name' => 'Aloísio Farias'],
            ['name' => 'Carlos Amaral'],
            ['name' => 'Marcos Moura'],
            ['name' => 'Bruna Souza'],
            ['name' => 'Michel Araújo'],
            ['name' => 'Maria Adelaide'],
            ['name' => 'Mauricio Bueno'],
            ['name' => 'Fábio Dionísio'],
        ];

        foreach ($persons as $person) {
            User::updateOrCreate(
                [
                    'email' => strtolower(str_replace(' ', '.', $person['name'])) . '@example.com',
                ],
                [
                    'name' => $person['name'],
                    'password' => bcrypt('password'),
                    'profile_id' => Profile::COMMERCIAL->value
                ]
            );
        }
    }
}
