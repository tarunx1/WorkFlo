import React, { useContext } from "react";
import Login from "../src/app/components/Auth/Login";
import "../src/app/globals.css";
import { useRouter } from "next/router";
import { AuthContext } from "../src/app/context/AuthContext";

const LoginPage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  if (isLoggedIn) {
    router.push("/");
    return null;
  }

  return <Login />;
};

export default LoginPage;
