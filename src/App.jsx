import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import injectContext from "./store/appContext";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/MainNav";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Trending from "./pages/Trending";
import Search from "./pages/Search";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <div className="app">
          <Container>
            <Routes>
              <Route path="/" element={<Trending />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/series" element={<Series />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </Container>
        </div>
        <Footer />
      </ThemeProvider>
    </Router>
  );
}

export default injectContext(App);
