import { Button } from "@mui/material";
import "./Header.css";
const Header = () => {
  return (
    <span onClick={() => window.scrollTo(0, 0)} className="header">
      Movies and series
      <Button onClick={() => handleTheme} className="theme">
        Dark
      </Button>
    </span>
  );
};

export default Header;
