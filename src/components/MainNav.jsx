import * as React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MainNav.css";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import TvIcon from "@mui/icons-material/Tv";
import SearchIcon from "@mui/icons-material/Search";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    window.scroll(0, 0);
    if (value === 0) navigate("/");
    else if (value === 1) navigate("/movies");
    else if (value === 2) navigate("/series");
    else if (value === 3) navigate("/search");
  }, [value]);

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        zIndex: 100,
      }}
    >
      <BottomNavigation
        className="footer"
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Trending"
          icon={<WhatshotIcon />}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Movies"
          icon={<MovieCreationIcon />}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="TV Series"
          icon={<TvIcon />}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Search"
          icon={<SearchIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
