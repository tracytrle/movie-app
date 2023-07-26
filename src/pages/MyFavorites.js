import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Container from "@mui/material/Container";
import Header from "../layouts/Header";
import ShowMovies from "../components/ShowMovies";
import MainFooter from "../layouts/MainFooter";
import { Typography } from "@mui/material";

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

export default function MyFavorites(props) {
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
