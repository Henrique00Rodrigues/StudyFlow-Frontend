import { Link, NavLink } from "react-router-dom";
import SidebarMaterias from "./SidebarMaterias";

export default function Sidebar() {
  return (
    <>
      {/* Botão mobile */}
      <button
        className="btn btn-primary d-md-none m-3"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebarMobile"
        aria-controls="sidebarMobile" /* Tecnologias assistivas */
      >
        ☰
      </button>

      <aside
        className="sidebar bg-black vh-100 border-end border-primary border-5 d-none d-md-flex flex-column"
        style={{
          width: "240px",
          minWidth: "240px",
        }}
      >
        <h2 className="sidebar-title text-primary m-3 mb-5">StudyFlow</h2>
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
            <Link className="text-white text-decoration-none" to="/">
              Perfil
            </Link>
          </li>
          <li className="mb-3">
            <button className="btn btn-link text-white text-decoration-none p-0">
              Sair
            </button>
          </li>
        </ul>
      </aside>

      {/* Sidebar mobile */}
      <div
        className="offcanvas offcanvas-start bg-black text-white"
        tabIndex="-1"
        id="sidebarMobile"
      >
        <div className="offcanvas-header">
          <h2 className="text-primary">StudyFlow</h2>

          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Fechar" /* Tecnologias assistivas. Para acessibilidade (por exemplo, leitores de tela) */
          ></button>
        </div>

        <div className="offcanvas-body p-0 d-flex flex-column">
          <SidebarContent hideTitle={true} />
        </div>
      </div>
      <SidebarMaterias />
    </>
  );
}

function SidebarContent({ hideTitle = false }) {
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
