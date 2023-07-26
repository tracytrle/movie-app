import Carousel from "better-react-carousel";
import MovieCard from "./MovieCard";
import Grid from "@mui/system/Unstable_Grid/Grid";
import { useMediaQuery } from "@mui/material";

const CarouselTrending = ({ moviesList }) => {
  const isSmallScreen = useMediaQuery("(max-width: 325px)");

  return (
    <div>
      <Grid container direction="row" spacing={0.5} mt={2}>
        <Carousel cols={isSmallScreen ? 2 : 4} rows={1} gap={0} loop>
          {/* <Carousel value={value} onChange={onChange}> */}
          {moviesList.map((item) => (
            <Carousel.Item>
              <Grid key={item.id}>
                <MovieCard item={item} />
              </Grid>
            </Carousel.Item>
          ))}
        </Carousel>
      </Grid>
    </div>
  );
};

export default CarouselTrending;
