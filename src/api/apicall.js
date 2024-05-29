global.searchKey;

const apiKey = "929e3ccff2acbbc5b8231e2689f3a49b";
export const baseImagePath = (size, path) => {
    return `https://image.tmdb.org/t/p/${size}${path}`;
}

export const nowPlayingMovies = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
export const upComingMovies = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`;

export const searchMovies = (keyword) => {
    return `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${keyword}`;    
}

export const movieDetails = (movie_id) => {
    return `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}`;
}

export const movieCastDetails = (movie_id) => {
    return `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${apiKey}`
}
