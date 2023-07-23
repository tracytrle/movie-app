import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import MovieCard from "./MovieCard";
import Typography from "@mui/material/Typography";
import PaginationItem from "@mui/material/PaginationItem";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import MovieDetail from "./MovieDetail";
import { yellow } from "@mui/material/colors";
import { CopyAllSharp } from "@mui/icons-material";

function TrendingGroup({ trendingList, cutInitial, loadingTrending }) {
  const [cutList, setCutList] = useState();
  const [copiedList, setcopiedList] = useState([]);

  // function handleList() {
  //   let y;
  //   if (copiedList.length === 0) {
  //     setcopiedList([...trendingList]);
  //     y = [...trendingList].slice(0, 4);
  //     copiedList.splice(0, 4);
  //   } else if (copiedList.length === 4) {
  //     setcopiedList([...trendingList]);
  //     y = copiedList.splice(0, 4);
  //   } else {
  //     y = copiedList.splice(4, 4);
  //   }
  //   return y;
  // }

  useEffect(() => {
    let y = [...trendingList].slice(0, 4);
    setcopiedList([...y]);
    // console.log("print copiedList length: ", copiedList.length);
    setCutList(y);
    // console.log("print cutList length: ", cutList.length);
  }, []);

  const placeholder = [0, 1, 2, 3];
  const detailSkeleton = (
    <Stack spacing={1}>
      <Skeleton variant="text" />
      <Skeleton variant="rectangular" width="100%" height={300} />
    </Stack>
  );

  return (
    <>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        color="white"
      >
        <Typography variant="h5" my={3} color="white">
          TRENDING
        </Typography>
        {/* <PaginationItem onClick={() => setCutList(handleList())} type="next" /> */}
      </Stack>
      <Divider />
      <Grid container direction="row" spacing={5} mt={2}>
        {loadingTrending
          ? copiedList.map((item) => (
              <Grid key={item.id} item xs={6} sm={4} md={3}>
                {detailSkeleton}
              </Grid>
            ))
          : cutList
          ? copiedList.map((item) => (
              <Grid key={item.id} item xs={6} sm={4} md={3}>
                <MovieCard item={item} />
                {/* <MovieDetail item={item} /> */}
              </Grid>
            ))
          : cutInitial?.map((item) => (
              <Grid key={item.id} item xs={6} sm={4} md={3}>
                <MovieCard item={item} />
                {/* <MovieDetail item={item} /> */}
              </Grid>
            ))}
      </Grid>
    </>
  );
}

export default TrendingGroup;
