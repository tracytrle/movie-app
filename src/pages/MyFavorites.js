import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";

import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";

import Container from "@mui/material/Container";
import Header from "../layouts/Header";
import { useSearchParams } from "react-router-dom";
import ShowMovies from "../components/ShowMovies";
import { useLocation } from "react-router-dom";
import MainFooter from "../layouts/MainFooter";
import PaginationController from "../components/PaginationController";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

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

export default function MyFavorites(props) {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState();
  const [searchList, setSearchList] = useState([]);

  let myFavList = JSON.parse(localStorage.getItem("items"));

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar sx={{ alignItems: { xl: "center", md: "center" } }}>
          <Header />
        </AppBar>
      </ElevationScroll>
      <Container sx={{ backgroundColor: "primary.light" }}>
        <Typography sx={{ color: "white", paddingTop: 15 }}>
          MY FAVORITE MOVIES
        </Typography>
        <ShowMovies moviesList={myFavList} />

        <MainFooter />
      </Container>
    </React.Fragment>
  );
}
