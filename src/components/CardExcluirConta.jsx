import { useState } from "react";

import { deletarUsuario } from "../services/usuarioService";

export default function CardExcluirConta({
  setConfirmandoExclusao,
  setPerfilAberto,
  handleLogout,
  usuario,
}) {
  const [erro, setErro] = useState("");

  async function ExcluirConta() {
    if (usuario?.tipo === "administrador") {
      setErro(
        "Você é o administrador, não pode deletar sua conta. (O frontend impediu o envio de uma requisição desnecessária ao servidor backend.)",
      );
      return;
    }
    try {
      setErro("");

      await deletarUsuario();

      await handleLogout("exclusao");

      setConfirmandoExclusao(false);
      setPerfilAberto(false);
    } catch (error) {
      setErro(error.message);
    }
  }

  return (
    <div
      className="position-fixed translate-middle top-50 start-50 bg-dark border border-3 border-danger rounded p-4 text-white fw-semibold"
      style={{
        width: "90%",
        maxWidth: "400px",
        zIndex: 3000,
      }}
    >
      <h4 className="text-danger mb-3">Excluir conta</h4>

      <p>Tem certeza que deseja excluir sua conta permanentemente?</p>

      <p className="text-danger">Essa ação não poderá ser desfeita.</p>

      {erro && (
        <div className="alert alert-danger" role="alert">
          {erro}
        </div>
      )}

      <div className="d-flex justify-content-end gap-3 mt-4">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setConfirmandoExclusao(false)}
        >
          Cancelar
        </button>

        <button type="button" className="btn btn-danger" onClick={ExcluirConta}>
          Excluir
        </button>
      </div>
    </div>
  );
}
