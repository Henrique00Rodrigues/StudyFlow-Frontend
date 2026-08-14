import { NavLink } from "react-router-dom";

export default function SidebarContent({ hideTitle = false }) {
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
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#materiasSidebar"
            aria-controls="materiasSidebar"
          >
            Matérias
          </button>
        </li>

        <li className="mb-3">
          <NavLink className="text-white text-decoration-none" to="/">
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
          <NavLink className="text-white text-decoration-none" to="/">
            Perfil
          </NavLink>
        </li>

        <li className="mb-3">
          <button className="btn btn-link text-white text-decoration-none p-0">
            Sair
          </button>
        </li>
      </ul>
    </>
  );
}
