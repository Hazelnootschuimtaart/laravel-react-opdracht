<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Author;
use App\Models\User;
use App\Models\Reservation;
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
            'books' => Book::all(),
            'authors' => Author::all(),
            'authornames' => $authorlist,
            'reservations' => auth()->user()->reservations()->get(), // in Book.jsx de reserveringen opvragen.
            'allReservations' => $reservations,

            // door naar de bookid te kijken op de reservations --> ik dacht dat je om een reservering te verwijderne het reservation id nodig had, kun je dit dan opvragen
            // met het bookid? Hoe kun je vanuit het boek de reservering pakken? Misschien loopen door reserveringen en dan als bookid(reserveringen) == bookid(boek) dan 
            // verwijderen
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
        ]);

        $book->update($validated);

        $user = auth()->user();

        //Favourites
        
        // loopen door array van reeds gereserveerde boeken en als het er nog niet in staat, dan in de if?
        // als reservations leeg is, dan in if.

        if ($request->favourite == true) {
            $book->favourites()->attach($user->id);
        }

        else {
            $book->favourites()->detach($user->id);
        }

        //Reservations
// $reservations = 


        if ($request->reservations == true) {
            $book->reservations()->attach($user->id);
        }

       else {
            $book->reservations()->detach($user->id);
        }

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