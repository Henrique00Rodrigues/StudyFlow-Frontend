const API_URL = "http://localhost:3000/api";

export async function listarFlashcardsMateria(materiaId) {
  const response = await fetch(`${API_URL}/flashcards/materia/${materiaId}`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensagem || "Erro ao buscar flashcards.");
  }

  return data.flashcards;
}

export async function criarFlashcard(frente, verso, materiaId) {
  const response = await fetch(`${API_URL}/flashcards`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",

    body: JSON.stringify({
      frente,
      verso,
      materiaId,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensagem || "Erro ao criar flashcard.");
  }

  return data.flashcard;
}
