import Card from "react-bootstrap/Card";
import { img_300, unavailable } from "../config/config";
import "./single.css";

const Single = ({ id, poster, title, date, media_type, vote_average }) => {
  return (
    <Card className="card_content" key={id} style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        className="image"
        alt={title}
        src={poster ? `${img_300}/${poster}` : unavailable}
      />
      <Card.Body>
        <Card.Title className="title">{title}</Card.Title>
        <Card.Subtitle className="subtitle">
          {media_type === "tv" ? "TV" : "Movie"}
          <Card.Subtitle className="subtitle">{date}</Card.Subtitle>
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default Single;