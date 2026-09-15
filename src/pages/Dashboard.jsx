import { useState } from "react";
import Sidebar from "../components/Sidebars/Sidebar";

export default function Dashboard() {
  const [adicionandoMateria, setAdicionandoMateria] = useState(false);
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
        <div
          className="position-fixed translate-middle top-50 start-50 bg-dark border border-3 border-black rounded p-4 text-warning fw-semibold overflow-auto"
          style={{
            width: "90%",
            maxWidth: "700px",
            maxHeight: "90vh",
            zIndex: 1050,
          }}
        >
          <h5 className="text-warning">Nome da matéria:</h5>
          <input className="form-control" type="text" />
          <button
            type="button"
            className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
            onClick={() => setAdicionandoMateria(false)}
          />
          <div className="mt-4">
            <button
              type="button"
              className="btn btn-primary fw-semibold px-4"
              onClick={() => {
                alert(`O botão foi clicado!`);
                setAdicionandoMateria(false);
              }}
            >
              Adicionar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
