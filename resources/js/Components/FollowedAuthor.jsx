import React from "react";


export default function FollowedAuthor({ author }) {

    console.log(author);

    return (
        <>
            <div className="p-3">
                <div>
                    <span className="font-semibold">Name:</span> {author.name}
                </div>
                <div>
                    <span className="font-semibold">Age</span> {author.age}
                </div>
            </div>

        </>

    );
}