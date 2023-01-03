import axios from "axios";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      trending: [],
      page: 1,
    },
    actions: {
      getTrending: async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/trending/all/day?api_key=${
              import.meta.env.VITE_APP_API_KEY
            }`
            // }&page=${store.page}`
          );
          // const data = await response.json();
          console.log(response.data.results);
          setStore({ trending: response.data.results });
          return response;
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
};

export default getState;
