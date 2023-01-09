import { useContext, useEffect, useState } from "react";
import Single from "../components/Single";
import "./styles.css";
// import { Context } from "../store/appContext";
import { Pagination } from "@mui/material";
import Genres from "../components/Genres";
import useGenre from "../hooks/useGenre";
import axios from "axios";

const Series = () => {
  // const { store, actions } = useContext(Context);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const genreforURL = useGenre(selectedGenres);

  const handlePagination = (page, numOfPages) => {
    window.scroll(0, 0);
    setPage(page);
    setNumOfPages(numOfPages);
  };

  const fetchSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${
        import.meta.env.VITE_APP_API_KEY
      }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    setContent(data.results);
    console.log(data.total_pages);
    if (data.total_pages.lentgh > 500) {
      setNumOfPages(500);
    } else {
      setNumOfPages(data.total_pages);
    }
    // console.log(data);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSeries();
  }, [genreforURL, page]);

  return (
    <div>
      <div className="pageTitle">Movies</div>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="content">
        {content.map((single) => (
          <Single
            key={single.id}
            id={single.id}
            poster={single.poster_path}
            title={single.name}
            date={single.first_air_date}
            media_type={"movie"}
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
          count={numOfPages}
          page={page}
          onChange={(e) => handlePagination(e.target.textContent)}
          hideNextButton
          hidePrevButton
        />
      </div>
    </div>
  );
};

export default Series;
