import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";

export default function MovieCard({ item }) {
  let url = "https://image.tmdb.org/t/p/original/";

  const navigate = useNavigate();

  function handleOnClick(event) {
    event.preventDefault();
    navigate(`movie/${item.id}`);
  }

  return (
    <Card sx={{ maxWitemth: 345 }} onClick={handleOnClick}>
      <CardActionArea LinkComponent={Link} to={`/movie/${item.id}`}>
        <Box height="150" position="relative">
          <CardMedia
            component="img"
            height="100%"
            image={url + item.poster_path}
            alt=""
          />
          <Typography
            gutterBottom
            variant="h8"
            component="div"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              width: "100%",
              textAlign: "center",
              zIndex: 1,
            }}
          >
            {`${item.original_title}`}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
}
