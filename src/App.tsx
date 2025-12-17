"use client";

import { Route, Routes, useLocation } from "react-router-dom";
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import Page404 from "./pages/Page404";
import Header from "./components/sections/Header";
import Footer from "./components/sections/Footer";
import ProjectDetails from "./projects/ProjectDetails";
import { AppDock } from "./components/GlobalDock";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Preloader from "./components/Preloader";
import useAnalytics from "./hooks/useAnalytics";

// Page transition
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const App = () => {
  const location = useLocation();
  const [showPreloader, setShowPreloader] = useState(true);

  useAnalytics(); // ✅ Tracks SPA page views

  // Show preloader only on first refresh
  useEffect(() => {
    // const visited = sessionStorage.getItem("site-loaded");

    // if (visited) {
    //   setShowPreloader(false);
    //   return;
    // }

    sessionStorage.setItem("site-loaded", "true");

    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 3200); // Same duration as preloader

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* PRELOADER */}
      {showPreloader && <Preloader />}

      {/* MAIN SITE */}
      {!showPreloader && (
        <>
          <Header />

          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="min-h-screen"
            >
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetails />} />
                <Route path="/404" element={<Page404 />} />
                <Route path="*" element={<Page404 />} />
              </Routes>
            </motion.div>
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
