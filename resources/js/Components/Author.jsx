import React, { useState } from "react";
import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, usePage } from '@inertiajs/react';

// OP DROPDOWN STUK ALLE CHIRP DINGEN WEGHALEN



export default function Author({ author }) {

    const { auth } = usePage().props;
    const [editing, setEditing] = useState(false);
    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        name: author.name,
        email: author.email,
        age: author.age,
    });

    const submit = (e) => {

        e.preventDefault();

        patch(route('authors.update', author.id), { onSuccess: () => setEditing(false) });

    };

    return (
        <>
            <div className="p-6 flex space-x-2">
                <div className="flex-1">
                    <p className="mt-4 text-lg text-gray-900">{author.name}, {author.email}, {author.age} years old</p>
                    {author.created_at !== author.updated_at && <small className="text-sm text-gray-600"> &middot; edited</small>}
                </div>
            </div>
            <div>

                <button className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out" onClick={() => setEditing(true)}>
                    Edit
                </button>
            </div>
        </>

    )
}