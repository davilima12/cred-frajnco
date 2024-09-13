<?php

namespace App\Models\Scopes;

use App\Enums\Profile;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use Illuminate\Support\Facades\Auth;

class SaleScope implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     *
     * @param \Illuminate\Database\Eloquent\Builder $builder
     * @return void
     */
    public function apply(Builder $builder, Model $model)
    {

        $user = Auth::user();

        if($user->profile_id == Profile::COMMERCIAL->value){
            $builder = $builder->where('user_id', $user->id);
        }


        return $builder;
    }


}
