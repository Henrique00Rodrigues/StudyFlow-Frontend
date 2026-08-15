import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Materia from "./pages/Materia";
import Flashcards from "./pages/Flashcards";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: "/materias/:id",
        element: <Materia />,
      },
      {
        path: "/materias/:id/flashcards/:id",
        element: <Flashcards />,
      },
    ],
  },
]);

export default router;
