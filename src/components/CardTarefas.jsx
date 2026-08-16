import { useState } from "react";

export default function CardTarefas({ props }) {
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);

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
                  height: "100px",
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
          <input
            className="form-control mb-3"
            type="text"
            disabled
            value={tarefaSelecionada.titulo}
          />
          <h5 className="text-warning mt-4">Descrição:</h5>
          <textarea
            className="form-control mb-3"
            disabled
            value={tarefaSelecionada.descricao}
            rows={2}
          />
          <h5 className="text-warning mt-4">Prioridade:</h5>
          <input
            className="form-control mb-3"
            type="text"
            disabled
            value={tarefaSelecionada.prioridade}
          />
          <h5 className="text-warning mt-4">Data Criação:</h5>
          <input
            className="form-control mb-5"
            type="date"
            disabled
            value={tarefaSelecionada.dataCriacao}
          />
          <h5 className="text-warning mt-4">Data Entrega:</h5>
          <input
            className="text-black p-2"
            type="date"
            disabled
            value={tarefaSelecionada.dataEntrega}
          />
          <div className="d-flex justify-content-end align-items-center gap-3 mt-4">
            <h5 className="text-warning">Concluir:</h5>
            <input
              className="form-check-input"
              type="checkbox"
              style={{ height: "25px", width: "25px" }}
            />
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
