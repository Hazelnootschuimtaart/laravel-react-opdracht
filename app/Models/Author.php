<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Author extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'age',
        'followed',
    ];

    public function books(): HasMany
    {
        return $this->hasMany(Book::class);
    }

    public function follows()
    {
        return $this->belongsToMany(User::class,'follows')
            // ->withPivot('reservations')
            ->wherePivot('user_id', auth()->user()->id)
            ;
    }
}
