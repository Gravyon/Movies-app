import Card from "react-bootstrap/Card";
import { img_300, unavailable, img_500 } from "../config/config";
import "./single.css";
import { Badge } from "@mui/material";

const Single = ({ id, poster, title, date, media_type, vote_average }) => {
  return (
    <Card className="card_content" key={id} style={{ width: "17rem" }}>
      <Badge
        badgeContent={
          vote_average > 0 ? vote_average.toString().slice(0, 3) : "1"
        }
        color={vote_average >= 6 ? "success" : "secondary"}
      />
      <Card.Img
        variant="top"
        className="image"
        alt={title}
        src={poster ? `${img_300}/${poster}` : unavailable}
      />
      <Card.Body>
        <Card.Title className="title">{title}</Card.Title>
        <Card.Subtitle className="subtitle">
          {/* {media_type.toUpperCase()} */}
          {media_type === "tv" ? "TV Series" : "Movie"}
          <Card.Subtitle className="subtitle">{date}</Card.Subtitle>
        </Card.Subtitle>
        {/* <Card.Subtitle className="overview">{overview}</Card.Subtitle> */}
      </Card.Body>
    </Card>
  );
};

export default Single;
