import { NavLink } from "react-router-dom";
import { Offcanvas } from "bootstrap";
import dados from "../../data/db.json";

export default function SidebarMaterias() {
  function fecharSidebar() {
    const elemento = document.getElementById("materiasSidebar"); //Está usando JS para pegar a div do HTML

    const offcanvas = Offcanvas.getInstance(elemento); //Está recuperando a instância Offcanvas da div

    offcanvas?.hide(); //Se offcanvas não for null, ele esconde o offcanvas.
  }

  return (
    <div
      className="offcanvas offcanvas-end bg-black text-white border-start border-warning"
      tabIndex="-1"
      id="materiasSidebar"
      data-bs-backdrop="false"
    >
      <div className="offcanvas-header">
        <h2 className="text-primary">Matérias</h2>

        <button
          type="button"
          className="btn-close btn-close-white"
          data-bs-dismiss="offcanvas"
          aria-label="Fechar"
        ></button>
      </div>

      <div className="offcanvas-body">
        <ul className="list-unstyled">
          {dados.materias.map((materia) => (
            <li key={materia.id} className="mb-3">
              <NavLink
                className="bg-warning p-4 rounded d-flex justify-content-center align-items-center ms-2 text-black text-decoration-none"
                to={`/materias/${materia.id}`}
                onClick={fecharSidebar}
              >
                {materia.nome}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
