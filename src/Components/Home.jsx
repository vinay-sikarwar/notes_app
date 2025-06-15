import React from "react";
import { useAuth } from "../db/AuthContext";

import Navbar from "./Navbar";
import Hero from "../Components/Home/Hero";
import ChooseUs from "../Components/Home/ChooseUs";
import Rest from "./Rest";
import Footer from "./Footer";
import FAQList from "./Home/FAQList";
import HomePostLogIn from "./HomePostLogIn";

function Home() {
  const { user, loggedIn, loading } = useAuth();

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <>
      <Navbar />
      {loggedIn ? (
        <HomePostLogIn user={user} />
      ) : (
        <>
          <Hero />
          <Rest />
          <ChooseUs />
          <FAQList />
        </>
      )}
      <Footer />
    </>
  );
}

export default Home;
