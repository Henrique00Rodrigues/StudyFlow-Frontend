import { NavLink, useParams } from "react-router-dom";
import buscarMateriaPorId from "../utils/FindMateriaFunction";

export default function Materia() {
  const { materiaId } = useParams();

  const materia = buscarMateriaPorId(materiaId);

  if (!materia) {
    return (
      <div className="d-flex flex-column align-items-center mt-5">
        <h1 className="text-danger">Matéria não encontrada...</h1>
      </div>
    );
  }

  return (
    <main className="d-flex flex-column vh-100">
      <div className="d-flex justify-content-center mt-2">
        <div className="bg-warning w-auto d-inline-block p-2 rounded">
          <h1 className="text-black mt-0">{materia.nome}</h1>
        </div>
      </div>
      <div className="d-flex justify-content-around align-items-center flex-grow-1">
        <NavLink
          className="btn btn-primary px-5 py-4 fs-4 text-white fw-semibold border-black border-2"
          to={`/materias/${materia.id}/flashcards`}
        >
          Flashcards
        </NavLink>
        <NavLink
          className="btn btn-info px-5 py-4 fs-4 text-black   fw-semibold border-black border-2"
          to={`/materias/${materia.id}/tarefas`}
        >
          Tarefas de {materia.nome}
        </NavLink>
      </div>
    </main>
  );
}
