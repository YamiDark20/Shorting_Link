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
        Schema::create('categoria_links', function (Blueprint $table) {
            $table->foreignId('categoria_id')->constrained('categoria_users')->onDelete('cascade');
            $table->foreignId('link_id')->constrained('linksusers')->onDelete('cascade');
            $table->primary(['categoria_id', 'link_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categoria_links');
    }
};
