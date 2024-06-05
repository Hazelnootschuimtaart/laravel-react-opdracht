<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'author_id',
        'publication_date',
        'genre',
    ];

    public function author(): BelongsTo
    {
        return $this->belongsTo(Author::class);
    }

    public function reservations()
    {
        return $this->belongsToMany(User::class,'reservations')
            // ->withPivot('reservations')
            ->wherePivot('user_id', auth()->user()->id)
            ;
    }

    public function favourites()
    {
        return $this->belongsToMany(User::class, 'favourites')
        ->wherePivot('user_id', auth()->user()->id);
    }
}

        