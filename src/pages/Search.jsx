import { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { Button, Tab, Tabs } from "@mui/material";

const Search = () => {
  const { store, actions } = useContext(Context);
  const [search, setSearch] = useState("");
  const [type, setType] = useState(0);

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
      <div style={{ display: "flex", margin: "15px 0" }}>
        <TextField
          style={{ flex: 1 }}
          onChange={handleInput}
          className="searchBox"
          variant="filled"
          placeholder="Search..."
        />
        <Button
          variant="contained"
          style={{ marginLeft: 10 }}
          type="submit"
          aria-label="search"
        >
          <SearchIcon />
        </Button>
      </div>
      <Tabs
        value={type}
        indicatorColor="primary"
        textColor="primary"
        onChange={(event, newValue) => {
          setType(newValue);
        }}
        style={{ paddingBottom: 5 }}
      >
        <Tab style={{ width: "50%" }} label="Search Movies" />
        <Tab style={{ width: "50%" }} label="Search TV Series" />
      </Tabs>
      <div className="results"></div>
    </div>
  );
};

export default Search;
