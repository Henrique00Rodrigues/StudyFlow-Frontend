import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Materia from "./pages/Materia";
import Flashcards from "./pages/Flashcards";
import TarefasGlobais from "./pages/Tarefas/TarefasGlobais";
import TarefasMateria from "./pages/Tarefas/TarefasMateria";
import Login from "./pages/LogIn";
import SignUp from "./pages/SignUp";

import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: "/materias/:materiaId",
        element: <Materia />,
      },
      {
        path: "/materias/:materiaId/flashcards",
        element: <Flashcards />,
      },
      {
        path: "/tarefas",
        element: <TarefasGlobais />,
      },
      {
        path: "/materias/:materiaId/tarefas",
        element: <TarefasMateria />,
      },
    ],
  },
]);

export default router;
