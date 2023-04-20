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
import LikedPosts from "./pages/LikedPosts";
import Post from "./pages/Post";

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
            <Route path="account/me" element={<Account />} />
            <Route path="account/name/:name" element={<Account />} />
            <Route path="account/me/liked-posts" element={<LikedPosts />} />
            <Route path="post/:postId" element={<Post />} />
          </Routes>
        </Layout>
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
