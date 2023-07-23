import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import MainFooter from "../layouts/MainFooter";
import MainHeader from "../pages/MainHeader";
import MovieDetail from "../components/MovieDetail";

export default function MovieDetailPage({ item }) {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <MainHeader />

      <MovieDetail item={item} />

      <MainFooter />
    </Stack>
  );
}
