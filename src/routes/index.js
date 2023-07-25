import * as React from "react";
import { useContext } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import LoginModal from "../form/LoginModal";
import MainLayout from "../layouts/MainLayout";
import MainHeader from "../pages/MainHeader";
import AuthProvider from "../AuthComponents/AuthProvider";
import GenreGroupPage from "../pages/GenreGroupPage";
import SearchPage from "../pages/SearchPage";
// import AuthContext from "../AuthComponents/AuthContext";

// import MovieDetailPage from "../pages/MovieDetailPage";
import MovieDetailPage from "../pages/MovieDetailPage";

function Router() {
  let location = useLocation();
  let state = location.state;
  // if (!auth.user) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }
  return (
    <Routes location={state?.backgroundLocation || location}>
      <Route path="/" element={<MainHeader />}></Route>

      {/* <Route index element={<MainLayout />} /> */}
      <Route path="/login" element={<LoginModal />}></Route>

      <Route path="/movie/:movieId" element={<MovieDetailPage />} />

      <Route path="/genre/:genreId" element={<GenreGroupPage />} />

      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default Router;
