import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Author from "@/Components/Author";
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';

export default function Index({ auth, authors }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        email: '',
        age: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('authors.store'), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Authors" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <h2 className="my-6 shadow-sm rounded-lg divide-y">Add a new author</h2>
                <form onSubmit={submit}>
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
                    <PrimaryButton className="mt-4" disabled={processing}>Save author</PrimaryButton>
                </form>
                <h2 className="mt-6 shadow-sm rounded-lg divide-y">List of authors:</h2>
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">

                    {authors.map(author =>
                        <Author key={author.id} author={author} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}