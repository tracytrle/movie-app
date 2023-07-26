import * as React from "react";
import { useState, useEffect, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, IconButton } from "@mui/material";
import { Link } from "@mui/material";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import { Box, Stack } from "@mui/system";
import Skeleton from "@mui/material/Skeleton";
import Chip from "@mui/material/Chip";
import { MergeType } from "@mui/icons-material";

export default function MovieDetail({ id }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState();
  const [items, setItems] = useState([]);

  // const imageUrl = "https://api.themoviedb.org/3/movie/";
  const imageUrl = "https://image.tmdb.org/t/p/w500/";

  useEffect(() => {
    console.log("========> print in MovieDetail item.id: ", id);

    const fetchData = async () => {
      try {
        console.log(`=========>`);
        setLoading(true);
        const res = await apiService.get(`/movie/${id}?api_key=${API_KEY}`);
        // console.log("print MovieDetail from fetch: ", res);
        const fullImageUrl = imageUrl + res.data.poster_path;
        console.log("print MovieDetail image: ", fullImageUrl);
        setMovie({ ...res.data, fullImageUrl });
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

  // initialize a list
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("items"));
    if (storedItems) {
      setItems(storedItems);
    }
  }, []);

  const addFavMovies = (item) => {
    if (!items.some((m) => m.id === item.id)) {
      const newItems = [...items, item];
      setItems(newItems);
      localStorage.setItem("items", JSON.stringify(newItems));
    }
  };

  const removeFavMovies = (item) => {
    const newItems = items.filter((m) => m.id !== item.id);
    setItems(newItems);
    localStorage.setItem("items", JSON.stringify(newItems));
  };

  // update the list
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const detailSkeleton = (
    <Stack spacing={1}>
      <Skeleton variant="text" />
      <Skeleton variant="circular" width={80} height={80} />
      <Skeleton variant="rectangular" width="100%" height={300} />
    </Stack>
  );

  return (
    <>
      {loading ? (
        detailSkeleton
      ) : movie ? (
        <Stack
          minWidth="80%"
          sx={{
            borderRadius: "10px",
            mt: "100px",
            display: "flex",
            justifyContent: "center",
            color: "primary.contrastText",
          }}
        >
          <Stack
            flexWrap="wrap"
            justifyContent="flex-start"
            flexDirection="row"
          >
            <Card sx={{ width: "350px" }}>
              <CardMedia
                width="100%"
                height="100%"
                component="img"
                image={movie.fullImageUrl}
                alt=""
              />
            </Card>
            <Stack ml={4}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                fontWeight="bold"
                mt={2}
              >
                {`${movie.original_title}`}
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                fontWeight="bold"
                color="#f9ca24"
              >
                {`${Math.floor(movie.vote_average)}`}/10 IMDb
              </Typography>
              <Stack
                mt="10px"
                maxWidth="200px"
                display="flex"
                alignContent="center"
                justifyContent="space-between"
                flexDirection="row"
              >
                <Typography
                  display="block"
                  textAlign="center"
                  component="div"
                  fontSize="0.8rem"
                  color="forth"
                >
                  <Button
                    onClick={() => {
                      removeFavMovies(movie);
                    }}
                    style={{
                      border: "1px solid black",
                      width: "50px",
                      height: "40px",
                      backgroundColor: "#57606f",
                    }}
                  >
                    <svg
                      class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                      focusable="false"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      data-testid="AddIcon"
                      id="icon_add"
                      width="25px"
                      height="20px"
                    >
                      <path d="M19 13h-10v-2h10v2z"></path>
                    </svg>
                  </Button>
                  <p sx={{ fontSize: "8px" }}>-MyList</p>
                </Typography>
                <Typography
                  display="block"
                  textAlign="center"
                  component="div"
                  fontSize="0.8rem"
                  color="forth"
                >
                  <Button
                    onClick={() => {
                      addFavMovies(movie);
                    }}
                    style={{
                      border: "1px solid black",
                      width: "50px",
                      height: "40px",
                      backgroundColor: "#57606f",
                    }}
                  >
                    <svg
                      class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                      focusable="false"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      data-testid="AddIcon"
                      id="icon_add"
                      width="25px"
                      height="20px"
                    >
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                    </svg>
                  </Button>
                  <p sx={{ fontSize: "8px" }}>+MyList</p>
                </Typography>

                <Typography
                  display="block"
                  textAlign="center"
                  component="div"
                  fontSize="0.8rem"
                >
                  <Button
                    style={{
                      border: "1px solid black",
                      width: "50px",
                      height: "40px",
                      backgroundColor: "#57606f",
                    }}
                  >
                    <svg
                      class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                      focusable="false"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      data-testid="NotificationsNoneIcon"
                      id="bell-icon"
                      width="25px"
                      height="20px"
                    >
                      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"></path>
                    </svg>
                  </Button>

                  <p sx={{ fontSize: "8px" }}>Remind Me</p>
                </Typography>
                <Typography
                  display="block"
                  textAlign="center"
                  fontSize="0.8rem"
                  component="div"
                >
                  <Button
                    style={{
                      border: "1px solid black",
                      width: "50px",
                      height: "40px",
                      backgroundColor: "#57606f",
                    }}
                  >
                    <svg
                      class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                      focusable="false"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      data-testid="FavoriteIcon"
                      id="icon_heart"
                      width="25px"
                      height="20px"
                    >
                      <path d="m12 21.35-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                    </svg>
                  </Button>
                  <p>Like</p>
                </Typography>
              </Stack>
              <Typography
                mr={1}
                variant="caption"
                sx={{
                  fontSize: "14px",
                }}
              >
                <p>Genres:</p>

                {movie.genres.map((item) => (
                  <Chip
                    key={`${item.id}`}
                    label={`${item.name}`}
                    size="small"
                    variant="outlined"
                    style={{ color: "#f5f6fa" }}
                  />
                ))}
              </Typography>
              <Typography mr={1} variant="caption" sx={{ fontSize: "14px" }}>
                <p sx={{ fontSize: "2rem" }}>Spoken languages:</p>
                {movie.spoken_languages.map((item) =>
                  item.name ? (
                    <Chip
                      key={`${item.id}`}
                      label={`${item.name}`}
                      size="small"
                      variant="outlined"
                      style={{ color: "#f5f6fa" }}
                    />
                  ) : (
                    <p></p>
                  )
                )}
              </Typography>
              <Typography
                mt={1}
                mr={1}
                variant="caption"
                sx={{ fontSize: "14px" }}
              >
                <p>Posted: {movie.release_date}</p>
              </Typography>
              <Stack
                mt="8px"
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                flexDirection="row"
              >
                <CardActions>
                  <Button
                    sx={{ backgroundColor: "#e74c3c" }}
                    size="small"
                    color="primary"
                  >
                    <svg
                      class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                      focusable="false"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      data-testid="PlayArrowIcon"
                      id="icon_play"
                      width="30px"
                      height="30px"
                    >
                      <path d="M8 5v14l11-7z"></path>
                    </svg>
                    Watch Trailer
                  </Button>
                </CardActions>
                <CardActions>
                  <Button
                    sx={{ backgroundColor: "#e74c3c" }}
                    size="small"
                    color="primary"
                  >
                    <svg
                      class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                      focusable="false"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      data-testid="ShareIcon"
                      id="icon_share"
                      width="30px"
                      height="30px"
                    >
                      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"></path>
                    </svg>
                    Share
                  </Button>
                </CardActions>
              </Stack>
            </Stack>
          </Stack>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Overview
            </Typography>
            <Typography variant="body2" color="text.forth">
              {`${movie.overview}`}
            </Typography>
          </CardContent>
        </Stack>
      ) : (
        <Typography variant="h4" m={5}>
          Movie not found!
        </Typography>
      )}
    </>
  );
}
