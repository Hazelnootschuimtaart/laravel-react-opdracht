import React from "react";


export default function FollowedAuthor({ author }) {

    return (
        <div>
            <span className="font-semibold">Name:</span> {author.name}
        </div>
    );
}