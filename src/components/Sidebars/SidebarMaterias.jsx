import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function SidebarMaterias() {
  const materias = [
    {
      id: 1,
      nome: "Banco de Dados",
    },
    {
      id: 2,
      nome: "Matemática",
    },
    {
      id: 3,
      nome: "Geografia",
    },
    {
      id: 3,
      nome: "Geografia",
    },
    {
      id: 3,
      nome: "Geografia",
    },
    {
      id: 3,
      nome: "Geografia",
    },
    {
      id: 3,
      nome: "Geografia",
    },
    {
      id: 3,
      nome: "Geografia",
    },
    {
      id: 3,
      nome: "Geografia",
    },
    {
      id: 3,
      nome: "Geografia",
    },
  ];

  return (
    <div
      className="offcanvas offcanvas-end bg-black text-white border-start border-warning"
      tabIndex="-1"
      id="materiasSidebar"
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
          {materias.map((materia) => (
            <li key={materia.id} className="mb-3">
              <NavLink
                className="bg-warning p-4 rounded d-flex justify-content-center align-items-center ms-2 text-black text-decoration-none"
                to={`/materias/${materia.id}`}
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
