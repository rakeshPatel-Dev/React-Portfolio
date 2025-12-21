"use client";

import { Route, Routes, useLocation } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import ProjectDetails from "./projects/ProjectDetails";
import Page404 from "./pages/Page404";

import Header from "./components/sections/Header";
import Footer from "./components/sections/Footer";
import { AppDock } from "./components/GlobalDock";
import Preloader from "./components/Preloader";
import useAnalytics from "./hooks/useAnalytics";

const App = () => {
  const location = useLocation();
  const [showPreloader, setShowPreloader] = useState(true);

  useAnalytics(); // SPA tracking

  useEffect(() => {
    sessionStorage.setItem("site-loaded", "true");

    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showPreloader && <Preloader />}

      {!showPreloader && (
        <>
          <Header />

          <AnimatePresence mode="wait" >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
              <Route path="/404" element={<Page404 />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </AnimatePresence>

          <AppDock />
          <Footer />
        </>
      )}

      <Analytics />
      <SpeedInsights />
    </>
  );
};

export default App;
