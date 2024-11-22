import React, { useState } from 'react';

function Navbar({ onSearch, genres, onGenreChange }) {
    const [query, setQuery] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();
        onSearch(query);
    };

    return (
        <div className="navbar">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for a movie..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            <div className="genre-filter">
                <select
                    onChange={(e) => onGenreChange(e.target.value ? parseInt(e.target.value) : null)}
                    defaultValue=""
                >
                    <option value="">All Genres</option>
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default Navbar;
