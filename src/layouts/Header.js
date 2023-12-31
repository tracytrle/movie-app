import * as React from "react";
import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../components/Logo";
import { useNavigate, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import AuthContext from "../AuthComponents/AuthContext";
import Category from "../components/Category";

const settings = ["Profile", "Account", "Logout"];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Header() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname;

  const [searchValue, setSearchValue] = useState("");
  function handleOnChange(event) {
    let value = event.target.value;
    setSearchValue(value);
  }

  // since styled("div") not "form", we cannot use onSubmit
  const handleKeyDown = (event) => {
    if (auth.user) {
      if (event.key === "Enter") {
        event.preventDefault();
        let value = event.target.value;
        setSearchValue(value);
        navigate(`/search?keyword=${value}`);
      }
    }
  };

  const handleOpen = () => {
    navigate("/login");
  };

  const handleOpenUserMenu = (event) => {
    event.preventDefault();
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    auth.logout(() => {
      navigate(currentPage, { replace: true });
    });
  };
  const handleMyFavList = () => {
    navigate("/myfavorite");
    setAnchorElUser(null);
  };

  return (
    <Toolbar
      sx={{
        width: { xs: "100%", xl: "1200px" },
        display: "flex",
        justifyContent: {
          xs: "center",
          md: "space-between",
          xl: "space-between",
        },
        flexDirection: { xs: "row" },
      }}
      disableGutters
    >
      <Box sx={{ display: { xs: "flex", md: "flex" }, ml: 2, mr: 1 }}>
        <Category />
      </Box>
      <Logo
        sx={{
          mr: 2,
          display: { xs: "flex", md: "flex" },
          width: { xs: "4rem", md: "8rem" },
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mr: 1,
          width: { xs: "250px" },
        }}
      >
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={searchValue}
            onChange={(event) => {
              handleOnChange(event);
            }}
            onKeyDown={handleKeyDown}
          />
        </Search>
        <Box>
          {auth?.user ? (
            <>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 1 }}>
                  <img src="../lock2.png" alt="" width="34px" height="34px" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key="fav" onClick={handleMyFavList}>
                  <Typography textAlign="center">MyFavorites</Typography>
                </MenuItem>
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ ml: 1, right: 0, fontSize: "1rem", gap: "5px" }}
              onClick={handleOpen}
            >
              <img
                src="../arrow-right-3781.svg"
                alt=""
                width="25px"
                height="25px"
              />
            </IconButton>
          )}
        </Box>
      </Box>
    </Toolbar>
  );
}
export default Header;
