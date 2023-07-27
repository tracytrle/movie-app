import * as React from "react";
import { useContext } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";
import AuthContext from "../AuthComponents/AuthContext";

export default function MovieCard({ item }) {
  let url = "https://image.tmdb.org/t/p/original/";

  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  return (
    <>
      <Card
        sx={{
          maxWidth: { xs: 245, md: 325, xl: 325 },
          maxHeight: { xs: 200, xl: 290 },
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
