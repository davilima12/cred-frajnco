<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthenticatedSessionController extends Controller
{
    public function store(LoginRequest $request)
    {

        try {
            if (!Auth::attempt($request->only('email', 'password'))) {
                return response()->json(['message' => 'Invalid credentials'], 401);
            }


            $user = Auth::user();
            $token = $user->createToken('BearerToken')->plainTextToken;

            return response()->json([
                'token' => $token,
                'user' => $user
            ], 200);
        } catch (\Exception $e) {
            Log::error($e);
            return response()->json('Error: ' . $e->getMessage(), 400);
        }
    }


    public function destroy()
    {

        Log::info('asdasda');
        $user = Auth::user();
        Log::info($user);
        $user->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully.'], 200);
    }


    public function me()
    {
        $user = Auth::user();

        return $user;
    }
}
