import { useEffect, useState } from "react";
import Single from "../components/Single";
import "./styles.css";
import { Pagination } from "@mui/material";
import Genres from "../components/Genres";
import useGenre from "../hooks/useGenre";
import axios from "axios";

const Movies = () => {
  const VITE_APP_API_KEY = import.meta.env.VITE_APP_API_KEY;
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

  const fetchMovies = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${VITE_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    setContent(response.data.results);
    setNumOfPages(response.data.total_pages);
    // console.log(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchMovies();
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
            title={single.title}
            date={single.release_date}
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
          onChange={(e) => handlePagination(e.target.textContent)}
          count={numOfPages > 500 ? setNumOfPages(500) : numOfPages}
          page={Number(page)}
          hideNextButton
          hidePrevButton
        />
      </div>
    </div>
  );
};

export default Movies;
