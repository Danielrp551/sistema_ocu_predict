import React from "react";
import { useLocation } from "react-router-dom";

const RemountWrapper = ({ children }) => {
  const location = useLocation();
  return <div key={location.pathname}>{children}</div>;
};

export default RemountWrapper;
