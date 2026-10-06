const API_URL = "http://localhost:3000/api";

export async function listarMaterias() {
  const response = await fetch(`${API_URL}/materias`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensagem || "Erro ao buscar matérias.");
  }

  return data.materias;
}

export async function buscarMateriaPorId(id) {
  const response = await fetch(`${API_URL}/materias/${id}`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensagem || "Erro ao buscar matéria.");
  }

  return data.materia;
}
