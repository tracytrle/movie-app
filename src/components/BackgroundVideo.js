import React from "react";
import myVideo from "./trailer3.mp4";
import { Stack } from "@mui/system";

import { Typography } from "@mui/material";
import "../style.css";

export default function BackgroundVideo() {
  return (
    <Stack
      sx={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "100%",
      }}
    >
      <video
        autoPlay
        loop
        muted
        id="myVideo"
        sx={{
          position: "absolute",
          width: "40%",
          height: "100%",
          objectFit: "cover",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        <source src={myVideo} type="video/mp4" />
      </video>
      <Typography
        sx={{
          color: "black",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <h3 className="flash" sx={{ fontSize: { xs: "1rem", md: "2rem" } }}>
          *SEE WHAT'S NEXT*
        </h3>
      </Typography>
    </Stack>
  );
}
