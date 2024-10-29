<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;

use Illuminate\View\View;

class UserController extends Controller
{
    //
    public function index(){
        try {
            return response()->json(User::all(), 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ocurrió un error, no se encontro ningun usuario.'], 500);
        }
    }

    public function store(Request $request){
        $user = User::create($request->all());
        return response()->json($user, 200);
    }

    public function show(User $user)
    {
        return $user;
    }

    public function update(Request $request, User $user)
    {
        $user->update($request->all());
        return response()->json($user, 200);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(null, 204);
    }
}
