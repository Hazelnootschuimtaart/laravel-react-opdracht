import React from "react";

export default function ReservedBook( {book} ) {
    return (
        <div>
            <div>
                <span className="font-semibold">Title:</span> {book.title}
            </div>
            {/* <div>
                <span className="font-semibold">Author:</span> {authorname}
            </div>*/}
            {/* <div><span className="font-semibold">Publication date:</span> {book.publication_date}
            </div>
            <div>
                <span className="font-semibold">Genre:</span> {book.genre}
            </div>  */}
            {/* <button className="bg-cyan-400 hover:bg-cyan-500 rounded-md p-2" onClick={(e) => reserveBook(e)}>Reserve book</button> */}
        </div>
    )
}