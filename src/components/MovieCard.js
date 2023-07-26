import * as React from "react";
import { useContext, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";
import AuthContext from "../AuthComponents/AuthContext";
import LoginModal from "../form/LoginModal";

export default function MovieCard({ item }) {
  let url = "https://image.tmdb.org/t/p/original/";

  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    // console.log("print user in MovieCard: ", auth.user);
  }, []);

  function handleOnClick(event) {
    event.preventDefault();
    // console.log("print in moviecard: ", item.id);
    navigate(`movie/${item.id}`);
  }

  return (
    <>
      <Card
        sx={{
          maxWidth: 325,
          // maxHeight: 350,
        }}
      >
        <Box
          onClick={() =>
            auth?.user ? navigate(`/movie/${item.id}`) : navigate(`/login`)
          }
        >
          <Box height="100" position="relative">
            <CardMedia
              component="img"
              height="100%"
              image={url + item.poster_path}
              alt=""
            />
          </Box>
        </Box>
      </Card>
    </>
  );
}
