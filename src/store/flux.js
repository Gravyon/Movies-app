import axios from "axios";
import useGenre from "../hooks/useGenre";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      trending: [],
      movies: [],
      series: [],
      content: [],
      filtered: [],
      genres: [],
      filteredGenres: [],
      total_pages: 0,
    },
    actions: {
      getTrending: async (page) => {
        if (page === undefined) {
          page = 1;
        }
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/trending/all/day?api_key=${
              import.meta.env.VITE_APP_API_KEY
            }&page=${page}}`
          );
          // console.log("Trending");
          // console.log(response.data);
          setStore({
            trending: response.data.results,
          });
          return true;
        } catch (error) {
          console.error(error);
        }
      },
      getMovies: async (page, genreIDs) => {
        let store = getStore();
        genreIDs = useGenre(store.filteredGenres);
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${
              import.meta.env.VITE_APP_API_KEY
            }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreIDs}`
          );
          // console.log(genreIDs);
          // console.log("Movies");
          // console.log(response.data);
          // console.log(response.data.total_pages);
          setStore({
            movies: response.data.results,
            total_pages: response.data.total_pages,
          });
          return true;
        } catch (error) {
          console.error(error);
        }
      },
      getSeries: async (page) => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/discover/tv?api_key=${
              import.meta.env.VITE_APP_API_KEY
            }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
            // &with_genres=${genreforURL}`
          );
          // console.log("Series");
          // console.log(response.data);
          setStore({ series: response.data.results });
          return true;
        } catch (error) {
          console.error(error);
        }
      },
      getGenres: async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${
              import.meta.env.VITE_APP_API_KEY
            }&language=en-US`
            //&with_genres=${genreIDs}
          );
          // console.log("Movie Genres");
          // console.log(response.data);
          setStore({ genres: response.data.genres });
          return true;
        } catch (error) {
          console.error(error);
        }
      },
      addGenre: (genre) => {
        const store = getStore();
        setStore({ filteredGenres: [...store.filteredGenres, genre] });
        setStore({
          genres: store.genres.filter((item) => item.id !== genre.id),
        });
      },
      removeGenre: (genre) => {
        const store = getStore();
        setStore({ genres: [...store.genres, genre] });
        setStore({
          filteredGenres: store.filteredGenres.filter(
            (filtered) => filtered.id !== genre.id
          ),
        });
      },
      filterSearch: (searchValue) => {
        let store = getStore();
        let content = store.content;
        content = [store.trending, store.series, store.movies];
        console.log(content);
        let results = content.filter((item) => {
          console.log(item);
          if (
            item.name
              .toString()
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            item.overview
              .toString()
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            item.title
              .toString()
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          ) {
            return item;
          }
        });
        console.log(store.filtered);
        setStore({
          content: [...results],
        });
      },
    },
  };
};

export default getState;
