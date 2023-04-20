import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import Layout from "./layout/Layout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import HowTo from "./pages/HowTo";
import Wichtig from "./pages/Wichtig";
import Account from "./pages/Account";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <CookiesProvider>
        <Layout>
          <Routes>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="howto" element={<HowTo />} />
            <Route path="wichtig" element={<Wichtig />} />
            <Route path="account" element={<Account />} />
            <Route path="account/:name" element={<Account />} />
          </Routes>
        </Layout>
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
