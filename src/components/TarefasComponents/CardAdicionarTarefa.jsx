import { useState } from "react";

import { criarTarefa } from "../../services/tarefaService";

export default function CardAdicionarTarefa({
  materia,
  setAdicionandoTarefa,
  setAtualizarTarefas,
}) {
  const [dadosTarefa, setDadosTarefa] = useState({
    titulo: "",
    descricao: "",
    prioridade: "",
    dataEntrega: "",
  });

  const [erro, setErro] = useState("");

  async function AdicionarTarefa() {
    if (
      dadosTarefa.titulo.trim() === "" ||
      dadosTarefa.descricao.trim() === "" ||
      dadosTarefa.prioridade.trim() === "" ||
      dadosTarefa.dataEntrega === ""
    ) {
      setErro(
        "Alguma informação está faltando.  (O frontend impediu o envio de uma requisição desnecessária ao servidor backend.)",
      );
      return;
    }

    const prioridadeDigitada = dadosTarefa.prioridade.trim().toLowerCase();

    const prioridadeTratada =
      prioridadeDigitada === "média" ? "media" : prioridadeDigitada;

    if (
      prioridadeTratada !== "alta" &&
      prioridadeTratada !== "media" &&
      prioridadeTratada !== "baixa"
    ) {
      setErro("A prioridade precisa ser: Alta, Média ou Baixa.");
      return;
    }

    try {
      setErro("");

      const tarefaTratada = {
        titulo: dadosTarefa.titulo.trim(),
        descricao: dadosTarefa.descricao.trim(),
        prioridade: prioridadeTratada,
        dataEntrega: dadosTarefa.dataEntrega,
      };

      await criarTarefa(
        tarefaTratada.titulo,
        tarefaTratada.descricao,
        tarefaTratada.prioridade,
        tarefaTratada.dataEntrega,
        materia.id,
      );

      setAtualizarTarefas((valorAtual) => valorAtual + 1);

      setAdicionandoTarefa(false);
    } catch (error) {
      setErro(error.message);
    }
  }
  return (
    <div
      className="position-fixed translate-middle top-50 start-50 bg-dark border border-3 border-black rounded p-4 text-warning fw-semibold overflow-auto"
      style={{
        width: "90%",
        maxWidth: "700px",
        maxHeight: "90vh",
        zIndex: 1050,
      }}
    >
      <h5 className="text-warning">Título:</h5>

      <input
        className="form-control"
        type="text"
        value={dadosTarefa.titulo}
        onChange={(ev) =>
          setDadosTarefa({
            ...dadosTarefa,
            titulo: ev.target.value,
          })
        }
      />

      <h5 className="text-warning mt-4">Descrição:</h5>

      <textarea
        className="form-control"
        rows={2}
        value={dadosTarefa.descricao}
        onChange={(ev) =>
          setDadosTarefa({
            ...dadosTarefa,
            descricao: ev.target.value,
          })
        }
      />

      <h5 className="text-warning mt-4">Prioridade:</h5>

      <input
        className="form-control"
        type="text"
        value={dadosTarefa.prioridade}
        onChange={(ev) =>
          setDadosTarefa({
            ...dadosTarefa,
            prioridade: ev.target.value,
          })
        }
      />

      <h5 className="text-warning mt-4">Data Entrega:</h5>

      <input
        className="form-control"
        type="date"
        value={dadosTarefa.dataEntrega}
        onChange={(ev) =>
          setDadosTarefa({
            ...dadosTarefa,
            dataEntrega: ev.target.value,
          })
        }
      />

      {erro && (
        <div className="alert alert-danger mt-3" role="alert">
          {erro}
        </div>
      )}

      <div className="mt-4">
        <button
          type="button"
          className="btn btn-primary fw-semibold px-4"
          onClick={AdicionarTarefa}
        >
          Adicionar
        </button>
      </div>

      <button
        type="button"
        className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
        onClick={() => setAdicionandoTarefa(false)}
      />
    </div>
  );
}
