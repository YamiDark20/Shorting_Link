<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria_Link extends Model
{
    use HasFactory;
    protected $table = 'categoria_links';
    protected $fillable = ['categoria_id', 'link_id'];

    public function linksuser(){
        return $this->hasMany(Linksuser::class, 'link_id', 'id');
    }

    public function categoria_user(){
        return $this->belongsTo(Categoria_User::class, 'categoria_id', 'id');
    }
}
