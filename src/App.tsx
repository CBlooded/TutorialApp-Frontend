import "./App.css";

import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./pages/dashboard";
import Chat from "./pages/chatPage";

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
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="chat" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
