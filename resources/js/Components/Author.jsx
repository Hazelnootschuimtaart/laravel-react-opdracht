import React, { useState } from "react";
import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, usePage } from '@inertiajs/react';

export default function Author({ author }) {
    const { auth } = usePage().props;
    const [editing, setEditing] = useState(false);
    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        name: author.name,
        email: author.email,
        age: author.age,
        followed: author.followed,
    });

    const submit = (e) => {
        e.preventDefault();
        console.log(data, editing, errors);
        patch(route('authors.update', author.id), { onSuccess: () => setEditing(false) });
    };

    return (
        <>
            <div className="flex">
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
                        <Dropdown.Link as="button" href={route('authors.destroy', author.id)} method="delete">
                            Delete
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
            <div className="p-6 flex space-x-2">
                <div>
                    {editing
                        ? <form onSubmit={submit}>
                            <input
                                type="text"
                                placeholder="Name"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                name="author-name"
                                id="author-name"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="block w-full mt-3 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                name="author-email"
                                id="author-email"
                            />
                            <input
                                type="number"
                                placeholder="Age"
                                value={data.age}
                                onChange={e => setData('age', e.target.value)}
                                className="block mt-3 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                name="author-age"
                                id="author-age"
                            />
                            <InputError message={errors.message} className="mt-2" />
                            <div className="space-x-2">
                                <PrimaryButton className="mt-4">Save changes</PrimaryButton>
                                <button className="mt-4" onClick={() => { setEditing(false); reset(); clearErrors(); }}>Cancel</button>
                            </div>
                        </form>
                        : <div>
                            <p className="mt-4 text-lg text-gray-900">{author.name}, {author.email}, {author.age} years old</p>
                            <form className="pt-3" name={"follow-author" + author.id} onSubmit={submit}>
                                {author.followed == false
                                    ? <PrimaryButton className="bg-green-600 hover:bg-green-500 active:bg-green-600 focus:bg-green-600 focus:ring focus:ring-green-700" type='submit' onClick={e => setData('followed', true)}>Follow author</PrimaryButton>
                                    : <PrimaryButton className="bg-rose-600 hover:bg-rose-700 active: bg-rose-600 focus:bg-rose-700 focus:ring focus:ring-rose-700" type='submit' onClick={e => setData('followed', false)}>Stop following author</PrimaryButton>
                                }
                            </form>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}