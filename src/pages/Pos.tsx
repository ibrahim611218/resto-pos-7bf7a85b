
import React from "react";
import { Navigate } from "react-router-dom";

const Pos = () => {
  // Since POS is removed, redirect to home
  return <Navigate to="/" replace />;
};

export default Pos;
