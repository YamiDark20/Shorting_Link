<?php

namespace App\Http\Controllers;

use App\Models\Linksuser;
use App\Models\User;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LinksuserController extends Controller
{
    public function index(){
        try {
            return response()->json(Linksuser::all(), 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ocurrió un error, no se encontro ningun link.'], 500);
        }
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'short_link' => 'required|string',
            'user_id' => ['required', 'integer', "exists:users,id"],
            'descripcion' => 'required|string',
            'link_original' => 'required|string'
        ]);
        if ($validator->fails()) {
            return $validator->errors();
        }
        try{
            $linksuser = Linksuser::create($request->all());
            return response()->json($linksuser, 200);
        }catch (QueryException $e) {
            if ($e->getCode() == '23000') {
                return response()->json(['error' => 'Ya existe un link para este usuario.'], 409);
            } else {
                return response()->json(['error' => 'Ocurrió un error inesperado.'], 500);
            }
        }
    }

    public function show(int $id_user, string $short_link){
        $validator = Validator::make([
            'short_link' => $short_link,
            'user_id' => $id_user,
        ],[
            'short_link' => 'required|string',
            'user_id' => ['required', 'integer', "exists:users,id"]
        ]);
        if ($validator->fails()) {
            return $validator->errors();
        }
        $links_user = Linksuser::where('user_id', $id_user)->where('short_link', $short_link)->first();
        if(!$links_user){
            return response()->json(['message' => 'No se ha encontrado ningun enlace (' . $short_link . ") que pertenezca a el usuario con id " . $id_user], 404);
        }
        return $links_user;
    }


    public function show_links(int $id_user){
        $validator = Validator::make([
            'user_id' => $id_user,
        ],[
            'user_id' => ['required', 'integer', "exists:users,id"]
        ]);
        if ($validator->fails()) {
            return $validator->errors();
        }
        $links_user = Linksuser::where('user_id', $id_user)->get();
        if(!$links_user){
            return response()->json(['message' => 'No se ha encontrado ningun enlace que pertenezca a el usuario con id ' . $id_user], 404);
        }
        return $links_user;
    }

    public function export_links(int $id_user){
        $validator = Validator::make([
            'user_id' => $id_user,
        ],[
            'user_id' => ['required', 'integer', "exists:users,id"]
        ]);
        if ($validator->fails()) {
            return $validator->errors();
        }
        $links_user = Linksuser::where('user_id', $id_user)->select('linksusers.short_link', 'linksusers.link_original', 'linksusers.created_at')->get();
        if(!$links_user){
            return response()->json(['message' => 'No se ha encontrado ningun enlace que pertenezca a el usuario con id ' . $id_user], 404);
        }
        return $links_user;
    }

    public function update(Request $request, int $id_user, string $short_link)
    {
        $validator = Validator::make([
            'short_link' => $short_link,
            'user_id' => $id_user,
        ],[
            'short_link' => 'required|string',
            'user_id' => ['required', 'integer', "exists:users,id"]
        ]);
        if ($validator->fails()) {
            return $validator->errors();
        }
        $links_user = Linksuser::where('short_link', $short_link)->where('user_id', $id_user);
        $verificarlink = $links_user;
        if(!$verificarlink->first()){
            return response()->json(['message' => 'No se ha encontrado ningun enlace (' . $short_link . ") que pertenezca a el usuario con id " . $id_user], 404);
        }
        $links_user->update($request->all());
        return response()->json($request->all(), 200);
        // $post->update($request->all());
        // return response()->json($post,  200);
    }


    public function destroy(Request $request, int $id_user, string $short_link){
        $validator = Validator::make([
            'short_link' => $short_link,
            'user_id' => $id_user,
        ],[
            'short_link' => 'required|string',
            'user_id' => ['required', 'integer', "exists:users,id"]
        ]);
        if ($validator->fails()) {
            return $validator->errors();
        }
        $links_user = Linksuser::where('short_link', $short_link)->where('user_id', $id_user)->delete();
        // $links_user = User::find($id_user)->links_user()->where('short_link', $short_link)->first();
        if(!$links_user){
            return response()->json(['message' => 'No se ha encontrado ningun enlace (' . $short_link . ") que pertenezca a el usuario con id " . $id_user], 404);
        }
        // $links_user->delete();
        // print_r($links_user->forceDelete());
        return response()->json("Se ha eliminado correctamente el enlace del usuario.", 200);
    }

    public function redirect(int $id_user, string $short_link)
    {
        $validator = Validator::make([
            'short_link' => $short_link,
            'user_id' => $id_user,
        ],[
            'short_link' => 'required|string',
            'user_id' => ['required', 'integer', "exists:users,id"]
        ]);
        if ($validator->fails()) {
            return $validator->errors();
        }
        // Busca el enlace original por el enlace acortado
        $link = Linksuser::where('user_id', $id_user)->where('short_link', $short_link)->first();
        // print_r($link);

        if ($link) {
            // Redirige al enlace original
            return redirect()->away($link->link_original);
        }

        // Si no se encuentra el enlace, puedes redirigir a una página de error o mostrar un mensaje
        return response()->json(['message' => $link], 404);
    }
}
