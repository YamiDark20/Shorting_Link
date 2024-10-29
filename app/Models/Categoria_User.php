<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria_User extends Model
{
    use HasFactory;
    protected $table = 'categoria_users';
    protected $fillable = ['id', 'etiqueta', 'user_id'];

    public function user(){
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function categoria_link(){
        return $this->hasOne(Categoria_Link::class);
    }
}
