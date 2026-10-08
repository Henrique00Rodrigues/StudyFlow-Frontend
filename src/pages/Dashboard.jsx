import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import CardAdicionarMateria from "../components/MateriaComponents/CardAdicionarMateria";

export default function Dashboard() {
  const [adicionandoMateria, setAdicionandoMateria] = useState(false);

  const { setAtualizarMaterias } = useOutletContext();

  return (
    <main className="page">
      <div className="d-flex flex-column">
        <div className="text-primary">v0.0.0</div>
        <div className="text-primary ms-5 mt-5 fs-7 fw-semibold">
          Data atual:{" "}
          <span className="text-white fs-7">
            {new Date().toLocaleDateString("pt-BR")}
          </span>
        </div>
        <div className="text-primary ms-5 mt-3  fs-7 fw-semibold">
          Tarefas pendentes:
        </div>

        <div className="text-primary ms-5 mt-3  fs-7 fw-semibold">
          Tarefas concluídas:
        </div>
        <div className="text-primary ms-5 mt-3  fs-7 fw-semibold">
          Flashcards pendentes:
        </div>
        <div className="text-primary ms-5 mt-3  fs-7 fw-semibold">
          Flashcards revisados hoje:
        </div>
      </div>
      <button
        className="btn btn-primary  fs-3 fw-semibold px-4 py-2 mb-4 position-fixed bottom-0 start-50 translate-middle-x rounded-5"
        onClick={() => setAdicionandoMateria(true)}
      >
        + Adicionar Matéria
      </button>

      {adicionandoMateria && (
        <CardAdicionarMateria
          setAdicionandoMateria={setAdicionandoMateria}
          setAtualizarMaterias={setAtualizarMaterias}
        />
      )}
    </main>
  );
}
