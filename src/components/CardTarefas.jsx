import { useState } from "react";
import CardEditarTarefasMateria from "./TarefasComponents/CardEditarTarefasMateria";

export default function CardTarefas({ props }) {
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);
  const [campoEditando, setCampoEditando] = useState(null); //vai passar o campo que será  editado (ex, "título", "descrição", etc)

  return (
    <>
      <div className="d-flex flex-column align-items-center w-100">
        {props.tarefas?.length > 0 ? (
          props.tarefas.map((tarefa) => {
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
          campoEditando={campoEditando}
          setCampoEditando={setCampoEditando}
          tarefaSelecionada={tarefaSelecionada}
          setTarefaSelecionada={setTarefaSelecionada}
        />
      )}
    </>
  );
}
