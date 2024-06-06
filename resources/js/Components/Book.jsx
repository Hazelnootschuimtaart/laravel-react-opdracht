import React, { useEffect, useState } from "react";
import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, usePage } from '@inertiajs/react';

export default function Book({ book, authors, authorname }) {
    const { auth } = usePage().props;
    const [editing, setEditing] = useState(false);
    const [reserved, setReserved] = useState("");
    const { data, setData, patch, post, clearErrors, reset, errors } = useForm({
        title: book.title,
        author_id: book.author_id,
        publication_date: book.publication_date,
        genre: book.genre,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('books.update', book.id), { onSuccess: () => setEditing(false) });
    };

    const submitReservation = (e) => {
        e.preventDefault();
        console.log("errors ", errors);
        post(route('reservations.store', book));
    }

    const cancelReservation = (e) => {
        e.preventDefault();
        delete (route('reservations.destroy', book.id));
    }

    // change the author in the select element
    const selectChange = (e) => {
        setData('author_id', e.target.value);
    };

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
                    ? <form onSubmit={submit}>
                        <input
                            type="text"
                            placeholder="Title"
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            name="book-title"
                            id="book-name"
                        />
                        <select id="author_id" name="author_id" onChange={(e) => selectChange(e)} className="block w-full mt-3 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm">
                            {authors.map(author =>
                                <option key={author.id} value={author.id}>{author.name}</option>
                            )}
                        </select>
                        <input
                            type="date"
                            value={data.publication_date}
                            onChange={e => setData('publication_date', e.target.value)}
                            className="block w-full mt-3 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            name="publication_date"
                            id="publication_date"
                        />
                        <input
                            type="text"
                            placeholder="Genre"
                            value={data.genre}
                            onChange={e => setData('genre', e.target.value)}
                            className="block mt-3 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            name="book-genre"
                            id="book-genre"
                        />
                        <InputError message={errors.message} className="mt-2" />
                        <div className="space-x-2">
                            <PrimaryButton className="mt-4">Save changes</PrimaryButton>
                            <button className="mt-4" onClick={() => { setEditing(false); reset(); clearErrors(); }}>Cancel</button>
                        </div>
                    </form>
                    : <div>
                        <div>
                            <span className="font-semibold">Title:</span> {book.title}
                        </div>
                        <div>
                            <span className="font-semibold">Author:</span> {authorname}
                        </div>
                        <div><span className="font-semibold">Publication date:</span> {book.publication_date}
                        </div>
                        <div>
                            <span className="font-semibold">Genre:</span> {book.genre}
                        </div>
                        {/* RESERVATIONS */}
                        <form className="pt-3" name={"reserve-book" + book.id}>
                            {/* {reserved == false || reserved == ""
                                ? <PrimaryButton className="bg-sky-400 hover:bg-sky-500" type='submit' href={route('reservations.store', book.id)} method="post">Reserve book</PrimaryButton>
                                : <PrimaryButton className="bg-red-600 hover:bg-red-700" type='submit' href={route('reservations.destroy', book.id)} method="delete">Cancel reservation</PrimaryButton>
                            } */}
                            <PrimaryButton className="bg-sky-400 hover:bg-sky-500" type='submit' onClick={submitReservation}>Reserve book</PrimaryButton>
                            <PrimaryButton className="bg-red-600 hover:bg-red-700" type='submit' onClick={cancelReservation}>Cancel reservation</PrimaryButton>
                        </form>
                        {/* FAVOURITES */}
                        <form className="pt-3" name={"favourite-book" + book.id} onSubmit={submit}>
                            <div style={{ width: "100px", cursor: "pointer" }} type="submit" onClick={(e) => makeFavourite()}>
                                <PrimaryButton className="contents">
                                    {/* Made by madvic, see https://codepen.io/madvic */}
                                    <svg id="heart-svg" viewBox="467 392 58 57" xmlns="http://www.w3.org/2000/svg">
                                        <g id="Group" fill="none" fillRule="evenodd" transform="translate(467 392)">
                                            <path id="heart" d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
                                                fill={`${book.favourite ? "#E2264D" : "#AAB8C2"}`} />
                                            <circle id="main-circ" fill="#E2264D" opacity="0" cx="29.5" cy="29.5" r="1.5" />

                                            <g id="grp7" opacity="0" transform="translate(7 6)">
                                                <circle id="oval1" fill="#9CD8C3" cx="2" cy="6" r="2" />
                                                <circle id="oval2" fill="#8CE8C3" cx="5" cy="2" r="2" />
                                            </g>

                                            <g id="grp6" opacity="0" transform="translate(0 28)">
                                                <circle id="oval1" fill="#CC8EF5" cx="2" cy="7" r="2" />
                                                <circle id="oval2" fill="#91D2FA" cx="3" cy="2" r="2" />
                                            </g>

                                            <g id="grp3" opacity="0" transform="translate(52 28)">
                                                <circle id="oval2" fill="#9CD8C3" cx="2" cy="7" r="2" />
                                                <circle id="oval1" fill="#8CE8C3" cx="4" cy="2" r="2" />
                                            </g>

                                            <g id="grp2" opacity="0" transform="translate(44 6)">
                                                <circle id="oval2" fill="#CC8EF5" cx="5" cy="6" r="2" />
                                                <circle id="oval1" fill="#CC8EF5" cx="2" cy="2" r="2" />
                                            </g>

                                            <g id="grp5" opacity="0" transform="translate(14 50)">
                                                <circle id="oval1" fill="#91D2FA" cx="6" cy="5" r="2" />
                                                <circle id="oval2" fill="#91D2FA" cx="2" cy="2" r="2" />
                                            </g>

                                            <g id="grp4" opacity="0" transform="translate(35 50)">
                                                <circle id="oval1" fill="#F48EA7" cx="6" cy="5" r="2" />
                                                <circle id="oval2" fill="#F48EA7" cx="2" cy="2" r="2" />
                                            </g>

                                            <g id="grp1" opacity="0" transform="translate(24)">
                                                <circle id="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2" />
                                                <circle id="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2" />
                                            </g>
                                        </g>
                                    </svg>
                                </PrimaryButton>

                            </div>
                        </form>


                    </div>
                }
            </div>
        </div>
    )
}