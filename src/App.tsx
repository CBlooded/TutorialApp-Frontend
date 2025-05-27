import "./App.css";

import Login from "./components/login";
import Register from "./components/register";
import Dashboard from "./pages/dashboard";
import Chat from "./pages/chatPage";

import { BrowserRouter, Routes, Route } from "react-router";
import { useEffect } from "react";
import setupInterceptors from "./api/SetupInterceptor";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundRoute from "./components/NotFoundRoute";
import ForgotPassword from "./components/forgotPassword";

function App() {
  useEffect(() => {
    setupInterceptors();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFoundRoute />} />
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="register" element={<Register />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
