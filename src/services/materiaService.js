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

export async function criarMateria(nome) {
  const response = await fetch(`${API_URL}/materias`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      nome,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensagem || "Erro ao criar matéria.");
  }

  return data.materia;
}
