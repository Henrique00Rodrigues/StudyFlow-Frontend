import { useState } from "react";
import CardLogOut from "./CardLogOut";

export default function CardPerfil({ setPerfilAberto }) {
  const [confirmandoLogout, setConfirmandoLogout] = useState(false);

  const usuario = {
    email: "usuario@email.com",
    dataCriacao: "15/09/2026",
  };

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
            src="https://placehold.co/150x150"
            alt="Foto de perfil"
            className="rounded-circle border border-3 border-info mb-4"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
            }}
          />

          <div className="w-100">
            <p>
              <span className="text-info">Email:</span> {usuario.email}
            </p>

            <p>
              <span className="text-info">Conta criada em:</span>{" "}
              {usuario.dataCriacao}
            </p>
          </div>

          <div className="w-100 d-flex justify-content-end mt-3">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => setConfirmandoLogout(true)}
            >
              Log Out
            </button>
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
        />
      )}
    </>
  );
}
