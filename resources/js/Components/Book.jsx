import React, { useState } from "react";
import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, usePage } from '@inertiajs/react';

export default function Book() {

    return (

        
        <div className="p-6 flex space-x-2">
            <div>
                <form onSubmit={submit}>
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

            </div>
        </div>

    )





}