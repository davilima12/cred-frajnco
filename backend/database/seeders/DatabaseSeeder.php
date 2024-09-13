<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{


    public function run(): void
    {

        $this->call(ProfileSeeder::class);
        $this->call(CommissionScaleSeeder::class);
        $this->call(AdminUserSeeder::class);
        $this->call(SalesSeeder::class);
    }
}
