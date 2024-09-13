<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CommissionScale;

class CommissionScaleSeeder extends Seeder
{
    public function run()
    {
        $scales = [
            ['sales_threshold' => 1000000.00, 'commission_percentage' => 0.50],
            ['sales_threshold' => 2000000.00, 'commission_percentage' => 0.60],
            ['sales_threshold' => 3000000.00, 'commission_percentage' => 0.70],
            ['sales_threshold' => 4000000.00, 'commission_percentage' => 0.80],
            ['sales_threshold' => 5000000.00, 'commission_percentage' => 0.90],
        ];

        foreach ($scales as $scale) {
            CommissionScale::create($scale);
        }
    }
}
