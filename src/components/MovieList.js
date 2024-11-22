// src/components/MovieList.js
import React from 'react';
import MovieCard from './MovieCard';

function MovieList({ movies, onFavoriteToggle, onMovieClick }) {
    return (
        <div className="movie-list">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onFavoriteToggle={onFavoriteToggle}
                    onMovieClick={onMovieClick} // Pass down onMovieClick
                />
            ))}
        </div>
    );
}

export default MovieList;
