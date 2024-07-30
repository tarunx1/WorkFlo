import React, { useContext, useEffect } from "react";
import { AuthContext } from "../src/app/context/AuthContext";
import TaskBoard from "../src/app/components/TaskBoard/TaskBoard";
import Header from "@/app/components/Header";
import { useRouter } from "next/router";
import Sidebar from "@/app/components/Sidebar";

const Home = () => {
  const router = useRouter();
  const { user, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return (
      <div className="flex justify-center items-center h-screen">
        Please log in to see your tasks.
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <Sidebar className="h-full w-1/3 hidden lg:block" />
      <div className="flex flex-col w-full h-full overflow-hidden">
        <Header className="w-full" />
        <TaskBoard className="flex-grow overflow-auto" />
      </div>
    </div>
  );
};

export default Home;
