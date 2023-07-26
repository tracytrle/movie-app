import * as React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import { API_KEY } from "../api/config";
import apiService from "../api/apiService";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";

import Container from "@mui/material/Container";
import Header from "../layouts/Header";

import { useParams } from "react-router";
import { Typography } from "@mui/material";
import MainFooter from "../layouts/MainFooter";
import ShowMovies from "../components/ShowMovies";
import PaginationController from "../components/PaginationController";

function ElevationScroll(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function ElevateAppBar(props) {
  const { genreId } = useParams();
  const [loading, setLoading] = useState();
  const [genreList, setGenreList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  function changePage(newPage) {
    setPage(newPage);
  }

  useEffect(() => {
    // console.log("print in GenreGroup id: ", genreId);
    // console.log("print in Genre page: ", page);
  }, [genreId, page]);

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
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar sx={{ alignItems: { xl: "center", md: "center" } }}>
          <Header />
        </AppBar>
      </ElevationScroll>
      <Container sx={{ backgroundColor: "primary.light", paddingTop: 4 }}>
        {genreList.length > 0 ? (
          <>
            <ShowMovies moviesList={genreList} />
            <PaginationController
              PageCount={totalPages}
              changePage={changePage}
            />
          </>
        ) : (
          <Typography>MOVIE NOT FOUND</Typography>
        )}

        <MainFooter />
      </Container>
    </React.Fragment>
  );
}
