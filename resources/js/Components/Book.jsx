import React, { useEffect, useState } from "react";
import Dropdown from '@/Components/Dropdown';
import { useForm, usePage } from '@inertiajs/react';
import FavouriteButtons from "./FavouriteButtons";
import ReservationButtons from "./ReservationButtons";
import ShowBook from "./ShowBook";
import EditBookForm from "./EditBookForm";

export default function Book({ book, authors, authorname }) {
    const { auth } = usePage().props;
    const [editing, setEditing] = useState(false);
    const { data, setData, patch, post, delete: destroy, clearErrors, reset, errors } = useForm({
        title: book.title,
        author_id: book.author_id,
        publication_date: book.publication_date,
        genre: book.genre,
    });
    const favouriteForm = useForm({
        book_id: book.id,
    });
    const reservationForm = useForm({
        book_id: book.id,
    });

    // Passes onChange data to this component, so it can be set in the form and sent to the database.
    const changeData = (type, newValue) => {
        console.log("type ", type, "& newValue ", newValue);
        setData(type, newValue);
    }

    //SAVE CHANGES/EDITS
    const submit = (e) => {
        e.preventDefault();
        patch(route('books.update', book.id), { onSuccess: () => setEditing(false) });
    };

    // RESERVATIONS
    const submitReservation = (e) => {
        e.preventDefault();
        reservationForm.post(route('reservations.store'));
    }
    const cancelReservation = (e) => {
        const deleteThisReservation = book.reservations[0].pivot.id;
        e.preventDefault();
        destroy(route('reservations.destroy', deleteThisReservation));
    }

    //FAVOURITES
    const submitFavourite = (e) => {
        e.preventDefault();
        favouriteForm.post(route('favourites.store'));
    }
    const cancelFavourite = (e) => {
        const deleteThisFavourite = book.favourites[0].pivot.id;
        e.preventDefault();
        destroy(route('favourites.destroy', deleteThisFavourite));
    }

    return (
        <div className="p-6 flex space-x-2">
            <div>
                <div>
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                </svg>
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <button className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out" onClick={() => setEditing(true)}>
                                Edit
                            </button>
                            <Dropdown.Link as="button" href={route('books.destroy', book.id)} method="delete">
                                Delete
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
                {editing
                    ?
                    <EditBookForm data={data} authors={authors} changeData={(type, newValue) => { changeData(type, newValue) }} handleSubmit={(e) => { submit(e) }} editing={() => { setEditing(false) }} />
                    : <div>
                        <ShowBook book={book} authorname={authorname} />
                        {/* RESERVATIONS */}
                        <ReservationButtons book={book} handleSubmitReservation={(e) => { submitReservation(e) }} handleDeleteReservation={(e) => { cancelReservation(e) }} />

                        {/* FAVOURITES */}
                        <FavouriteButtons book={book} handleSubmitFavourite={(e) => { submitFavourite(e) }} handleDeleteFavourite={(e) => { cancelFavourite(e) }} />
                    </div>
                }
            </div>
        </div>
    )
}