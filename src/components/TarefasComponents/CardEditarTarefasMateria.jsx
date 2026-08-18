import BotaoSalvar from "./BotaoSalvar";
import BotaoEditar from "./BotaoEditar";
import BotaoRemover from "./BotaoRemover";

export default function CardEditarTarefasMateria({
  campoEditando,
  setCampoEditando,
  tarefaSelecionada,
  setTarefaSelecionada,
}) {
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

        <BotaoEditar
          campo={"titulo"}
          campoEditando={campoEditando}
          setCampoEditando={setCampoEditando}
        />
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
        <BotaoEditar
          campo={"descricao"}
          campoEditando={campoEditando}
          setCampoEditando={setCampoEditando}
        />
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
        <BotaoEditar
          campo={"prioridade"}
          campoEditando={campoEditando}
          setCampoEditando={setCampoEditando}
        />
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
        <BotaoEditar
          campo={"dataCriacao"}
          campoEditando={campoEditando}
          setCampoEditando={setCampoEditando}
        />
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
        <BotaoEditar
          campo={"dataEntrega"}
          campoEditando={campoEditando}
          setCampoEditando={setCampoEditando}
        />
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <div className="d-flex gap-2">
          <BotaoSalvar props={tarefaSelecionada} />
          <BotaoRemover tarefa={tarefaSelecionada} />
        </div>
        <div className="d-flex align-items-center gap-3">
          <h5 className="text-warning mb-0">Concluir:</h5>

          <input
            className="form-check-input m-0"
            type="checkbox"
            style={{
              height: "25px",
              width: "25px",
            }}
            onChange={(ev) =>
              setTarefaSelecionada({
                ...tarefaSelecionada,
                concluida: ev.target.checked,
              })
            }
          />
        </div>
      </div>

      <button
        className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
        onClick={() => setTarefaSelecionada(null)}
      ></button>
    </div>
  );
}
