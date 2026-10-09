import { useState } from "react";

import { criarMateria } from "../../services/materiaService";

export default function CardAdicionarMateria({
  setAdicionandoMateria,
  setAtualizarMaterias,
  setMensagemSucesso,
}) {
  const [dadosMateria, setDadosMateria] = useState({
    nome: "",
  });

  const [erro, setErro] = useState("");

  async function AdicionarMateria() {
    const nomeMateria = dadosMateria.nome.trim();
    if (nomeMateria === "") {
      setErro(
        "Você precisa inserir o nome da matéria. (O frontend impediu o envio de uma requisição desnecessária ao servidor backend.)",
      );
      return;
    }

    try {
      setErro("");

      const materiaTratada = {
        nome: nomeMateria,
      };

      await criarMateria(materiaTratada.nome);

      setAtualizarMaterias((valorAtual) => valorAtual + 1);

      setMensagemSucesso("Matéria criada com sucesso.");

      setAdicionandoMateria(false);
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
      <h5 className="text-warning">Nome da matéria:</h5>
      <input
        className="form-control"
        type="text"
        maxLength={20}
        value={dadosMateria.nome}
        onChange={(ev) =>
          setDadosMateria({
            ...dadosMateria,
            nome: ev.target.value,
          })
        }
      />

      {erro && (
        <div className="alert alert-danger mt-3" role="alert">
          {erro}
        </div>
      )}

      <button
        type="button"
        className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
        onClick={() => setAdicionandoMateria(false)}
      />
      <div className="mt-4">
        <button
          type="button"
          className="btn btn-primary fw-semibold px-4"
          onClick={AdicionarMateria}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}
