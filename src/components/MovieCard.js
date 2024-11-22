import React, { useState, useEffect } from 'react';
import { submitRating } from '../api/tmdb'; // Ensure this path is correct

function MovieCard({ movie, onFavoriteToggle, onMovieClick }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [userRating, setUserRating] = useState(null); // Store user's rating

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const favoriteStatus = favorites.some((fav) => fav.id === movie.id);
        setIsFavorite(favoriteStatus);
    }, [movie.id]);

    const toggleFavorite = (e) => {
        e.stopPropagation(); // Prevent triggering movie click when toggling favorite
        onFavoriteToggle(movie);
        setIsFavorite(!isFavorite);
    };

    const handleCardClick = () => {
        onMovieClick(movie); // Trigger modal open
    };

    const handleRatingChange = async (e) => {
        const rating = parseInt(e.target.value);
        setUserRating(rating); // Update UI
        try {
            await submitRating(movie.id, rating); // Call API to submit rating
            alert(`Your rating of ${rating} has been submitted!`);
        } catch (error) {
            console.error('Error submitting rating:', error);
            alert('Failed to submit your rating. Please try again.');
        }
    };

    return (
        <div className="movie-card" onClick={handleCardClick}>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>

            <div className="movie-info">
                <p>Release Date: {movie.release_date}</p>
                <p>Rating: {movie.vote_average}</p>
            </div>

            <button className="favorite-btn" onClick={toggleFavorite}>
                {isFavorite ? '♥' : '♡'}
            </button>

            {/* Rating Dropdown */}
            <div className="rating-dropdown">
                <label htmlFor={`rating-${movie.id}`}>Rate this movie:</label>
                <select
                    id={`rating-${movie.id}`}
                    value={userRating || ''}
                    onChange={handleRatingChange}
                >
                    <option value="" disabled>
                        Select a rating
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
        </div>
    );
}

export default MovieCard;
