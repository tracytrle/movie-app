import * as React from "react";
import { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";

import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { API_KEY } from "../api/config";
import apiService from "../api/apiService";
import Container from "@mui/material/Container";
import Header from "../layouts/Header";
import { useSearchParams } from "react-router-dom";
import ShowMovies from "../components/ShowMovies";
import { useLocation } from "react-router-dom";
import MainFooter from "../layouts/MainFooter";
import PaginationController from "../components/PaginationController";
import { Typography } from "@mui/material";

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
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

export default function SearchPage(props) {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState();
  const [searchList, setSearchList] = useState([]);
  const searchInput = searchParams.get("keyword");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  function changePage(newPage) {
    setPage(newPage);
  }

  useEffect(() => {
    console.log("print in searchPage input: ", searchInput);
    console.log("-------> ", searchParams.get("keyword"));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let base = `search/keyword?`;

      // const origin= `https://api.themoviedb.org/3/search/keyword?query=action&api_key=efafb7eead013aa31662cc51ddcdcbf9`;

      try {
        setLoading(true);
        const fetchData = await apiService.get(
          `${base}query=${searchInput}&api_key=${API_KEY}`
        );
        const keyList = fetchData.data.results;
        console.log("searchList print keyList: ", keyList);
        const collection = [];
        if (keyList) {
          for (const key of keyList) {
            const keyword = key.id;
            // console.log("searchList print keyId: ", keyword);
            const res = await apiService.get(
              `keyword/${keyword}/movies?api_key=${API_KEY}&with_keywords=${keyword}&language=en-US`
            );
            const result = res.data.results;
            // console.log("searchList print result: ", result);
            for (const item of result) {
              collection.push(item);
            }
          }
          let size = collection.length;

          setTotalPages(Math.ceil(size / 12));
          let start = (page - 1) * 12;
          let end = start + 12;
          console.log("searchList print collection: ", collection);
          setSearchList(collection.slice(start, end));
        }
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [searchInput, page, totalPages]);

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar sx={{ alignItems: { xl: "center", md: "center" } }}>
          <Header />
        </AppBar>
      </ElevationScroll>
      <Container sx={{ backgroundColor: "primary.light" }}>
        {searchList.length > 0 ? (
          <>
            <ShowMovies moviesList={searchList} />
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
