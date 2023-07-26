import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import MainFooter from "./MainFooter";
import MainPage from "../pages/MainPage";

function MainLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <MainPage />

      <Outlet />

      <Box sx={{ flexGrow: 1 }} />

      <MainFooter />
    </Stack>
  );
}

export default MainLayout;
