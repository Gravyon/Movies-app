import { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { Button, Tab, Tabs } from "@mui/material";
import Single from "../components/Single";
import { Pagination } from "@mui/material";
import axios from "axios";

const Search = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const fetchSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          import.meta.env.VITE_APP_API_KEY
        }&language=en-US&&query=${search}&page=${page}&include_adult=false`
      );
      console.log(response.data.results);
      setContent(response.data.results);
      setNumOfPages(data.total_pages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);

  return (
    <div>
      <span className="pageTitle">Search</span>
      <div
        className="tabs"
        style={{ display: "flex", justifyContent: "center", margin: "15px 0" }}
      >
        <TextField
          style={{ flex: 1 }}
          // onChange={(e) => setSearch(e.target.value)}
          className="searchBox"
          variant="filled"
          placeholder="Search..."
        />
        <Button
          onClick={fetchSearch}
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
      >
        <Tab style={{ width: "50%" }} label="Search Movies" />
        <Tab style={{ width: "50%" }} label="Search TV Series" />
      </Tabs>
      <div className="content">
        {content.map((single) => (
          <Single
            key={single.id}
            id={single.id}
            poster={single.poster_path}
            title={single.title || single.name}
            date={single.release_date || single.first_air_date}
            media_type={type ? "tv" : "movie"}
            vote_average={single.vote_average}
          />
        ))}
      </div>
      {numOfPages > 1 && (
        <Pagination
          onChange={(e) => handlePagination(e.target.textContent)}
          count={numOfPages > 500 ? setNumOfPages(500) : numOfPages}
          page={Number(page)}
          hideNextButton
          hidePrevButton
        />
      )}
    </div>
  );
};

export default Search;
