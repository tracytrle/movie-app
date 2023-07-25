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
    console.log("print in moviecard: ", item.id);
    navigate(`movie/${item.id}`);
  }

  return (
    <Card sx={{ maxWitemth: 345 }}>
      <CardActionArea LinkComponent={Link} href={`/movie/${item.id}`}>
        <Box height="100" position="relative">
          <CardMedia
            component="img"
            height="100%"
            image={url + item.poster_path}
            alt=""
          />
        </Box>
      </CardActionArea>
    </Card>
  );
}
