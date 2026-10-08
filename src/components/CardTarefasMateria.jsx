import { useEffect, useState } from "react";

import CardEditarTarefasMateria from "./TarefasComponents/CardEditarTarefasMateria";

import { listarTarefasMateria } from "../services/tarefaService";

export default function CardTarefasMateria({
  materia,
  atualizarTarefas,
  setAtualizarTarefas,
  setMensagemSucesso,
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

  return (
    <>
      <div className="d-flex flex-column align-items-center w-100">
        {tarefas.length > 0 ? (
          tarefas.map((tarefa) => {
            const tituloLimitado =
              tarefa.titulo.length > 40
                ? `${tarefa.titulo.slice(0, 40)}...`
                : tarefa.titulo;

            const textoLimitado =
              tarefa.descricao.length > 360
                ? `${tarefa.descricao.slice(0, 360)}...`
                : tarefa.descricao;

            return (
              <div
                key={tarefa.id}
                className="d-flex flex-column align-items-center bg-warning rounded mt-4"
                style={{
                  width: "90%",
                  height: "100px",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                onClick={() => setTarefaSelecionada(tarefa)}
              >
                <div
                  className="fw-semibold"
                  style={{
                    maxWidth: "95%",
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
