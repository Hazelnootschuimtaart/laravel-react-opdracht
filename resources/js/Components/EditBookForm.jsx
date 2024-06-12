import React, { useState } from "react";
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import { useForm, usePage } from '@inertiajs/react';

export default function EditBookForm(props) {

    const dataFromProps = props.data;
    const { data, setData, errors, clearErrors, reset } = useForm({
        title: dataFromProps.title,
        author_id: dataFromProps.author_id,
        publication_date: dataFromProps.publication_date,
        genre: dataFromProps.genre,
    });

    const handleChange = (e, newData) => {
        const type = e.target.value;
        console.log(type);
        props.changeData(newData, type);
    }

    const handleSubmit = (e) => {
        props.handleSubmit(e);
    }

    const changeEditing = (isEditing) => {
        props.editing(isEditing);
    }
    console.log(author_id);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={dataFromProps.title}
                    onChange={e => handleChange(e, 'title')}
                    className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                    name="book-title"
                    id="book-name"
                />
                <select id="author_id" name="author_id" onChange={(e) => handleChange(e, 'author_id')} className="block w-full mt-3 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm">
                    {props.authors.map(author =>
                        <option key={author.id} value={author.id}>{author.name}</option>
                    )}
                </select>
                <input
                    type="date"
                    value={dataFromProps.publication_date}
                    onChange={e => handleChange('publication_date', e)}
                    className="block w-full mt-3 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                    name="publication_date"
                    id="publication_date"
                />
                <input
                    type="text"
                    placeholder="Genre"
                    value={dataFromProps.genre}
                    onChange={e => handleChange('genre', e)}
                    className="block mt-3 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                    name="book-genre"
                    id="book-genre"
                />
                <InputError message={errors.message} className="mt-2" />
                <div className="space-x-2">
                    <PrimaryButton type="submit" className="mt-4">Save changes</PrimaryButton>
                    <button className="mt-4" onClick={() => { changeEditing(false); reset(); clearErrors(); }}>Cancel</button>
                </div>
            </form>
        </>
    )
}