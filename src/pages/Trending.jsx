import axios from "axios";
import { useEffect, useState } from "react";
import Single from "../components/Single";
import "./Trending.css";
import CustomPagination from "../components/CustomPagination";

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);

  async function getTrending() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${
          import.meta.env.VITE_APP_API_KEY
        }&page=${page}`
      );
      // console.log(response.data);
      setContent(response.data.results);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTrending();
  }, [page]);

  return (
    <div>
      <div className="pageTitle">Trending</div>
      <div className="content">
        {content.map((single) => (
          <Single
            key={single.id}
            id={single.id}
            poster={single.poster_path}
            title={single.title || single.name}
            date={single.first_air_date || single.release_date}
            media_type={single.media_type}
            vote_average={single.vote_average}
          />
        ))}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
};

export default Trending;
