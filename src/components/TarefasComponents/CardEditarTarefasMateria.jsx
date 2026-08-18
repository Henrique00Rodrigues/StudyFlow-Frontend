import { useState } from "react";

import BotaoSalvar from "./BotaoSalvar";
import BotaoEditar from "./BotaoEditar";
import BotaoRemover from "./BotaoRemover";

export default function CardEditarTarefasMateria({
  tarefaSelecionada,
  setTarefaSelecionada,
}) {
  const [campoEditando, setCampoEditando] = useState(null); //vai passar o campo que será  editado (ex, "título", "descrição", etc)

  const [tarefaModificada, setTarefaModificada] = useState({
    //É a cópia temporária da tarefa original (tarefaSelecionada), usada enquanto o usuário está editando.
    ...tarefaSelecionada,
  });

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
          value={tarefaModificada.titulo}
          onChange={(ev) =>
            setTarefaModificada({
              ...tarefaModificada,
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
          value={tarefaModificada.descricao}
          rows={2}
          onChange={(ev) =>
            setTarefaModificada({
              ...tarefaModificada,
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
          value={tarefaModificada.prioridade}
          onChange={(ev) =>
            setTarefaModificada({
              ...tarefaModificada,
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
          value={tarefaModificada.dataCriacao}
          onChange={(ev) =>
            setTarefaModificada({
              ...tarefaModificada,
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
          value={tarefaModificada.dataEntrega}
          onChange={(ev) =>
            setTarefaModificada({
              ...tarefaModificada,
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
          <BotaoSalvar
            tarefaModificada={tarefaModificada}
            setTarefaSelecionada={setTarefaSelecionada}
          />
          <BotaoRemover
            tarefaSelecionada={tarefaSelecionada}
            setTarefaSelecionada={setTarefaSelecionada}
          />
        </div>
        <div className="d-flex align-items-center gap-3">
          <h5 className="text-warning mb-0">Concluir:</h5>

          <input
            className="form-check-input m-0"
            type="checkbox"
            checked={tarefaModificada.concluida}
            style={{
              height: "25px",
              width: "25px",
            }}
            onChange={(ev) =>
              setTarefaModificada({
                ...tarefaModificada,
                concluida: ev.target.checked,
              })
            }
          />
        </div>
      </div>

      <button
        className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
        onClick={() => {
          setTarefaSelecionada(null); //Fecha o card.
        }}
      ></button>
    </div>
  );
}
