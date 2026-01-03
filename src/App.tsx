"use client";

import { Route, Routes, useLocation } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import ProjectDetails from "./projects/ProjectDetails";
import Page404 from "./pages/Page404";

// import Header from "./components/sections/Header";
import Footer from "./components/sections/Footer";
import { AppDock } from "./components/GlobalDock";
import useAnalytics from "./hooks/useAnalytics";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  const location = useLocation();

  useAnalytics(); // SPA tracking

  return (
    <>
      <ScrollToTop />
      <Toaster />
      {/* <Header /> */}

      <AnimatePresence mode="wait">
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

      <Analytics />
      <SpeedInsights />
    </>
  );
};

export default App;
