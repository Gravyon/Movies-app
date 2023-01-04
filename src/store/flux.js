import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      trending: [],
      movies: [],
      series: [],
      content: [],
      filtered: [],
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
          // const data = await response.json();
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
        if (page === undefined) {
          page = 1;
        }
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${
              import.meta.env.VITE_APP_API_KEY
            }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
            // &with_genres=${genreforURL}`
          );
          // const data = await response.json();
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
        if (page === undefined) {
          page = 1;
        }
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/discover/tv?api_key=${
              import.meta.env.VITE_APP_API_KEY
            }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
            // &with_genres=${genreforURL}`
          );
          // const data = await response.json();
          console.log("Series");
          console.log(response.data);
          // console.log(page);
          setStore({ series: response.data.results });
          return true;
        } catch (error) {
          console.error(error);
        }
      },
      filterSearch: (searchValue) => {
        let store = getStore();
        let results = store.trending.filter((item) => {
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
        setStore({
          filtered: results,
        });
      },
    },
  };
};

export default getState;
