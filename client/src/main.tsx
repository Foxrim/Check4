import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App";
import AuthPlayers from "./components/AuthPlayers";
import { SlimeProvider } from "./contexts/SlimeContext";
import { AuthProvider } from "./contexts/authContext";
import GamePage from "./pages/GamePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "",
        element: <AuthPlayers />,
        children: [
          {
            path: "game",
            element: <GamePage />,
          },
        ],
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <SlimeProvider>
        <RouterProvider router={router} />
      </SlimeProvider>
    </AuthProvider>
  </StrictMode>,
);
