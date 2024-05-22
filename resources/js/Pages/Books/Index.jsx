import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';
 
export default function Index({ auth }) {
    const { data, setData, post, processing, reset, errors } = useForm({
         title: '',
         publication_date: '',
         genre: '',
    });

const submit = (e) => {
    e.preventDefault();
    post(route('books.store'), { onSuccess: () => reset() });
};

return (
    <AuthenticatedLayout user={auth.user}>
            <Head title="Books" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <h2>Add a new book</h2>
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
                    {/* Hiertussen auteur kunnen laten kiezen */}
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
                {/* <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {authors.map(author =>
                        <Book key={author.id} author={author} />
                    )}
                </div> */}
            </div>
        </AuthenticatedLayout>
)


}
