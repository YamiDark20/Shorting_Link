<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Linksuser extends Model
{
    use HasFactory;
    protected $fillable = ['id', 'short_link', 'user_id', 'descripcion', 'link_original'];

    public function user(){
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function categoria_link(){
        return $this->belongsTo(Categoria_Link::class);
        // return $this->hasMany(Categoria_Link::class);
    }
}
