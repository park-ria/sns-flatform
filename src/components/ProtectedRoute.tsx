import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase"; // 로그인 개인정보를 갖고있음

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = auth.currentUser;
  //console.log(user);
  if (user === null) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default ProtectedRoute;
