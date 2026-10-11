import { useEffect, useState } from "react";

import CardLogOut from "./CardLogOut";
import CardExcluirConta from "./CardExcluirConta";

import {
  buscarDadosUsuario,
  atualizarUsuario,
} from "../services/usuarioService";

export default function CardPerfil({
  setPerfilAberto,
  handleLogout,
  setAtualizarUsuario,
}) {
  const [confirmandoLogout, setConfirmandoLogout] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(null);

  const [usuario, setUsuario] = useState(null);

  const [editandoApelido, setEditandoApelido] = useState(false);

  const [confirmandoExclusao, setConfirmandoExclusao] = useState(false);

  const [erro, setErro] = useState("");

  function SelecionarFoto(ev) {
    const arquivo = ev.target.files[0];

    if (arquivo) {
      const urlFoto = URL.createObjectURL(arquivo);
      setFotoPerfil(urlFoto);
    }
  }

  async function SalvarAlteracoes() {
    try {
      setErro("");

      const usuarioAtualizado = await atualizarUsuario(usuario.apelido);

      setUsuario(usuarioAtualizado);

      setAtualizarUsuario((valorAtual) => valorAtual + 1);

      setPerfilAberto(false);
    } catch (error) {
      setErro(error.message);
    }
  }

  useEffect(() => {
    async function carregarDadosUsuario() {
      try {
        setErro("");

        const dadosUsuario = await buscarDadosUsuario();

        setUsuario(dadosUsuario);
      } catch (error) {
        setErro(error.message);
      }
    }

    carregarDadosUsuario();
  }, []);

  return (
    <>
      <div
        className="position-fixed translate-middle top-50 start-50 bg-dark border border-3 border-info rounded p-4 text-white fw-semibold"
        style={{
          width: "90%",
          maxWidth: "500px",
          zIndex: 2000,
        }}
      >
        <h4 className="text-info mb-4">Perfil</h4>

        <div className="d-flex flex-column align-items-center">
          <img
            src={fotoPerfil || "https://placehold.co/150x150"}
            alt="Foto de perfil"
            className="rounded-circle border border-3 border-info mb-4"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
            }}
          />

          <input
            type="file"
            accept="image/*"
            className="form-control mb-4"
            onChange={SelecionarFoto}
          />

          <div className="w-100">
            <div className="d-flex align-items-center gap-2 mb-3">
              <input
                type="text"
                className={`form-control ${editandoApelido ? "bg-light" : "bg-info"} fw-semibold border border-3 border-secondary`}
                value={usuario?.apelido ?? ""}
                disabled={!editandoApelido}
                maxLength={30}
                onChange={(ev) =>
                  setUsuario({ ...usuario, apelido: ev.target.value })
                }
              />

              <button
                type="button"
                className={`btn ${editandoApelido ? "btn-primary" : "btn-secondary"} border border-2 border-black d-flex justify-content-center align-items-center`}
                onClick={() => setEditandoApelido((valorAtual) => !valorAtual)}
              >
                ✏️
              </button>
            </div>

            {erro && (
              <div className="alert alert-danger mt-3" role="alert">
                {erro}
              </div>
            )}

            <p>
              <span className="text-info">Email:</span> {usuario?.email}
            </p>

            <p>
              <span className="text-info">Conta criada em:</span>{" "}
              {usuario?.dataCriacao
                ? new Date(usuario.dataCriacao).toLocaleDateString("pt-BR")
                : ""}
            </p>

            <p>
              <span className="text-info">Tipo:</span> {usuario?.tipo}
            </p>
          </div>

          <div className="w-100 d-flex justify-content-between mt-3">
            <button
              type="button"
              className="btn btn-success"
              onClick={SalvarAlteracoes}
              disabled={!usuario}
            >
              Salvar
            </button>
            <div className="d-flex gap-3">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => setConfirmandoLogout(true)}
              >
                Log Out
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setConfirmandoExclusao(true)}
              >
                Excluir conta
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
          onClick={() => setPerfilAberto(false)}
        />
      </div>

      {confirmandoLogout && (
        <CardLogOut
          setConfirmandoLogout={setConfirmandoLogout}
          setPerfilAberto={setPerfilAberto}
          handleLogout={handleLogout}
        />
      )}

      {confirmandoExclusao && (
        <CardExcluirConta
          setConfirmandoExclusao={setConfirmandoExclusao}
          setPerfilAberto={setPerfilAberto}
          handleLogout={handleLogout}
          usuario={usuario}
        />
      )}
    </>
  );
}
