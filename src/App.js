import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Link } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.coderschool.vn">
        CoderSchool
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function App() {
  return (
    <>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          My new React app
        </Typography>
        <Copyright />
      </Box>
    </>
  );
}

export default App;
