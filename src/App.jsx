import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/MainNav";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Trending from "./pages/Trending";
import Search from "./pages/Search";

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
