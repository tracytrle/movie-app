import React, { useState } from "react";
import AuthContext from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // call this function when you want to authenticate the user
  const login = (newUser, callback) => {
    setUser(newUser);
    callback();
  };

  // call this function to sign out logged in user
  const logout = (callback) => {
    setUser(null);
    callback();
  };

  let value = { user, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
