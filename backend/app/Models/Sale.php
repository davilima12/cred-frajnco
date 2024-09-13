<?php


namespace App\Models;

use App\Models\Scopes\SaleScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sale extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['user_id', 'amount', 'date'];



    protected static function booted()
    {
        static::addGlobalScope(new SaleScope);
    }
}

