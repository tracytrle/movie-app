import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "@mui/material";

export default function MovieDetail({ item }) {
  let url = "https://image.tmdb.org/t/p/original/";

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea LinkComponent={Link} to={`movie/${item.id}`}>
        <CardMedia
          component="img"
          height="140"
          image={url + item.poster_path}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {`${item.original_title}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`${item.overview}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}
