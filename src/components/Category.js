import * as React from "react";
import { useState, useEffect, useContext } from "react";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router";
import AuthContext from "../AuthComponents/AuthContext";

export default function Category() {
  const [genresList, setGenresList] = useState([]);
  const [loading, setLoading] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  // const menuItemRef = useRef();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (genreId) => {
    setAnchorEl(null);
    // const genreId = menuItemRef.current.id;
    console.log("print category Onclick genreId: ", genreId);
    navigate(`/genre/${genreId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiService.get(
          `genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        setGenresList(res.data.genres);
        console.log("print Category from fetch: ", res.data.genres);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {genresList ? (
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MenuIcon sx={{ color: "white" }} />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {genresList.map((genre) => (
              <MenuItem
                key={genre.id}
                id={genre.id}
                onClick={() => {
                  handleClose(genre.id);
                }}
              >
                {genre.name}
              </MenuItem>
            ))}
          </Menu>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
