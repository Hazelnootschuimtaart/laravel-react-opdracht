<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Book;
use App\Models\Author;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return Book::with('reservations')->get();
        return Inertia::render('Reservations/Index',[
            'booksWithReservationOfCurrentUser' => Book::with('reservations')->get(),
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
    public function store(Request $request, string $id): RedirectResponse
    {
        // Author::find(author.id)

        $validated = $request->validate([
            'title' => 'required|string|max:45',
            'author_id' => 'required|integer|max:9223372036854775807|exists:authors,id',
            'publication_date' => 'date',
            'genre' => 'string|max:45',
        ]);

        // relatie nodig?

        Reservation::create($validated);

        return redirect(route('reservations.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Reservation $reservation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reservation $reservation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reservation $reservation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservation $reservation)
    {
        //
    }
}
