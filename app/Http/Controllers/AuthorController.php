<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Follow;
use App\Models\User;
use Illuminate\Validation\Rule;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

// lukt niet om auteur in database te krijgen. Waarschijnlijk ook niet voor books.


class AuthorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Authors/Index', [
            'authors' => Author::with('follows')->get(),
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
            'name' => 'required|string|max:45',
            'email' => 'string|email|max:45|unique:authors,email',
            'age' => 'integer|min:0|max:125',
            'followed' => 'boolean',
        ]);
        Author::create($validated);

        return redirect(route('authors.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Author $author)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Author $author)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Author $author): RedirectResponse 
    {
        $validated = $request->validate([
            'name' => 'required|string|max:45',
            'email' => ['string', 'email', 'max:45', Rule::unique('authors')->ignore($author->id)],
            'age' => 'integer|min:0|max:125',
            'followed' => 'required|boolean',
        ]);

        $author->update($validated);

        $user = auth()->user();

        return redirect(route('authors.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Author $author): RedirectResponse 
    {
        $author->delete();

        return redirect(route('authors.index'));
    }
}
