import { useEffect, useState } from "react";

import CardTarefasGlobais from "../../components/CardTarefasGlobais";

import { listarTarefas } from "../../services/tarefaService";

export default function TarefasGlobais() {
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [filtroSelecionado, setFiltroSelecionado] = useState("todas");

  useEffect(() => {
    async function carregarTarefas() {
      try {
        setErro("");

        const resultado = await listarTarefas();

        setTarefas(resultado);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarTarefas();
  }, []);

  if (carregando) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <p className="text-white">Carregando tarefas...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="alert alert-danger mt-5" role="alert">
        {erro}
      </div>
    );
  }

  const hoje = new Date();

  const dataHoje = `${hoje.getFullYear()}-${String(
    hoje.getMonth() + 1,
  ).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;

  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (filtroSelecionado === "concluidas") {
      return tarefa.concluida;
    }

    if (filtroSelecionado === "pendentes") {
      return !tarefa.concluida;
    }

    if (filtroSelecionado === "vencidas") {
      return !tarefa.concluida && tarefa.dataEntrega.slice(0, 10) < dataHoje;
    }

    return true;
  });

  return (
    <main className="d-flex flex-column align-items-center">
      <h1 className="text-white">Tarefas Globais</h1>

      <div className="d-flex gap-3 mt-3">
        <button
          type="button"
          className={`btn ${
            filtroSelecionado === "todas"
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
          onClick={() => setFiltroSelecionado("todas")}
        >
          Todas
        </button>

        <button
          type="button"
          className={`btn ${
            filtroSelecionado === "concluidas"
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
          onClick={() => setFiltroSelecionado("concluidas")}
        >
          Concluídas
        </button>

        <button
          type="button"
          className={`btn ${
            filtroSelecionado === "pendentes"
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
          onClick={() => setFiltroSelecionado("pendentes")}
        >
          Pendentes
        </button>

        <button
          type="button"
          className={`btn ${
            filtroSelecionado === "vencidas"
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
          onClick={() => setFiltroSelecionado("vencidas")}
        >
          Vencidas
        </button>
      </div>

      <CardTarefasGlobais tarefasFiltradas={tarefasFiltradas} />
    </main>
  );
}
