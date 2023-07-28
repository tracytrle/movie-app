import React from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import MovieCard from "./MovieCard";
import Divider from "@mui/material/Divider";

function ShowMovies({ moviesList }) {
  return (
    <>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        color="white"
        backgroundColor="primary.light"
      ></Stack>
      <Divider />
      <Grid container direction="row" spacing={2} mt={2}>
        {moviesList.map((item) => (
          <Grid key={item.id} item xs={6} sm={4} md={3}>
            <MovieCard item={item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default ShowMovies;
