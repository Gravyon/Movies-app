import axios from "axios";
import { useEffect, useState } from "react";
import Single from "../components/Single";
import "./Trending.css";

const Trending = () => {
  const [content, setContent] = useState([]);
  async function getTrending() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${
          import.meta.env.VITE_APP_API_KEY
        }`
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
  }, []);

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
    </div>
  );
};

export default Trending;
