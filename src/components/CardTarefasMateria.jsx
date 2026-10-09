import { useEffect, useState } from "react";

import CardEditarTarefasMateria from "./TarefasComponents/CardEditarTarefasMateria";

import { listarTarefasMateria } from "../services/tarefaService";

export default function CardTarefasMateria({
  materia,
  atualizarTarefas,
  setAtualizarTarefas,
  setMensagemSucesso,
  filtroSelecionado,
}) {
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);

  useEffect(() => {
    async function carregarTarefas() {
      try {
        setErro("");

        const resultado = await listarTarefasMateria(materia.id);

        setTarefas(resultado);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarTarefas();
  }, [materia.id, atualizarTarefas]);

  if (carregando) {
    return <p className="text-white mt-5">Carregando tarefas...</p>;
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
    <>
      <div className="d-flex flex-column align-items-center w-100">
        {tarefasFiltradas.length > 0 ? (
          tarefasFiltradas.map((tarefa) => {
            const prioridadeFormatada =
              tarefa.prioridade === "alta"
                ? "Alta"
                : tarefa.prioridade === "media"
                  ? "Média"
                  : "Baixa";

            const [ano, mes, dia] = tarefa.dataEntrega.slice(0, 10).split("-");

            const dataEntregaFormatada = `${dia}/${mes}/${ano}`;

            const tituloLimitado =
              tarefa.titulo.length > 40
                ? `${tarefa.titulo.slice(0, 40)}...`
                : tarefa.titulo;

            const textoLimitado =
              tarefa.descricao.length > 200
                ? `${tarefa.descricao.slice(0, 200)}...`
                : tarefa.descricao;

            const tarefaVencida =
              !tarefa.concluida && tarefa.dataEntrega.slice(0, 10) < dataHoje;

            const corCard = tarefa.concluida
              ? "bg-success"
              : tarefaVencida
                ? "bg-danger"
                : "bg-warning";

            return (
              <div
                key={tarefa.id}
                className={`d-flex flex-column align-items-center position-relative ${corCard} rounded mt-4`}
                style={{
                  width: "90%",
                  height: "100px",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                onClick={() => setTarefaSelecionada(tarefa)}
              >
                <div className="position-absolute top-0 end-0 me-4 fw-semibold">
                  {dataEntregaFormatada}
                </div>

                <div className="position-absolute top-0 start-0 ms-2 fw-semibold">
                  Prioridade: {prioridadeFormatada}
                </div>

                <div
                  className="fw-semibold"
                  style={{
                    maxWidth: "40%",
                    overflowWrap: "anywhere",
                    wordBreak: "break-word",
                  }}
                >
                  {tituloLimitado}
                </div>

                <hr
                  className="border-dark border my-0 opacity-100 rounded"
                  style={{
                    width: "95%",
                  }}
                />

                <div
                  className="fw-semibold"
                  style={{
                    maxWidth: "95%",
                    overflowWrap: "anywhere",
                    wordBreak: "break-word",
                  }}
                >
                  {textoLimitado}
                </div>
              </div>
            );
          })
        ) : (
          <h1 className="text-danger mx-auto" style={{ marginTop: "12rem" }}>
            Vazio... ;P
          </h1>
        )}
      </div>

      {tarefaSelecionada && (
        <CardEditarTarefasMateria
          tarefaSelecionada={tarefaSelecionada}
          setTarefaSelecionada={setTarefaSelecionada}
          setAtualizarTarefas={setAtualizarTarefas}
          setMensagemSucesso={setMensagemSucesso}
        />
      )}
    </>
  );
}
