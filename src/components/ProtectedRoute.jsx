import { Navigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { usuario, carregando, deslogando } = useAuth();

  if (carregando) {
    return <p>Carregando...</p>;
  }

  if (!usuario) {
    if (deslogando) {
      return (
        <Navigate
          to="/login"
          replace
          state={{
            mensagem: "Você foi deslogado com sucesso!",
            tipo: "sucesso",
          }}
        />
      );
    }

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
