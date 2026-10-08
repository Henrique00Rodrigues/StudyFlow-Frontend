import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { listarMaterias } from "../../services/materiaService";
import fecharSidebar from "../../utils/OffcanvasFunctions";

export default function SidebarMaterias({ atualizarMaterias }) {
  const [materias, setMaterias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarMaterias() {
      try {
        setErro("");

        const resultado = await listarMaterias();

        setMaterias(resultado);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarMaterias();
  }, [atualizarMaterias]);

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
        {carregando && <p className="text-white">Carregando matérias...</p>}

        {erro && (
          <div className="alert alert-danger" role="alert">
            {erro}
          </div>
        )}

        {!carregando && !erro && (
          <ul className="list-unstyled">
            {materias.map((materia) => (
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
        )}
      </div>
    </div>
  );
}
