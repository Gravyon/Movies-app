import { useEffect, useState } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

const Search = () => {
  const [content, setContent] = useState([]);
  const [search, setSearch] = useState("");
  async function getTrending() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${
          import.meta.env.VITE_APP_API_KEY
        }`
      );
      console.log(response.data);
      setContent(response.data.results);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
  const filterSearch = (searchValue) => {
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
        item.title.toString().toLowerCase().includes(searchValue.toLowerCase())
      ) {
        // console.log(item);
        // Retorna item
        return item;
      }
    });
    setContent({
      content: results,
    });
  };

  const handleInput = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
    if (e.target.value === "") {
      getTrending();
    } else {
      filterSearch(e.target.value);
    }
  };

  useEffect(() => {
    getTrending();
  }, []);
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
        {content.map((media) => (
          <div>{media.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Search;
