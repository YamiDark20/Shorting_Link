<?php

namespace App\Http\Controllers;

use App\Models\Categoria_Link;
use App\Models\Categoria_User;
use App\Models\Linksuser;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class Categoria_LinkController extends Controller
{
    public function index(){
        try {
            return response()->json(Categoria_Link::all(), 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ocurrió un error, no se encontro ninguna categoria.'], 500);
        }
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'categoria_id' => 'required|integer',
            'link_id' => ['required', 'integer', "exists:linksusers,id"]
        ]);
        if ($validator->fails()) {
            return $validator->errors();
        }
        try{
            $categoria_user = Categoria_Link::create($request->all());
            return response()->json($categoria_user, 200);
        }catch (QueryException $e) {
            if ($e->getCode() == '23000') {
                return response()->json(['error' => 'Ya existe una categoría con esa etiqueta.'], 409);
            } else {
                return response()->json(['error' => 'Ocurrió un error inesperado.'], 500);
            }
        }
    }

    public function show_info_full(int $id_user){
        $validator = Validator::make([
            'user_id' => $id_user,
        ],[
            'user_id' => ['required', 'integer', "exists:users,id"]
        ]);
        if ($validator->fails()) {
            return $validator->errors();
        }
        // $categorias_user = Categoria_User::where('user_id', $id_user)->get();

        $categorias_user = Linksuser::join('categoria_links', 'linksusers.id', '=', 'categoria_links.link_id')
                ->join('categoria_users', 'categoria_links.categoria_id', '=', 'categoria_users.id')
                ->select('linksusers.short_link', 'linksusers.link_original', 'linksusers.user_id', 'categoria_users.etiqueta', 'categoria_links.categoria_id', 'linksusers.descripcion')
                ->get();
        // $categorias_user = Linksuser::with(['categoria_link.categoria_user', 'categoria_link'])
        // ->where('user_id', $id_user)
        //          ->get();
        if(sizeof($categorias_user) == 0){
            return response()->json(['message' => 'No se ha encontrado ninguna categoria que pertenezca a el usuario con id ' . $id_user], 404);
        }
        return $categorias_user;
    }

    public function show_links_of_categoria(int $id_categoria){
        $validator = Validator::make([
            'categoria_id' => $id_categoria,
        ],[
            'categoria_id' => ['required', 'integer', "exists:categoria_users,id"]
        ]);
        if ($validator->fails()) {
            return $validator->errors();
        }
        // $categorias_user = Categoria_User::where('user_id', $id_user)->get();

        // $categorias_user = Linksuser::join('categoria_links', 'linksusers.id', '=', 'categoria_links.link_id')
        //         ->join('categoria_users', 'categoria_links.categoria_id', '=', 'categoria_users.id')
        //         ->select('linksusers.short_link', 'linksusers.link_original', 'linksusers.user_id', 'categoria_users.etiqueta', 'categoria_links.categoria_id', 'linksusers.descripcion')
        //         ->get();
        $categorias_user = Categoria_Link::where('categoria_links.categoria_id', $id_categoria)->join('linksusers', 'categoria_links.link_id', '=', 'linksusers.id')->select('categoria_links.link_id', 'categoria_links.categoria_id', 'linksusers.short_link', 'linksusers.link_original', 'linksusers.user_id', 'linksusers.descripcion', 'linksusers.created_at')
        ->get();
        if(sizeof($categorias_user) == 0){
            return response()->json(['message' => 'No se ha encontrado ninguna categoria que pertenezca a el usuario con id ' . $id_categoria], 404);
        }
        return $categorias_user;
    }
}
