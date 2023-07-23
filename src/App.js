import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
// import AuthProvider from "./AuthComponents/AuthContext";
import ThemeProvider from "./contexts/ThemeProvider";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
