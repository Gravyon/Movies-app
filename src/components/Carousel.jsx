import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from "../config/config";
import axios from "axios";
import "./single.css";
// const API_KEY = import.meta.env.VITE_APP_API_KEY;

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ media_type, id }) => {
  const [cast, setCast] = useState([]);

  const responsive = {
    //handling resolution pixels
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  const items = cast.map((actor) => (
    <div className="cast">
      <img
        onDragStart={handleDragStart}
        className="cast_img"
        alt={actor.name}
        src={
          actor.profile_path ? `${img_300}/${actor.profile_path}` : noPicture
        }
      />
      <b>{actor.name}</b>
    </div>
  ));

  const fetchCast = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${VITE_APP_API_KEY}&language=en-US`
    );
    // console.log(response.data);
    // console.log(response.data.cast);
    setCast(response.data.cast);
    // dataCast = response.data.cast;
    // console.log("usestate", cast);
    // console.log(cast);
  };

  useEffect(() => {
    fetchCast();
  }, []);

  return (
    <AliceCarousel
      infinite
      autoPlay
      mouseTracking
      disableButtonsControls
      disableDotsControls
      responsive={responsive}
      items={items}
    />
  );
};
export default Carousel;
