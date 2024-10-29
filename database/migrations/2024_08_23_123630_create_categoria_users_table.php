<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categoria_users', function (Blueprint $table) {
            $table->id();
            // $table->string('etiqueta');

            // $table->foreignId('categoria_id')->references('id')->constrained('categoria_links')->onDelete('cascade');
            $table->string('etiqueta');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();

            //Clave compuesta
            // $table->primary(['categoria_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categoria_users');
    }
};
