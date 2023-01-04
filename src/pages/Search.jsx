import { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Series from "./Series";
import Movies from "./Movies";
import { Container } from "@mui/system";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const Search = () => {
  const { store, actions } = useContext(Context);
  const [search, setSearch] = useState("");

  const handleInput = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
    if (e.target.value === "") {
      actions.getSeries();
      actions.getMovies();
    } else {
      actions.filterSearch(e.target.value);
    }
  };

  return (
    <div>
      <span className="pageTitle">Search</span>
      <form>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <TextField
            style={{ color: "white", alignContent: "center" }}
            onChange={handleInput}
            id="search-bar"
            className="text"
            variant="outlined"
            placeholder="Search..."
            size="small"
          />
          <IconButton type="submit" aria-label="search">
            <SearchIcon />
          </IconButton>
        </ThemeProvider>
      </form>
      <div className="results">
        <Container>
          <Series />
          <Movies />
        </Container>
      </div>
    </div>
  );
};

export default Search;
