const API_URL = "http://localhost:3000/api";

export async function listarTarefas() {
  const response = await fetch(`${API_URL}/tarefas`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensagem || "Erro ao buscar tarefas.");
  }

  return data.tarefas;
}

export async function listarTarefasMateria(materiaId) {
  const response = await fetch(`${API_URL}/tarefas/materia/${materiaId}`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensagem || "Erro ao buscar tarefas.");
  }

  return data.tarefas;
}

export async function criarTarefa(
  titulo,
  descricao,
  prioridade,
  dataEntrega,
  materiaId,
) {
  const response = await fetch(`${API_URL}/tarefas`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",

    body: JSON.stringify({
      titulo,
      descricao,
      prioridade,
      dataEntrega,
      materiaId,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensagem || "Erro ao criar tarefa.");
  }

  return data.tarefa;
}

export async function atualizarTarefa(
  id,
  titulo,
  descricao,
  prioridade,
  concluida,
  dataEntrega,
) {
  const response = await fetch(`${API_URL}/tarefas/${id}`, {
    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",

    body: JSON.stringify({
      titulo,
      descricao,
      prioridade,
      concluida,
      dataEntrega,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensagem || "Erro ao atualizar tarefa.");
  }

  return data.tarefa;
}

export async function removerTarefa(id) {
  const response = await fetch(`${API_URL}/tarefas/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    const data = await response.json();

    throw new Error(data.mensagem || "Erro ao remover tarefa.");
  }
}
