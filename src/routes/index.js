import * as React from "react";
import { Routes, Route } from "react-router-dom";

import LoginModal from "../form/LoginModal";
import MainLayout from "../layouts/MainLayout";
import MainHeader from "../pages/MainHeader";
import AuthProvider from "../AuthComponents/AuthProvider";

function Router() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MainHeader />}></Route>
        <Route index element={<MainLayout />} />
        <Route path="/login" element={<LoginModal />}></Route>
      </Routes>
    </AuthProvider>
  );
}

export default Router;
