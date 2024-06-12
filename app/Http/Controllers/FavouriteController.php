<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favourite;
use App\Models\Book;
use App\Models\Author;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\Rule;
use Illuminate\Database\Query\Builder;

class FavouriteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
                return Inertia::render('Books/Favourites', [
            'favourites' => auth()->user()->favourites()->get(),
            // 'allFavourites' => $allFavourites,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
            $validated = $request->validate([
            'book_id' => ['required', 'integer', 'min:1', 'max:18446744073709551615', 'exists:books,id',
                        Rule::unique('favourites')->where(fn (Builder $query) =>
                        $query->where('user_id', auth()->user()->id))], // --> een boek mag niet twee keer gefavourite worden door een user.
      ]);

        auth()->user()->favourites()->attach($request->book_id);
        
        return redirect(route('favourites.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Favourite $favourite): RedirectResponse
    {
        $favourite->delete();

        return redirect(route('books.index'));
    }
}
