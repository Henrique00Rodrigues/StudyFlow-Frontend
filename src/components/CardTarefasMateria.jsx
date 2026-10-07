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
            const textoLimitado =
              tarefa.descricao.length > 300
                ? `${tarefa.descricao.slice(0, 300)}...`
                : tarefa.descricao;

            return (
              <div
                key={tarefa.id}
                className="d-flex flex-column align-items-center bg-warning rounded mt-4"
                style={{
                  width: "90%",
                  minHeight: "100px",
                  cursor: "pointer",
                }}
                onClick={() => setTarefaSelecionada(tarefa)}
              >
                <div className="fw-semibold">{tarefa.titulo}</div>

                <hr
                  className="border-dark border my-0 opacity-100 rounded"
                  style={{
                    width: "95%",
                  }}
                />

                <div
                  className="fw-semibold"
                  style={{
                    width: "95%",
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
