import React, { useEffect, useState } from "react";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import Grid from "@mui/material/Grid";

import ShowMovies from "./ShowMovies";

function GenreGroup({ genreId }) {
  const [loading, setLoading] = useState();
  const [genreList, setGenreList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  function changePage(newPage) {
    setPage(newPage);
  }

  useEffect(() => {
    const fetchData = async () => {
      let url = `discover/movie?api_key=${API_KEY}&language=en-US&append_to_response=videos`;
      try {
        setLoading(true);
        const res = await apiService.get(`${url}&with_genres=${genreId}`);
        const result = res.data.results;
        let size = result.length;

        setTotalPages(Math.ceil(size / 12));
        let start = (page - 1) * 12;
        let end = start + 12;
        setGenreList(result.slice(start, end));
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [genreList, page, totalPages]);

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
