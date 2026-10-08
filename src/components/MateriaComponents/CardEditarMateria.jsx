import { useState } from "react";

import { atualizarMateria } from "../../services/materiaService";

export default function CardEditarMateria({
  materia,
  setMateria,
  setEditandoMateria,
  setAtualizarMaterias,
  setMensagemSucesso,
}) {
  const [nomeMateria, setNomeMateria] = useState(materia.nome);
  const [erro, setErro] = useState("");

  async function SalvarMateria() {
    const nomeTratado = nomeMateria.trim();

    if (nomeTratado === "") {
      setErro(
        "Você precisa inserir o nome da matéria. (O frontend impediu o envio de uma requisição desnecessária ao servidor backend.)",
      );
      return;
    }

    try {
      setErro("");

      const materiaAtualizada = await atualizarMateria(materia.id, nomeTratado);

      setMateria(materiaAtualizada);

      setAtualizarMaterias((valorAtual) => valorAtual + 1);

      setMensagemSucesso("Matéria atualizada com sucesso.");

      setTimeout(() => {
        setMensagemSucesso("");
      }, 3000);

      setEditandoMateria(false);
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
        value={nomeMateria}
        onChange={(ev) => setNomeMateria(ev.target.value)}
      />

      <button
        type="button"
        className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
        onClick={() => setEditandoMateria(false)}
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
          onClick={SalvarMateria}
        >
          Salvar
        </button>
      </div>
    </div>
  );
}
