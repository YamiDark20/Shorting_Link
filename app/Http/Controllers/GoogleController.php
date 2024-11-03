<?php

namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Http;
// use App\Http\Controllers\Controller;
use App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Http\JsonResponse;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Socialite\Contracts\User as SocialiteUser;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class GoogleController extends Controller
{
    use HasApiTokens, HasFactory, Notifiable;
    public function redirectToAuth(): JsonResponse
    {
        return response()->json([
            'url' => Socialite::driver('google')->stateless()
                ->redirect()
                ->getTargetUrl()
        ]);
    }

    public function handleAuthCallback(): JsonResponse
    {
        try {
            /** @var SocialiteUser $socialiteUser */
            $socialiteUser = Socialite::driver('google')->stateless()->user();
            // return response()->json(['error' => 'Invalid credentials provided.'], 400);
        } catch (ClientException $e) {
            return response()->json(['error' => 'Invalid credentials provided.'], 422);
        }

        /** @var User $user */
        $user = User::query()
            ->firstOrCreate(
                [
                    'email' => $socialiteUser->getEmail(),
                ],
                [
                    'email_verified_at' => now(),
                    'name' => $socialiteUser->getName(),
                    // 'google_id' => $socialiteUser->getId(),
                    // 'avatar' => $socialiteUser->getAvatar(),
                ]
            );
            // print($user);

        return response()->json([
            'user' => $user,
            'access_token' => $user->createToken('token')->plainTextToken,
            'token_type' => 'Bearer',
        ]);
    }

    public function logout(Request $request)
    {
        $user = Auth::user();

        if ($user) {
            // Elimina el token actual del usuario
            $user->tokens()->delete(); // Esto eliminará todos los tokens del usuario
            Auth::guard('web')->logout();
            return response()->json(['message' => 'Successfully logged out']);
        }

        return response()->json(['message' => 'No user logged in'], 401);
    }
    // public function handleGoogleLogin(Request $request)
    // {
    //     $idToken = $request->input('id_token');

    //     // Verify the token with Google's API
    //     $response = Http::get('https://oauth2.googleapis.com/tokeninfo', [
    //         'id_token' => $idToken,
    //     ]);

    //     if ($response->successful()) {
    //         $userData = $response->json();
    //         // Handle user data (create or update user in your database)
    //         return response()->json($userData);
    //     }

    //     return response()->json(['error' => 'Invalid token'], 401);
    // }
}
