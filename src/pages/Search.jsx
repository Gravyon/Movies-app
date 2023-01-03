import { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

const Search = () => {
  const { store, actions } = useContext(Context);
  const [search, setSearch] = useState("");

  const handleInput = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
    if (e.target.value === "") {
      actions.getTrending();
    } else {
      actions.filterSearch(e.target.value);
    }
  };

  // useEffect(() => {
  //   getTrending();
  // }, []);

  return (
    <div>
      <span className="pageTitle">Search</span>
      <form>
        <TextField
          onChange={handleInput}
          id="search-bar"
          className="text"
          label="Enter a city name"
          variant="outlined"
          placeholder="Search..."
          size="small"
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon style={{ fill: "blue" }} />
        </IconButton>
      </form>
      <div className="results">
        {store.trending.map((media) => (
          <div>{media.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Search;
