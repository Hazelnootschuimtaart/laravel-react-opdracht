<?php

namespace App\Http\Controllers;

use App\Models\Follow;
use App\Models\Author;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\Rule;
use Illuminate\Database\Query\Builder;

class FollowController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Authors/Follows', [
            'followedAuthors' => auth()->user()->follows()->get(),
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
        'author_id' => ['required', 'integer', 'min:1', 'max:18446744073709551615', 'exists:authors,id',
                       Rule::unique('follows')->where(fn (Builder $query) =>
                       $query->where('user_id', auth()->user()->id))],
        ]);

        auth()->user()->follows()->attach($request->author_id);

        return redirect(route('follows.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Follow $follow)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Follow $follow)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Follow $follow)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Follow $follow): RedirectResponse
    {
        $follow->delete();

        return redirect(route('authors.index'));
    }
}
