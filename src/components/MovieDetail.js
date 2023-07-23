import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "@mui/material";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";

export default function MovieDetail({ id }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState();

  // const imageUrl = "https://api.themoviedb.org/3/movie/";
  const imageUrl = "https://image.tmdb.org/t/p/w500/";

  useEffect(() => {
    console.log("========> print in MovieDetail item.id: ", id);
    const fetchData = async () => {
      try {
        console.log(`=========>`);
        setLoading(true);
        const res = await apiService.get(`/movie/${id}?api_key=${API_KEY}`);
        // console.log("print MovieDetail from fetch: ", res);
        const fullImageUrl = imageUrl + res.data.poster_path;
        console.log("print MovieDetail image: ", fullImageUrl);
        setMovie({ ...res.data, fullImageUrl });
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

  if (!movie) {
    return <div></div>;
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={movie.fullImageUrl}
        // image="/static/images/cards/contemplative-reptile.jpg"
        alt=""
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {`${movie.original_title}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`${movie.overview}`}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}
