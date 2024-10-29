<?php

namespace App\Http\Controllers;

use App\Models\Categoria_User;
use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class Categoria_UserController extends Controller
{
    public function index(){
        try {
            return response()->json(Categoria_User::all(), 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ocurrió un error, no se encontro ninguna categoria.'], 500);
        }
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'etiqueta' => 'required|string',
            'user_id' => ['required', 'integer', "exists:users,id"]
        ]);
        if ($validator->fails()) {
            return $validator->errors();
        }
        try{
            $categoria_user = Categoria_User::create($request->all());
            return response()->json($categoria_user, 200);
        }catch (QueryException $e) {
            if ($e->getCode() == '23000') {
                return response()->json(['error' => 'Ya existe una categoría con esa etiqueta para este usuario.'], 409);
            } else {
                return response()->json(['error' => 'Ocurrió un error inesperado.'], 500);
            }
        }
    }

    public function show(int $id){
        // $validator = Validator::make([
        //     'short_link' => $short_link,
        //     'user_id' => $id_user,
        // ],[
        //     'short_link' => 'required|string',
        //     'user_id' => ['required', 'integer', "exists:users,id"]
        // ]);
        // if ($validator->fails()) {
        //     return $validator->errors();
        // }
        // $links_user = Linksuser::where('user_id', $id_user)->where('short_link', $short_link)->first();
        // if(!$links_user){
        //     return response()->json(['message' => 'No se ha encontrado ningun enlace (' . $short_link . ") que pertenezca a el usuario con id " . $id_user], 404);
        // }
        try {
            $categoriaUser = Categoria_User::findOrFail($id);
            return $categoriaUser;
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'No se ha encontrado ninguna categoria con el id (' . $id . ').'
            ], 404);
        } catch (\Exception $e) {
            // Capturar otras excepciones posibles
            return response()->json([
                'message' => 'Ocurrió un error inesperado.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show_categorias(int $id_user){
        $validator = Validator::make([
            'user_id' => $id_user,
        ],[
            'user_id' => ['required', 'integer', "exists:users,id"]
        ]);
        if ($validator->fails()) {
            return $validator->errors();
        }
        $categorias_user = Categoria_User::where('user_id', $id_user)->get();
        if(sizeof($categorias_user) == 0){
            return response()->json(['message' => 'No se ha encontrado ninguna categoria que pertenezca a el usuario con id ' . $id_user], 404);
        }
        return $categorias_user;
    }

    public function update(Request $request, int $id)
    {
        // $validator = Validator::make([
        //     'short_link' => $short_link,
        //     'user_id' => $id_user,
        // ],[
        //     'short_link' => 'required|string',
        //     'user_id' => ['required', 'integer', "exists:users,id"]
        // ]);
        // if ($validator->fails()) {
        //     return $validator->errors();
        // }
        // $links_user = Linksuser::where('short_link', $short_link)->where('user_id', $id_user);
        // $verificarlink = $links_user;
        // if(!$verificarlink->first()){
        //     return response()->json(['message' => 'No se ha encontrado ningun enlace (' . $short_link . ") que pertenezca a el usuario con id " . $id_user], 404);
        // }
        try {
            $categoriaUser = Categoria_User::findOrFail($id)->update($request->all());
            return response()->json($categoriaUser, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'No se ha encontrado ninguna categoria con el id (' . $id . ').'
            ], 404);
        } catch (\Exception $e) {
            // Capturar otras excepciones posibles
            return response()->json([
                'message' => 'Ocurrió un error inesperado.',
                'error' => $e->getMessage()
            ], 500);
        }
        // $links_user->update($request->all());
        // return response()->json($request->all(), 200);
        // $post->update($request->all());
        // return response()->json($post,  200);
    }


    public function destroy(Request $request, int $id){
        // $validator = Validator::make([
        //     'short_link' => $short_link,
        //     'user_id' => $id_user,
        // ],[
        //     'short_link' => 'required|string',
        //     'user_id' => ['required', 'integer', "exists:users,id"]
        // ]);
        // if ($validator->fails()) {
        //     return $validator->errors();
        // }
        // $links_user = Linksuser::where('short_link', $short_link)->where('user_id', $id_user)->delete();
        // if(!$links_user){
        //     return response()->json(['message' => 'No se ha encontrado ningun enlace (' . $short_link . ") que pertenezca a el usuario con id " . $id_user], 404);
        // }
        // $links_user->delete();
        // print_r($links_user->forceDelete());
        try {
            $categoriaUser = Categoria_User::findOrFail($id)->delete();
            return response()->json("Se ha eliminado correctamente la categoria del usuario.", 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'No se ha encontrado ninguna categoria con el id (' . $id . ').'
            ], 404);
        } catch (\Exception $e) {
            // Capturar otras excepciones posibles
            return response()->json([
                'message' => 'Ocurrió un error inesperado.',
                'error' => $e->getMessage()
            ], 500);
        }
        // return response()->json("Se ha eliminado correctamente el enlace del usuario.", 200);
    }
}
