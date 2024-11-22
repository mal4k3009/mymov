// src/App.js
import React, { useState, useEffect } from 'react';
import { fetchTrendingMovies, fetchGenres, searchMovies } from './api/tmdb';
import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import MovieModal from './components/MovieModal';
import { ClipLoader } from 'react-spinners';

function App() {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [loading, setLoading] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [showFavorites, setShowFavorites] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null); // For storing the selected movie for modal

    useEffect(() => {
        const loadMoviesAndGenres = async () => {
            setLoading(true);
            const trendingMovies = await fetchTrendingMovies();
            const movieGenres = await fetchGenres();
            setMovies(trendingMovies);
            setGenres(movieGenres);
            setLoading(false);
        };

        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);

        loadMoviesAndGenres();
    }, []);

    const handleSearch = async (query) => {
        if (query.trim()) {
            setLoading(true);
            const searchResults = await searchMovies(query);
            setMovies(searchResults);
            setLoading(false);
        }
    };

    const handleGenreChange = (genreId) => {
        setSelectedGenre(genreId);
        if (genreId === null) {
            fetchTrendingMovies().then(setMovies);
        } else {
            const filteredMovies = movies.filter((movie) =>
                movie.genre_ids.includes(genreId)
            );
            setMovies(filteredMovies);
        }
    };

    const toggleShowFavorites = () => {
        setShowFavorites(!showFavorites);
        if (!showFavorites) {
            setMovies(favorites);
        } else {
            fetchTrendingMovies().then(setMovies);
        }
    };

    const handleFavoriteToggle = (movie) => {
        const updatedFavorites = [...favorites];
        const movieIndex = updatedFavorites.findIndex((fav) => fav.id === movie.id);

        if (movieIndex === -1) {
            updatedFavorites.push(movie);
        } else {
            updatedFavorites.splice(movieIndex, 1);
        }

        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie); // Set the selected movie to show in modal
    };

    const handleCloseModal = () => {
        setSelectedMovie(null); // Close the modal by clearing selected movie
    };

    return (
        <div>
            <Navbar
                onSearch={handleSearch}
                genres={genres}
                onGenreChange={handleGenreChange}
            />
            <button onClick={toggleShowFavorites} className="favorite-toggle-btn">
                {showFavorites ? 'Show All Movies' : 'Show Favorites'}
            </button>
            {loading ? (
                <div className="spinner">
                    <ClipLoader color="#ff6347" size={50} />
                </div>
            ) : (
                <MovieList
                    movies={movies}
                    onFavoriteToggle={handleFavoriteToggle}
                    onMovieClick={handleMovieClick} // Pass the click handler to MovieList
                />
            )}

            {/* Show Movie Modal if a movie is clicked */}
            {selectedMovie && (
                <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
            )}
        </div>
    );
}

export default App;
