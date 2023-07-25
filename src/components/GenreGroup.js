import React, { useEffect, useState } from "react";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import Grid from "@mui/material/Grid";
import TrendingGroup from "../components/TrendingGroup";

import ShowMovies from "./ShowMovies";

function GenreGroup({ genreId }) {
  const [loading, setLoading] = useState();
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let url = `discover/movie?api_key=${API_KEY}&language=en-US&append_to_response=videos`;
      try {
        setLoading(true);
        const res = await apiService.get(`${url}&with_genres=${genreId}`);
        const result = res.data.results;
        // console.log("ShowMovies print result: ", result);
        setGenreList(result.slice(0, 12));
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [genreList]);

  return (
    <>
      <Grid
        container
        bgcolor="#0F0E0F"
        direction="column"
        justifyContent={{ md: "center", xs: "flex-end" }}
        sx={{
          minHeight: "100vh",
        }}
      >
        <Grid item direction="column" container>
          <ShowMovies moviesList={genreList} />
        </Grid>
      </Grid>
    </>
  );
}

export default GenreGroup;
