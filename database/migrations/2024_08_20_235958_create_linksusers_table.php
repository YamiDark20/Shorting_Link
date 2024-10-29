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
        Schema::create('linksusers', function (Blueprint $table) {
            $table->id();
            $table->string('short_link');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->longText('descripcion');
            $table->string('link_original');
            $table->timestamps();

            $table->unique(['short_link', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('linksusers');
    }
};
