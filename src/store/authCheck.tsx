import React from "react";
import { userAuthStore } from "./authStore";
import SkeletonComponent from "../component/Skeleton";
import { useNavigate } from "react-router-dom";

const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const { isActive, isCheckingActive } = userAuthStore();

  const navigate = useNavigate();

  if (isCheckingActive) {
    return <SkeletonComponent />;
  } else if (!isActive && !isCheckingActive) {
    navigate("/login");
    return;
  } else {
    return children;
  }
};

export default AuthCheck;
