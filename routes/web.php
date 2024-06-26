<?php

use App\Http\Controllers\AuthorController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\FavouriteController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('authors', AuthorController::class)
->only(['index', 'store', 'update', 'destroy'])
->middleware(['auth', 'verified']);

Route::resource('books', BookController::class)
->only(['index', 'store', 'update', 'destroy'])
->middleware(['auth', 'verified']);

Route::resource('reservations', ReservationController::class)
->only(['index', 'store', 'update', 'destroy'])
->middleware(['auth', 'verified']);

Route::resource('favourites', FavouriteController::class)
->only(['index', 'store', 'update', 'destroy'])
->middleware('auth', 'verified');

Route::resource('follows', FollowController::class)
->only(['index', 'store', 'update', 'destroy'])
->middleware(['auth', 'verified']);

require __DIR__.'/auth.php';
