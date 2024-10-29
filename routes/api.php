<?php

use App\Http\Controllers\Categoria_LinkController;
use App\Http\Controllers\Categoria_UserController;
use App\Http\Controllers\LinksuserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{user}', [UserController::class, 'show']);
Route::put('/users/{user}', [UserController::class, 'update']);
Route::delete('/users/{user}', [UserController::class, 'destroy']);


Route::get('/links/users', [LinksuserController::class, 'index']);
Route::post('/links/users', [LinksuserController::class, 'store']);
Route::get('/links/users/{id_user}/{short_link}', [LinksuserController::class, 'show']);
Route::put('/links/users/{id_user}/{short_link}', [LinksuserController::class, 'update']);
Route::delete('/links/users/{id_user}/{short_link}', [LinksuserController::class, 'destroy']);
Route::get('/links/users/{id_user}', [LinksuserController::class, 'show_links']);

Route::get('/categoria/links', [Categoria_LinkController::class, 'index']);
Route::post('/categoria/links', [Categoria_LinkController::class, 'store']);
Route::get('/categoria/links/{id}', [Categoria_LinkController::class, 'show_info_full']);
Route::get('/categoria/links/list/{id}', [Categoria_LinkController::class, 'show_links_of_categoria']);

Route::get('/categoria/users', [Categoria_UserController::class, 'index']);
Route::post('/categoria/users', [Categoria_UserController::class, 'store']);
Route::get('/categoria/users/{id}', [Categoria_UserController::class, 'show']);
Route::put('/categoria/users/{id}', [Categoria_UserController::class, 'update']);
Route::delete('/categoria/users/{id}', [Categoria_UserController::class, 'destroy']);
Route::get('/categoria/users/list/{id}', [Categoria_UserController::class, 'show_categorias']);

Route::get('/{id_user}/{short_link}', [LinksuserController::class, 'redirect']);
