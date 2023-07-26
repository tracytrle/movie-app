import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";

import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";

import Container from "@mui/material/Container";
import Header from "../layouts/Header";
import { useParams } from "react-router";
import MovieDetail from "../components/MovieDetail";
import MainFooter from "../layouts/MainFooter";

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
  window: PropTypes.func,
};

export default function ElevateAppBar(props) {
  const { movieId } = useParams();

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar sx={{ alignItems: { xl: "center", md: "center" } }}>
          <Header />
        </AppBar>
      </ElevationScroll>
      <Container
        sx={{
          backgroundColor: "primary.light",
          color: "primary.contrastText",
          paddingTop: 4,
        }}
      >
        <MovieDetail id={movieId} />
        <MainFooter />
      </Container>
    </React.Fragment>
  );
}
