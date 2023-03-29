import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./layout/Layout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import HowTo from "./pages/HowTo";
import Wichtig from "./pages/Wichtig";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="howto" element={<HowTo />} />
          <Route path="wichtig" element={<Wichtig />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>
);
