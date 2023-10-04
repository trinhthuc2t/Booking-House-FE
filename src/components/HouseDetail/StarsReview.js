import React from "react";

const StarsReview = ({rating}) => {
    const fullStars = (rating > 0 && rating <= 5) ? Math.floor(rating) : 0;
    const halfStars = (rating - fullStars > 0 && rating - fullStars < 1) ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;
    return (
        <>
            {Array.from({length: fullStars}, (_, i) =>
                <small key={i} className="fa-solid fa-star"></small>
            )}

            {Array.from({length: halfStars}, (_, i) =>
                <small key={i} className="fa-solid fa-star-half-stroke"></small>
            )}

            {Array.from({length: emptyStars}, (_, i) =>
                <small key={i} className="fa-solid fa-star star-gray"></small>
            )}
        </>
    );
}

export default StarsReview;