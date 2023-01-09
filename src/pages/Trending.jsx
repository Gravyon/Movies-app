import { useContext } from "react";
import Single from "../components/Single";
import "./styles.css";
import { Context } from "../store/appContext";
import { Pagination } from "@mui/material";

const Trending = () => {
  const { store, actions } = useContext(Context);

  const handlePagination = async (page) => {
    window.scrollTo(0, 0);
    await actions.getTrending(page);
  };

  return (
    <div>
      <div className="pageTitle">Trending</div>
      <div className="content">
        {store.trending.map((single) => (
          <Single
            key={single.id}
            id={single.id}
            poster={single.poster_path}
            title={single.title || single.name}
            date={single.first_air_date || single.release_date}
            media_type={single.media_type}
            vote_average={single.vote_average}
            overview={single.overview}
          />
        ))}
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Pagination
          color="primary"
          count={10}
          onChange={(e) => handlePagination(e.target.textContent)}
          hideNextButton
          hidePrevButton
        />
      </div>
    </div>
  );
};

export default Trending;
