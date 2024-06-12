import React from "react";
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function ReservationButtons(props) {

    const handleSubmitReservation = (e) => {
        props.handleSubmitReservation(e);
    };

    const handleDeleteReservation = (e) => {
        props.handleDeleteReservation(e);
    }

    return (
        <form className="pt-3" name={"reserve-book" + props.book.id} onSubmit={handleSubmitReservation}>
            <PrimaryButton className="bg-sky-400 hover:bg-sky-500" type='submit'>Reserve book</PrimaryButton>
            <PrimaryButton className="bg-red-600 hover:bg-red-700" onClick={handleDeleteReservation} method="delete">Cancel reservation</PrimaryButton>
        </form>
    )
}
