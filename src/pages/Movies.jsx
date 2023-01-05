import { useContext, useEffect, useState } from "react";
import Single from "../components/Single";
import "./styles.css";
import { Context } from "../store/appContext";
import { Pagination } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Chip from "@mui/material/Chip";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

// const lightTheme = createTheme({
//   palette: {
//     mode: "light",
//   },
// });

const Movies = () => {
  const { store, actions } = useContext(Context);

  const handlePagination = async (page) => {
    window.scroll(0, 0);
    await actions.getMovies(page);
  };

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="pageTitle">Movies</div>
        <div style={{ padding: "6px 0" }}>
          {store.filteredGenres.map((genre) => (
            <Chip
              clickable
              size="small"
              key={genre.id}
              label={genre.name}
              style={{ margin: 2 }}
              color="primary"
              onClick={() => actions.removeGenre(genre)}
            />
          ))}
          {store.genres.map((genre) => (
            <Chip
              clickable
              size="small"
              key={genre.id}
              label={genre.name}
              style={{ margin: 2 }}
              onClick={() => actions.addGenre(genre)}
            />
          ))}
        </div>

        <div className="content">
          {store.movies.map((single) => (
            <Single
              key={single.id}
              id={single.id}
              poster={single.poster_path}
              title={single.title}
              date={single.release_date}
              media_type="Movies"
              vote_average={single.vote_average}
            />
          ))}
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 10,
            color: "white",
          }}
        >
          <Pagination
            count={500}
            onChange={(e) => handlePagination(e.target.textContent)}
            hideNextButton
            hidePrevButton
          />
        </div>
      </ThemeProvider>
    </div>
  );
};

export default Movies;
