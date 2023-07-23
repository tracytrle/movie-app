import * as React from "react";
import { Routes, Route } from "react-router-dom";

import LoginModal from "../form/LoginModal";
import MainLayout from "../layouts/MainLayout";
import MainHeader from "../pages/MainHeader";
import AuthProvider from "../AuthComponents/AuthProvider";

// import MovieDetailPage from "../pages/MovieDetailPage";
import MovieDetailPage from "../pages/MovieDetailPage";

function Router() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MainHeader />}></Route>
        <Route index element={<MainLayout />} />
        <Route path="/login" element={<LoginModal />}></Route>
        <Route path="/movie/:movieId" element={<MovieDetailPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default Router;
