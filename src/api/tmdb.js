// src/tmdb.js
import axios from 'axios';

// Load environment variables
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const ACCESS_TOKEN = process.env.REACT_APP_TMDB_ACCESS_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

// Create an Axios instance with the Access Token for authentication
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
});

// Fetch trending movies
export const fetchTrendingMovies = async () => {
    try {
        const response = await axiosInstance.get('/trending/movie/day');
        return response.data.results;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        return [];
    }
};

// Search movies by query
export const searchMovies = async (query) => {
    try {
        const response = await axiosInstance.get('/search/movie', {
            params: { query },
        });
        return response.data.results;
    } catch (error) {
        console.error('Error searching for movies:', error);
        return [];
    }
};

// Fetch all movie genres
export const fetchGenres = async () => {
    try {
        const response = await axiosInstance.get('/genre/movie/list', {
            params: { api_key: API_KEY, language: 'en-US' },
        });
        return response.data.genres;
    } catch (error) {
        console.error('Error fetching genres:', error);
        return [];
    }
};

// Submit a user rating for a specific movie
export const submitRating = async (movieId, rating) => {
    try {
        const response = await axiosInstance.post(`/movie/${movieId}/rating`, {
            value: rating,
        });
        return response.data;
    } catch (error) {
        console.error('Error submitting rating:', error);
        throw error;
    }
};
