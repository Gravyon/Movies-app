import { Pagination, createTheme } from "@mui/material";
import { Context } from "../store/appContext";
import { useContext } from "react";

const CustomPagination = ({ numOfPages = 10 }) => {
  const { store, actions } = useContext(Context);

  const handlePagination = (page) => {
    window.scroll(0, 0);
    actions.getTrending(page);
    actions.getMovies(page);
  };

  return (
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
        count={numOfPages}
        defaultPage={1}
        onChange={(e) => handlePagination(e.target.textContent)}
      />
    </div>
  );
};

export default CustomPagination;
