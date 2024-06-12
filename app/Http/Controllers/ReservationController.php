<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Book;
use App\Models\Author;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\Rule;
use Illuminate\Database\Query\Builder;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        // return Book::with('reservations')->get();
        return Inertia::render('Books/Reservations',[
            'reservations' => auth()->user()->reservations()->get(),
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
    // public function store(Request $request, Book $book)
    {
        $request['user_id'] = auth()->user()->id;
        $request['book_id'] = $request->id;
        $validated = $request->validate([
            'user_id' => ['required', 'integer', 'min:1', 'max:18446744073709551615',],
            'book_id' => ['required', 'integer', 'min:1', 'max:18446744073709551615', 'exists:books,id',
                        Rule::unique('reservations')->where(fn (Builder $query) =>
                        $query->where('user_id', auth()->user()->id))],
      ]);

        auth()->user()->reservations()->attach($request->id);
        
        return redirect(route('reservations.index'));
        // return $validated;
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
    public function destroy(Reservation $reservation): RedirectResponse
    {
        $reservation->delete();
        
        return redirect(route('books.index')); 
    }
}
