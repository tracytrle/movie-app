import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import MovieCard from "./MovieCard";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

function ShowMovies({ moviesList }) {
  return (
    <>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        color="white"
      ></Stack>
      <Divider />
      <Grid container direction="row" spacing={5} mt={2}>
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
