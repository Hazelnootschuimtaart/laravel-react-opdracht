import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import FollowedAuthor from '@/Components/FollowedAuthor';
import { useForm, Head } from '@inertiajs/react';

export default function Index({ auth, followedAuthors }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        xxxxxxxxxxx: '',
    });

    console.log(followedAuthors);

    const submit = (e) => {
        e.preventDefault();
        post(route('follows.store'), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Follows" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <h2 className='text-xl'>Followed authors</h2>
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {followedAuthors.map((author, index) => {
                        return <FollowedAuthor key={index} author={author} />
                    }
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}