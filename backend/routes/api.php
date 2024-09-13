<?php

use App\Enums\Profile;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\SalesController;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthenticatedSessionController::class, 'store']);



Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/me', [AuthenticatedSessionController::class, 'me']);
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);

    Route::get('/users', function(){
        $users = User::select('id', 'name')->where('profile_id', Profile::COMMERCIAL)->get();

        return response()->json($users, 200);
    });

    Route::prefix('sales')->group(function () {

        Route::get('/', [SalesController::class, 'index']);
        Route::post('/', [SalesController::class, 'store']);
        Route::get('/{id}', [SalesController::class, 'show']);
        Route::put('/{id}', [SalesController::class, 'update']);
        Route::delete('/{id}', [SalesController::class, 'index']);
    });

});

