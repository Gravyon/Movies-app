import "./Header.css";
const Header = () => {
  return (
    <span onClick={() => window.scrollTo(0, 0)} className="header">
      Movies and series
    </span>
  );
};

export default Header;
