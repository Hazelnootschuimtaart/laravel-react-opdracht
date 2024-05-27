import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';
import Book from "@/Components/Book";

export default function Index({ auth, books, authors, authornames }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        author_id: 1,
        publication_date: '',
        genre: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('books.store'), { onSuccess: () => reset() });
    };

    const selectChange = (e) => {
        setData('author_id', e.target.value);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Books" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <h2 className="text-xl pb-4">Add a new book</h2>
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
                <div>
                    <h2 className="pt-4 text-xl">Available books</h2>

                    <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                        {books.map((book, index) =>
                            <Book key={book.id} book={book} authors={authors} authorname={authornames[index]} />
                        )}
                    </div>
                </div>

                {/* De reserveringen op een nieuw tabblad 
              Je klikt in de browser op 'reserveer'.
              Onclick geactiveerd, dan moet ie dat boek naar reserveringen sturen. Hoe kan hij het boek toevoegen aan het Reserveringen tabblad?
              reserved-books-array?


              reserve --> boolean met isReserved op true zetten voor dat boek.
              Dan in index van reservations een ternary zetten met daarin isReserved ? show book : don't show book

<a href="{{ route('post.show', $post->id) }}" class="btn btn-primary">Read More</a>
maar dan ipv post.show doe je reservations.index en ipv $post->id doe je $book->id oid...?

Kun je de store route van reservations aanspreken via books?
Via de reservations-versie van:
    const submit = (e) => {
        e.preventDefault();
        post(route('books.store'), { onSuccess: () => reset() });
  };
        - knop aanmaken in Book
        - als klik op knop, dan 
        de reservations-versie van:
    const submit = (e) => {
        e.preventDefault();
        post(route('books.store'), { onSuccess: () => reset() });

  Ben nu bezig met alles goed zetten voor het kunnen 'storen' van het gereserveerde boek, mócht het werken. Zodat ik het kan testen.

             */}

            </div>
        </AuthenticatedLayout>
    )
}
