import React from "react";

export default function ShowBook(props) {
    return (
        <>
            <div>
                <span className="font-semibold">Title:</span> {props.book.title}
            </div>
            <div>
                <span className="font-semibold">Author:</span> {props.authorname}
            </div>
            <div><span className="font-semibold">Publication date:</span> {props.book.publication_date}
            </div>
            <div>
                <span className="font-semibold">Genre:</span> {props.book.genre}
            </div>
        </>
    )
}