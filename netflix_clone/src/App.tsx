import React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Home, NoMatch, Upload, Video } from "pages";

function AppRouter() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="video/:id" element={<Video />} />
      <Route path="upload" element={<Upload />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

export default AppRouter;
