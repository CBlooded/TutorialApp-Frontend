import "./App.css";

import Login from "./components/login";
import Layout from "./components/Layout";
import Register from "./components/register";
import { BrowserRouter, Routes, Route } from "react-router";
import { useEffect } from "react";
import setupInterceptors from "./api/SetupInterceptor";

function App() {
  useEffect(() => {
    setupInterceptors();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="app" element={<Layout />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
