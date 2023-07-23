import React, { useEffect, useState } from "react";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import Grid from "@mui/material/Grid";
import TrendingGroup from "../components/TrendingGroup";

function HomePage() {
  const [loading, setLoading] = useState();
  const [trendingList, setTrendingList] = useState([]);
  const [cutInitial, setcutInitial] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiService.get(
          `/trending/all/day?api_key=${API_KEY}`
        );
        const result = res.data.results;
        setTrendingList(result);
        setcutInitial([...result].splice(16, 4));
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
        justifyContent={{ md: "center", xs: "flex-end" }}
        sx={{
          minHeight: "100vh",
        }}
      >
        <Grid item direction="column" container>
          <TrendingGroup
            trendingList={trendingList}
            cutInitial={cutInitial}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default HomePage;
