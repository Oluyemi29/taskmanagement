import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import { userAuthStore } from "./store/authStore";
import AuthCheck from "./store/authCheck";

function App() {
  const { CheckActive, isActive, isCheckingActive } = userAuthStore();
  useEffect(() => {
    CheckActive();
  }, [CheckActive]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          !isCheckingActive && isActive ? (
            <Navigate to={"/user"} />
          ) : (
            <Register />
          )
        }
      />
      <Route
        path="/login"
        element={
          !isCheckingActive && isActive ? <Navigate to={"/user"} /> : <Login />
        }
      />
      <Route
        path="/user"
        element={
          <AuthCheck>
            <Dashboard />
          </AuthCheck>
        }
      />
    </Routes>
  );
}

export default App;
