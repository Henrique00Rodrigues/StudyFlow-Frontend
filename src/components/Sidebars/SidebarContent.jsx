import { useState } from "react";
import { NavLink } from "react-router-dom";

import CardLogOut from "../CardLogOut";
import CardPerfil from "../CardPerfil";

import { useAuth } from "../../contexts/AuthContext";

export default function SidebarContent({ hideTitle = false }) {
  const [perfilAberto, setPerfilAberto] = useState(false);
  const [confirmandoLogout, setConfirmandoLogout] = useState(false);

  const { logout } = useAuth();

  async function handleLogout() {
    await logout();
  }

  return (
    <>
      {!hideTitle && <h2 className="text-primary m-3 mb-5">StudyFlow</h2>}

      <ul className="list-unstyled ms-3 p-0">
        <li className="mb-3">
          <NavLink className="text-white text-decoration-none" to="/">
            Dashboard
          </NavLink>
        </li>

        <li className="mb-3">
          <button
            className="btn btn-link btn-warning text-white text-decoration-none p-0"
            id="materias-link"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#materiasSidebar"
            aria-controls="materiasSidebar"
          >
            Matérias
          </button>
        </li>

        <li className="mb-3">
          <NavLink className="text-white text-decoration-none" to="/tarefas">
            Tarefas
          </NavLink>
        </li>

        <li className="mb-3">
          <NavLink className="text-white text-decoration-none" to="/">
            Cronograma
          </NavLink>
        </li>
      </ul>

      <ul className="list-unstyled ms-3 p-0 mt-auto">
        <li className="mb-3">
          <button
            type="button"
            className="btn btn-link btn-info text-white text-decoration-none p-0"
            id="perfil-link"
            onClick={() => {
              perfilAberto === false
                ? setPerfilAberto(true)
                : setPerfilAberto(false);
            }}
          >
            Perfil
          </button>
        </li>

        <li className="mb-3">
          <button
            className="btn btn-link btn-danger text-white text-decoration-none p-0"
            id="logout-link"
            onClick={() => setConfirmandoLogout(true)}
          >
            Log Out
          </button>
        </li>
      </ul>

      {confirmandoLogout && (
        <CardLogOut
          setConfirmandoLogout={setConfirmandoLogout}
          handleLogout={handleLogout}
        />
      )}

      {perfilAberto && <CardPerfil setPerfilAberto={setPerfilAberto} />}
    </>
  );
}
