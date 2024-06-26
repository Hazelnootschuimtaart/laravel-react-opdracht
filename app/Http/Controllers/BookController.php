<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Author;
use App\Models\User;
use App\Models\Reservation;
use App\Models\Favourite;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $reservations = Reservation::all();
        $books = Book::all();
        $authorlist=array();
       
        foreach ($books as $book) {
            $thisauthor = $book->author->name;
            array_push($authorlist, $thisauthor);
        }

        return Inertia::render('Books/Index', [
            'books' => Book::with('favourites', 'reservations')->get(),
            'authors' => Author::all(),
            'authornames' => $authorlist,
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
            'title' => 'required|string|max:45',
            'author_id' => 'required|integer|max:9223372036854775807|exists:authors,id',
            'publication_date' => 'date',
            'genre' => 'string|max:45',
        ]);

        Book::create($validated);

        return redirect(route('books.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book $book): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:45',
            'author_id' => 'required|integer|max:9223372036854775807|exists:authors,id',
            'publication_date' => 'date',
            'genre' => 'string|max:45',
        ]);

        $book->update($validated);

        $user = auth()->user();

        return redirect(route('books.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book): RedirectResponse
    {
        $book->delete();

        return redirect(route('books.index'));
    }
}
