import * as React from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationController({ PageCount, changePage }) {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    changePage(value);
  };

  return (
    <Stack
      spacing={2}
      sx={{
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "30px",
      }}
    >
      <Typography>
        <Pagination
          sx={{
            "& .MuiPaginationItem-root": {
              color: "white",
            },
            "& .MuiPaginationItem-root:hover": {
              backgroundColor: "#df4747",
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "#df4747",
            },
          }}
          count={PageCount}
          page={page}
          onChange={handleChange}
        />
      </Typography>
    </Stack>
  );
}
