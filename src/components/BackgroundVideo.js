import React, { useEffect, useState } from "react";
import { Stack } from "@mui/system";
import YouTube from "react-youtube";

import { Typography } from "@mui/material";
import "../style.css";

export default function BackgroundVideo() {
  const videoId = "iuk77TjvfmE";

  const [width, setWidth] = useState("1200");
  const [height, setHeight] = useState("350");
  function handleReady(event) {
    event.target.pauseVideo();
  }

  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;
      if (screenWidth < 600) {
        setWidth("345");
        setHeight("325");
      } else {
        setWidth("1200");
        setHeight("350");
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const opts = {
    playerVars: { autoplay: 1 },
    width,
    height,
  };

  return (
    <Stack
      sx={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "100%",
        marginTop: 10,
        marginLeft: 1,
      }}
    >
      <div
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          paddingBottom: "56.25%",
        }}
      >
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={handleReady}
          containerClassName="youtube-player"
          className="youtube-player"
        />
      </div>
      <Typography
        sx={{
          color: "white",
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
