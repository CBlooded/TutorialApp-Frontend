import "./App.css";

import Login from "./components/login";
// import Layout from "./components/Layout";
import Register from "./components/register";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/dashboard";

import { BrowserRouter, Routes, Route } from "react-router";
// import { Children } from "react";

function App() {
  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route path="/">
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
