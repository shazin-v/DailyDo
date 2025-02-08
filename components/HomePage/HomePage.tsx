"use client";
import React, { useEffect, useState } from "react";
import GetStarted from "./GetStarted";
import Homes from "./Home";

const HomePage: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser);
  }, []);

  return <div>{user ? <Homes /> : <GetStarted />}</div>;
};

export default HomePage;
