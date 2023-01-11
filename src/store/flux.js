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
      total_pages: 0,
    },
    actions: {
      getTrending: async (page) => {
        const API_KEY = import.meta.env.VITE_APP_API_KEY;
        if (page === undefined) {
          page = 1;
        }
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${page}}`
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
      // Using store proved more trouble than it's worth
      // So every fetch and filter is done locally in each individual component
      // useGenre: (selectedGenres) => {
      //   if (selectedGenres.length < 1) return "";
      //   const GenreIds = selectedGenres.map((g) => g.id);
      //   return GenreIds.reduce((acc, curr) => acc + "," + curr);
      // },
      // getMovies: async (page, genreIDs) => {
      //   let store = getStore();
      //   let actions = getActions();
      //   genreIDs = actions.useGenre(store.filteredGenres);
      //   try {
      //     const response = await axios.get(
      //       `https://api.themoviedb.org/3/discover/movie?api_key=${
      //         import.meta.env.VITE_APP_API_KEY
      //       }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreIDs}`
      //     );
      // console.log(genreIDs);
      // console.log("Movies");
      // console.log(response.data);
      // console.log(response.data.total_pages);
      //     setStore({
      //       movies: response.data.results,
      //       total_pages: response.data.total_pages,
      //     });
      //     return true;
      //   } catch (error) {
      //     console.error(error);
      //   }
      // },
      // getSeries: async (page) => {
      //   try {
      //     const response = await axios.get(
      //       `https://api.themoviedb.org/3/discover/tv?api_key=${
      //         import.meta.env.VITE_APP_API_KEY
      //       }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
      // &with_genres=${genreforURL}`
      // );
      // console.log("Series");
      // console.log(response.data);
      //     setStore({ series: response.data.results });
      //     return true;
      //   } catch (error) {
      //     console.error(error);
      //   }
      // },
      // getGenres: async () => {
      //   try {
      //     const response = await axios.get(
      //       `https://api.themoviedb.org/3/genre/movie/list?api_key=${
      //         import.meta.env.VITE_APP_API_KEY
      //       }&language=en-US`
      //     );
      //     console.log("Movie Genres");
      //     console.log(response.data);
      //     setStore({ genres: response.data.genres });
      // const found = getStore().filteredGenres.some(
      // (r) => getStore().genres.indexOf(r) !== -1
      // );
      //     return true;
      //   } catch (error) {
      //     console.error(error);
      //   }
      // },
      // addGenre: (genre) => {
      //   const store = getStore();
      //   setStore({ filteredGenres: [...store.filteredGenres, genre] });
      //   setStore({
      //     genres: store.genres.filter((item) => item.id !== genre.id),
      //   });
      //   console.log(
      //     "genres add",
      //     store.genres,
      //     "filtrados add",
      //     store.filteredGenres
      //   );
      // },
      // removeGenre: (genre) => {
      //   const store = getStore();
      //   setStore({
      //     filteredGenres: store.filteredGenres.filter(
      //       (filtered) => filtered.id !== genre.id
      //     ),
      //   });
      //   setStore({ genres: [...store.genres, genre] });
      //   console.log(
      //     "genres remove",
      //     store.genres,
      //     "filtrados remove",
      //     store.filteredGenres
      //   );
      // },
      // filterSearch: (searchValue) => {
      //   let store = getStore();
      //   let content = store.content;
      //   content = [store.trending, store.series, store.movies];
      //   console.log(content);
      //   let results = content.filter((item) => {
      //     console.log(item);
      //     if (
      //       item.name
      //         .toString()
      //         .toLowerCase()
      //         .includes(searchValue.toLowerCase()) ||
      //       item.overview
      //         .toString()
      //         .toLowerCase()
      //         .includes(searchValue.toLowerCase()) ||
      //       item.title
      //         .toString()
      //         .toLowerCase()
      //         .includes(searchValue.toLowerCase())
      //     ) {
      //       return item;
      //     }
      //   });
      //   console.log(store.filtered);
      //   setStore({
      //     content: [...results],
      //   });
      // },
    },
  };
};

export default getState;
