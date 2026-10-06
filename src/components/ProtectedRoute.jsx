import { Navigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { usuario, carregando } = useAuth();

  if (carregando) {
    return <p>Carregando...</p>;
  }

  if (!usuario) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          mensagem: "Você precisa estar autenticado para acessar esta página.",
        }}
      />
    );
  }

  return children;
}
