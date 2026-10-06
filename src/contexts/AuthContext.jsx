import { createContext, useContext, useEffect, useState } from "react";

import {
  logout as logoutService,
  login as loginService,
  buscarUsuarioAtual,
} from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [deslogando, setDeslogando] = useState(false);

  useEffect(() => {
    async function verificarSessao() {
      try {
        const usuarioAtual = await buscarUsuarioAtual();

        setUsuario(usuarioAtual);
      } catch {
        setUsuario(null);
      } finally {
        setCarregando(false);
      }
    }

    verificarSessao();
  }, []);

  async function login(email, senha) {
    const resultado = await loginService(email, senha);

    setUsuario(resultado.usuario);

    return resultado;
  }

  async function logout() {
    setDeslogando(true);

    await logoutService();

    setUsuario(null);
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        carregando,
        deslogando,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
