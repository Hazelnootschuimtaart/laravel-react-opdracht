import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';
import ReservedBook from '@/Components/ReservedBook';

export default function Index({ auth, booksWithReservationOfCurrentUser }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        xxxxxxxxxxxx: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('chirps.store'), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Reservations" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <h2 className='text-xl'>Reserved books</h2>
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {booksWithReservationOfCurrentUser.map((reservedBook, index) => {
                        const reservationsOfBook = reservedBook.reservations;
                        if (reservationsOfBook.length != 0) {
                            return <ReservedBook key={index} book={reservedBook} />
                        }
                    }
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}