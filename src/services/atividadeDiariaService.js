const API_URL = "http://localhost:3000/api";

export async function listarAtividadesPorMes(ano, mes) {
  const response = await fetch(`${API_URL}/atividades?ano=${ano}&mes=${mes}`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensagem || "Erro ao buscar atividades.");
  }

  return data;
}
