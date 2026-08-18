import { useState } from "react";

export default function CardAdicionarTarefa({ materia, setAdicionandoTarefa }) {
  //Estou recebendo o props "materia", pois Isso será importante quando você criar o objeto com POO. Quando for fazer as associações de objetos. Assim a nova tarefa fica associada à matéria atual.
  const [dadosTarefa, setDadosTarefa] = useState({
    titulo: "",
    descricao: "",
    prioridade: "",
    dataCriacao: "",
    dataEntrega: "",
  });
  function AdicionarTarefa() {
    if (
      dadosTarefa.titulo.trim() === "" ||
      dadosTarefa.descricao.trim() === "" ||
      dadosTarefa.prioridade.trim() === "" ||
      dadosTarefa.dataCriacao === "" ||
      dadosTarefa.dataEntrega === ""
    ) {
      alert("Alguma informação está faltando");
    } else if (
      dadosTarefa.prioridade.trim().toLowerCase() !== "alta" &&
      dadosTarefa.prioridade.trim().toLowerCase() !== "média" &&
      dadosTarefa.prioridade.trim().toLowerCase() !== "baixa"
    ) {
      alert("A prioriadade precisa ser: Alta/Média/Baixa");
    } else {
      const tarefaTratada = {
        //Essa váriavel evita que um input seja salvo sem padronização. Ex: titulo: "    Hey  ", prioridade: "   ALta", etc
        ...dadosTarefa,
        titulo: dadosTarefa.titulo.trim(),
        descricao: dadosTarefa.descricao.trim(),
        prioridade: dadosTarefa.prioridade.trim().toLowerCase(),
      };

      alert(`Adicionando tarefa: ${JSON.stringify(tarefaTratada)}`);
      setAdicionandoTarefa(false); //Fecha o card se estiver tudo correto.
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

      <h5 className="text-warning mt-4">Data Criação:</h5>

      <input
        className="form-control"
        type="date"
        value={dadosTarefa.dataCriacao}
        onChange={(ev) =>
          setDadosTarefa({
            ...dadosTarefa,
            dataCriacao: ev.target.value,
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
