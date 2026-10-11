import { Navigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { usuario, carregando, motivoSaida } = useAuth();

  if (carregando) {
    return <p>Carregando...</p>;
  }

  if (!usuario) {
    if (motivoSaida === "logout") {
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

    if (motivoSaida === "exclusao") {
      return (
        <Navigate
          to="/login"
          replace
          state={{
            mensagem: "Sua conta foi excluída com sucesso!",
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
