// src/components/MovieModal.js
import React, { useState, useEffect } from 'react';

function MovieModal({ movie, onClose }) {
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
            );
            const details = await response.json();
            setMovieDetails(details);
        };

        fetchMovieDetails();
    }, [movie.id]);

    if (!movieDetails) return null; // Wait until movie details are fetched

    return (
        <div className="movie-modal-overlay" onClick={onClose}>
            <div className="movie-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>
                    &times;
                </button>
                <div className="movie-modal-content">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                        alt={movieDetails.title}
                    />
                    <div className="movie-modal-info">
                        <h2>{movieDetails.title}</h2>
                        <p>{movieDetails.overview}</p>
                        <p><strong>Release Date:</strong> {movieDetails.release_date}</p>
                        <p><strong>Runtime:</strong> {movieDetails.runtime} minutes</p>
                        <p><strong>Genres:</strong> {movieDetails.genres.map(genre => genre.name).join(', ')}</p>
                        <p><strong>Vote Average:</strong> {movieDetails.vote_average}</p>
                        <p><strong>Cast:</strong> {/* Fetch and display the cast here */}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieModal;
