import Sidebar from "../components/Sidebars/Sidebar";

export default function Dashboard() {
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
          Flashcards pendentes:
        </div>
        <div className="text-primary ms-5 mt-3  fs-7 fw-semibold">
          Tarefas pendentes:
        </div>
        <div className="text-primary ms-5 mt-3  fs-7 fw-semibold">
          Flashcards revisados hoje:
        </div>
      </div>
    </main>
  );
}
