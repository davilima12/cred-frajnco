<?php


namespace Database\Seeders;

use App\Models\Sale;
use Illuminate\Database\Seeder;

class SalesSeeder extends Seeder
{
    public function run()
    {
        $salesData = [
            2 => [450000.00, 450000.00], // Gilberto Mendes
            3 => [700000.00, 700000.00], // Vanessa Costa
            4 => [175000.00, 175000.00], // Aloísio Farias
            5 => [6850000.00], // Carlos Amaral
            6 => [15596400.00], // Marcos Moura
            7 => [2854350.00], // Bruna Souza
            8 => [4287698.00], // Michel Araújo
            9 => [5158564.00], // Maria Adelaide
            10 => [136000.00], // Mauricio Bueno
            11 => [1996958.00], // Fábio Dionísio
        ];

        foreach ($salesData as $userId => $amounts) {
            foreach ($amounts as $amount) {
                Sale::withoutGlobalScopes()->firstOrCreate(
                    [
                        'user_id' => $userId,
                        'amount' => $amount,
                    ],
                    [
                        'user_id' => $userId,
                        'amount' => $amount,
                    ]
                );
            }
        }

    }
}
