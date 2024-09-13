<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommissionScale extends Model
{
    use HasFactory;

    protected $fillable = ['sales_threshold', 'commission_percentage'];

    public static function getCommissionPercentage($salesAmount)
    {
        $scales = self::orderBy('sales_threshold', 'desc')->get();

        foreach ($scales as $scale) {
            if ($salesAmount >= $scale->sales_threshold) {
                return $scale->commission_percentage;
            }
        }

        return 0;
    }
}
