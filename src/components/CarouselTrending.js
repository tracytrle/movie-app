import Carousel from "better-react-carousel";

import { useState } from "react";
import MovieCard from "./MovieCard";
import Grid from "@mui/system/Unstable_Grid/Grid";

const CarouselTrending = ({ moviesList }) => {
  const [value, setValue] = useState(0);

  const onChange = (value) => {
    setValue(value);
  };

  return (
    <div>
      <Grid container direction="row" spacing={5} mt={2}>
        <Carousel cols={4} rows={1} gap={10} loop>
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
