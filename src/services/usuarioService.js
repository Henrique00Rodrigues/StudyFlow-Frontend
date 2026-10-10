const API_URL = "http://localhost:3000/api";

export async function buscarDadosUsuario() {
  const response = await fetch(`${API_URL}/usuarios/me`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensagem || "Erro ao buscar dados do usuário.");
  }

  return data.usuario;
}

export async function atualizarUsuario(apelido) {
  const response = await fetch(`${API_URL}/usuarios/me`, {
    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",

    body: JSON.stringify({
      apelido,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensagem || "Erro ao atualizar perfil.");
  }

  return data.usuario;
}
