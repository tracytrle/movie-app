import * as React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import MainHeader from "../pages/MainHeader";
import GenreGroupPage from "../pages/GenreGroupPage";
import SearchPage from "../pages/SearchPage";

import MovieDetailPage from "../pages/MovieDetailPage";
import LoginModal from "../form/LoginModal";
import MyFavorites from "../pages/MyFavorites";

function Router() {
  let location = useLocation();
  let state = location.state;

  return (
    <Routes location={state?.backgroundLocation || location}>
      <Route path="/" element={<MainHeader />}></Route>
      <Route path="/login" element={<LoginModal />}></Route>

      <Route path="/movie/:movieId" element={<MovieDetailPage />} />

      <Route path="/genre/:genreId" element={<GenreGroupPage />} />

      <Route path="/search" element={<SearchPage />} />
      <Route path="/myfavorite" element={<MyFavorites />} />
    </Routes>
  );
}

export default Router;
