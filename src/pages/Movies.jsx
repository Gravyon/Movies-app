import { useContext } from "react";
import Single from "../components/Single";
import "./Trending.css";
import CustomPagination from "../components/CustomPagination";
import { Context } from "../store/appContext";

const Movies = () => {
  const { store } = useContext(Context);

  return (
    <div>
      <div className="pageTitle">Movies</div>
      <div className="content">
        {store.movies.map((single) => (
          <Single
            key={single.id}
            id={single.id}
            poster={single.poster_path}
            title={single.title}
            date={single.release_date}
            media_type={single.media_type}
            vote_average={single.vote_average}
          />
        ))}
      </div>
      <CustomPagination />
    </div>
  );
};

export default Movies;
