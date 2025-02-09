import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import Home from "./pages/Home.jsx";
import Add from "./pages/Add.jsx";
import Update from "./pages/Update.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/add-todo",
        element: (
          <ProtectedRoutes>
            <Add />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/update-todo/:id",
        element: (
          <ProtectedRoutes>
            <Update/>
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
