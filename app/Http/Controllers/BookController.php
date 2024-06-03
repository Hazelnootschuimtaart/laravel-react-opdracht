<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Author;
use App\Models\User;
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
        $books = Book::all();
        $authorlist=array();
 
        foreach ($books as $book) {
            $thisauthor = $book->author->name;
            array_push($authorlist, $thisauthor);
        }

        return Inertia::render('Books/Index', [
            'books' => Book::all(),
            // 'books' => Book::with('author:name')->get(),
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
            'reserved' => 'boolean',
            'favourite' => 'boolean',
        ]);

        // $validated->authors_id = 1;

        Book::create($validated);
        // $request->author()-books()->create($validated);

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
            'reserved' => 'required|boolean',
            'favourite' => 'required|boolean',
        ]);

        $book->update($validated);

        $user = auth()->user();

        if ($request->reserved == true) {
            $book->reservations()->attach($user->id);
        }

       else {
            $book->reservations()->detach($user->id);
        }

        return redirect(route('books.index'));
    }

    // BACKUP UPDATE() MET SYNC
    // public function update(Request $request, Book $book): RedirectResponse
    // {
    //     $validated = $request->validate([
    //         'title' => 'required|string|max:45',
    //         'author_id' => 'required|integer|max:9223372036854775807|exists:authors,id',
    //         'publication_date' => 'date',
    //         'genre' => 'string|max:45',
    //         'reserved' => 'required|boolean',
    //     ]);

    //     $book->update($validated);

    //     $book->reservations()->sync($book);

    //     // iets maken om de reserveringen weer te kunnen verwijderen, bijvoorbeeld dit, waarbij er een popup/modal moet komen waarbij je 'detach' moet intypen (of misschien
    //     // op een andere manier "detach" invoeren). Hieronder checkt hij dan wat er is ingetypt en dan voert ie de code uit.
    //     if ($request->detach == "detach") {
    //         $book->reservations()->detach($book);
    //     }

    //     return redirect(route('books.index'));
    // }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book): RedirectResponse
    {
        $book->delete();

        return redirect(route('books.index'));
    }
}