import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import ClipMe from "@/pages/clip-me";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<ClipMe />} path="/clip-me" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<AboutPage />} path="/about" />
    </Routes>
  );
}

export default App;
