import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";

import ThemeProvider from "./contexts/ThemeProvider";
import AuthProvider from "./AuthComponents/AuthProvider";
import "./style.css";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
