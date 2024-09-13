<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommissionScalesTable extends Migration
{
    public function up()
    {
        Schema::create('commission_scales', function (Blueprint $table) {
            $table->id();
            $table->decimal('sales_threshold', 15, 2);
            $table->decimal('commission_percentage', 5, 4);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('commission_scales');
    }
}
