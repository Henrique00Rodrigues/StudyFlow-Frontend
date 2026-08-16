import { useState } from "react";

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
          <div className="d-flex align-items-center gap-3 ">
            <input
              className="form-control flex-grow-1"
              type="text"
              disabled={campoEditando !== "titulo"}
              value={tarefaSelecionada.titulo}
              onChange={(ev) =>
                setTarefaSelecionada({
                  ...tarefaSelecionada,
                  titulo: ev.target.value,
                })
              }
            />

            <button
              className={`btn ${campoEditando === "titulo" ? "btn-primary" : "btn-dark"} border border-2 border-black d-flex justify-content-center align-items-center`}
              style={{
                width: "42px",
                height: "42px",
              }}
              onClick={() => {
                campoEditando !== "titulo"
                  ? setCampoEditando("titulo")
                  : setCampoEditando(null);
              }}
            >
              ✏️
            </button>
          </div>

          <h5 className="text-warning mt-4">Descrição:</h5>
          <div className="d-flex align-items-center gap-2">
            <textarea
              className="form-control flex-grow-1"
              disabled={campoEditando !== "descricao"}
              value={tarefaSelecionada.descricao}
              rows={2}
              onChange={(ev) =>
                setTarefaSelecionada({
                  ...tarefaSelecionada,
                  descricao: ev.target.value,
                })
              }
            />
            <button
              className={`btn ${campoEditando === "descricao" ? "btn-primary" : "btn-dark"} border border-2 border-black d-flex justify-content-center align-items-center`}
              style={{
                width: "42px",
                height: "42px",
              }}
              onClick={() =>
                campoEditando !== "descricao"
                  ? setCampoEditando("descricao")
                  : setCampoEditando(null)
              }
            >
              ✏️
            </button>
          </div>

          <h5 className="text-warning mt-4">Prioridade:</h5>
          <div className="d-flex align-items-center gap-2">
            <input
              className="form-control"
              type="text"
              disabled={campoEditando !== "prioridade"}
              value={tarefaSelecionada.prioridade}
              onChange={(ev) =>
                setTarefaSelecionada({
                  ...tarefaSelecionada,
                  prioridade: ev.target.value,
                })
              }
            />
            <button
              className={`btn ${campoEditando === "prioridade" ? "btn-primary" : "btn-dark"} border border-2 border-black d-flex justify-content-center align-items-center`}
              style={{
                width: "42px",
                height: "42px",
              }}
              onClick={() =>
                campoEditando !== "prioridade"
                  ? setCampoEditando("prioridade")
                  : setCampoEditando(null)
              }
            >
              ✏️
            </button>
          </div>

          <h5 className="text-warning mt-4">Data Criação:</h5>
          <div className="d-flex align-items-center gap-2">
            <input
              className="form-control"
              type="date"
              disabled={campoEditando !== "dataCriacao"}
              value={tarefaSelecionada.dataCriacao}
              onChange={(ev) =>
                setTarefaSelecionada({
                  ...tarefaSelecionada,
                  dataCriacao: ev.target.value,
                })
              }
            />
            <button
              className={`btn ${campoEditando === "dataCriacao" ? "btn-primary" : "btn-dark"} border border-2 border-black d-flex justify-content-center align-items-center`}
              style={{
                width: "42px",
                height: "42px",
              }}
              onClick={() =>
                campoEditando !== "dataCriacao"
                  ? setCampoEditando("dataCriacao")
                  : setCampoEditando(null)
              }
            >
              ✏️
            </button>
          </div>

          <h5 className="text-warning mt-4">Data Entrega:</h5>
          <div className="d-flex align-items-center gap-2">
            <input
              className="text-black p-2 rounded border border-1 border-danger"
              type="date"
              disabled={campoEditando !== "dataEntrega"}
              value={tarefaSelecionada.dataEntrega}
              onChange={(ev) =>
                setTarefaSelecionada({
                  ...tarefaSelecionada,
                  dataEntrega: ev.target.value,
                })
              }
            />
            <button
              className={`btn ${campoEditando === "dataEntrega" ? "btn-primary" : "btn-dark"} border border-2 border-black d-flex justify-content-center align-items-center`}
              style={{
                width: "42px",
                height: "42px",
              }}
              onClick={() =>
                campoEditando !== "dataEntrega"
                  ? setCampoEditando("dataEntrega")
                  : setCampoEditando(null)
              }
            >
              ✏️
            </button>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <button
              type="submit"
              className="btn btn-primary fw-semibold px-4"
              onClick={() => {
                if (
                  tarefaSelecionada.prioridade.trim().toLowerCase() !==
                    "alta" &&
                  tarefaSelecionada.prioridade.trim().toLowerCase() !==
                    "média" &&
                  tarefaSelecionada.prioridade.trim().toLowerCase() !== "baixa"
                ) {
                  alert("A prioriadade precisa ser: Alta/Média/Baixa");
                } else {
                  alert(
                    `Salvando tarefa: ${JSON.stringify(tarefaSelecionada)}`,
                  );
                }
              }}
            >
              Salvar
            </button>

            <div className="d-flex align-items-center gap-3">
              <h5 className="text-warning mb-0">Concluir:</h5>

              <input
                className="form-check-input m-0"
                type="checkbox"
                style={{
                  height: "25px",
                  width: "25px",
                }}
              />
            </div>
          </div>

          <button
            className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
            onClick={() => setTarefaSelecionada(null)}
          ></button>
        </div>
      )}
    </>
  );
}
