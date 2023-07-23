import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import MainFooter from "../layouts/MainFooter";
import MainHeader from "../pages/MainHeader";
import MovieDetail from "../components/MovieDetail";
import { useParams } from "react-router";

export default function MovieDetailPage({ item }) {
  const { movieId } = useParams();
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      {/* <MainHeader /> */}

      <MovieDetail id={movieId} />

      <MainFooter />
    </Stack>
  );
}
