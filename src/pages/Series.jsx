import { useContext } from "react";
import Single from "../components/Single";
import "./styles.css";
import { Context } from "../store/appContext";
import { Pagination } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Series = () => {
  const { store, actions } = useContext(Context);

  const handlePagination = async (page) => {
    window.scroll(0, 0);
    await actions.getSeries(page);
  };

  return (
    <div>
      <div className="pageTitle">TV Series</div>
      <div className="content">
        {store.series.map((single) => (
          <Single
            key={single.id}
            id={single.id}
            poster={single.poster_path}
            title={single.name}
            date={single.first_air_date}
            media_type="TV"
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
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Pagination
            count={500}
            onChange={(e) => handlePagination(e.target.textContent)}
            hideNextButton
            hidePrevButton
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Series;
