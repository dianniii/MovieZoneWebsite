import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
        input: {
            main: 'index.html',
            watchlist: 'watchlist.html',
            favorites: 'favorites.html',
            genre: 'genre.html',
            movie: 'movie.html',
            search: 'search.html'
        }
    }
}
});