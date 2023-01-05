import axios from "axios";

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
          console.log("Trending");
          console.log(response.data.results);
          setStore({
            trending: response.data.results,
          });
          return true;
        } catch (error) {
          console.error(error);
        }
      },
      getMovies: async (page) => {
        // if (page === undefined) {
        //   page = 1;
        // }
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${
              import.meta.env.VITE_APP_API_KEY
            }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
            // &with_genres=${genreforURL}`
          );
          console.log("Movies");
          console.log(response.data);
          // console.log(page);
          setStore({ movies: response.data.results });
          return true;
        } catch (error) {
          console.error(error);
        }
      },
      getSeries: async (page) => {
        // if (page === undefined) {
        //   page = 1;
        // }
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/discover/tv?api_key=${
              import.meta.env.VITE_APP_API_KEY
            }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
            // &with_genres=${genreforURL}`
          );
          console.log("Series");
          console.log(response.data);
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
          );
          console.log("Genres");
          console.log(response.data);
          // console.log(page);
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
        // console.log(store.genres);
        console.log(
          "addgenre",
          "filtered",
          store.filteredGenres,
          "genres",
          store.genres
        );
      },
      removeGenre: (genre) => {
        const store = getStore();
        setStore({ genres: [...store.genres, genre] });
        setStore({
          filteredGenres: store.filteredGenres.filter(
            (filtered) => filtered.id !== genre.id
          ),
        });

        console.log(
          "removegenre",
          "filtered",
          store.filteredGenres,
          "genres",
          store.genres
        );
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
          filtered: results,
        });
      },
    },
  };
};

export default getState;
