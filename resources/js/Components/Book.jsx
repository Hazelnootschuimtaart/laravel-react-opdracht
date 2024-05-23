import React, { useState } from "react";
import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, usePage } from '@inertiajs/react';

export default function Book({ book, authorname }) {
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
                        <PrimaryButton className="mt-4" disabled={processing}>Save book</PrimaryButton>
                    </form>
                    : <p>{book.title}, {authorname}, {book.publication_date}, {book.genre}</p>
                }
            </div>
        </div>

    )





}