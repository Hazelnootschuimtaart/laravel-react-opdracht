import React, { useState } from "react";
import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, usePage } from '@inertiajs/react';

export default function Book({ book, authors, authorname }) {
    const { auth } = usePage().props;
    const [editing, setEditing] = useState(false);
    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        title: book.title,
        author_id: book.author_id,
        publication_date: book.publication_date,
        genre: book.genre,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('books.update', book.id), { onSuccess: () => setEditing(false) });
    };

    const selectChange = (e) => {
        setData('author_id', e.target.value);
    };

    const reserveBook = () => {
        post(route('reservations.store', book.id));
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
                    {book.created_at !== book.updated_at && <small className="text-sm text-gray-600"> &middot; edited</small>}
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
                        <button className="bg-cyan-400 hover:bg-cyan-500 rounded-md p-2" onClick={(e) => reserveBook(e)}>Reserve book</button>
                    </div>
                }
            </div>
        </div>

    )





}