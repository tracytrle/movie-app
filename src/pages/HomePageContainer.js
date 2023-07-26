import React, { useEffect, useState } from "react";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import Grid from "@mui/material/Grid";

import CarouselTrending from "../components/CarouselTrending";
import Typography from "@mui/material/Typography";
import BackgroundVideo from "../components/BackgroundVideo";

function HomePage() {
  const [loading, setLoading] = useState();
  const [trendingList, setTrendingList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiService.get(
          `/trending/all/day?api_key=${API_KEY}`
        );
        const result = res.data.results;
        setTrendingList(result.slice(0, 20));

        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Grid
        container
        bgcolor="#0F0E0F"
        direction="column"
        justifyContent={{ md: "center", xs: "center" }}
        sx={{
          // height: "90%",
          minHeight: "100vh",
          paddingTop: 0,
        }}
      >
        <BackgroundVideo />
        <Grid item direction="column" container>
          {!loading ? (
            <>
              <Typography
                style={{
                  color: "white",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  paddingTop: "1rem",
                }}
              >
                TRENDING{" "}
              </Typography>
              <CarouselTrending moviesList={trendingList} />
            </>
          ) : (
            <div></div>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default HomePage;
