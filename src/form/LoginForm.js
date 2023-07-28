import React, { useState, useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import AuthContext from "../AuthComponents/AuthContext";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  bgcolor: "#757C86",
  display: "flex",
  flexDirection: "column",
  width: "300px",
  border: "1px solid",
  padding: "5px",
  borderRadius: "10px",
  flexWrap: "wrap",

  "@media (max-width: 375px)": {
    width: 240,
  },
};

function LoginForm({ callback }) {
  const [username, setUsername] = useState("tructran");
  const [password, setPassword] = useState("123");

  const auth = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const handleUsernameChange = (event) => {
    // event.preventDefault();
    setUsername(event.target.value);
  };

  useEffect(() => {
    console.log("username: ", username);
    console.log("auth.user: ", auth?.user);
  });

  const handleLogin = () => {
    auth.login(username, callback);
  };

  return (
    <Box sx={style} gap={4}>
      <Typography
        sx={{ display: "flex", justifyContent: "center ", fontWeight: "bold" }}
        variant="h4"
        component="div"
      >
        Login
      </Typography>
      <TextField
        label="Username"
        defaultValue={username}
        sx={{ m: 1 }}
        onChange={handleUsernameChange}
      />
      <FormControl sx={{ m: 1 }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          defaultValue={password}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <Button
        sx={{
          backgroundColor: "#e74c3c",
          color: "white",
          size: "large",
          m: 1,
          width: "10ch",
          margin: "auto",
        }}
        type="submit"
        onClick={handleLogin}
        // variant="contained"
      >
        Login
      </Button>
    </Box>
  );
}

export default LoginForm;
