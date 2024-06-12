import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';
import FavouriteBook from '@/Components/FavouriteBook';

export default function Favourites({ auth, favourites }) {

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Favourites" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <h2 className='text-xl'>Favourite books</h2>
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {favourites.map((favouriteBook, index) => {
                        return <FavouriteBook key={index} book={favouriteBook} />
                    }
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    )
}