import { useState } from "react";
import { useParams } from "react-router-dom";
import buscarMateriaPorId from "../../utils/FindMateriaFunction";
import CardTarefasMateria from "../../components/CardTarefasMateria";
import CardAdicionarTarefa from "../../components/TarefasComponents/CardAdicionarTarefa";

export default function TarefasMateria() {
  const { materiaId } = useParams();

  const materia = buscarMateriaPorId(materiaId);

  const [adicionandoTarefa, setAdicionandoTarefa] = useState(false);

  if (!materia) {
    return (
      <div className="d-flex flex-column align-items-center mt-5">
        <h1 className="text-danger">Matéria não encontrada...</h1>
      </div>
    );
  }

  return (
    <main className="d-flex flex-column align-items-center">
      <h1 className="text-white">Tarefas de {materia.nome}</h1>
      <CardTarefasMateria props={materia} />
      <button
        type="button"
        className="btn btn-primary fs-3 fw-semibold px-4 py-2 mb-4 position-fixed bottom-0 start-50 translate-middle-x rounded-5"
        onClick={() => setAdicionandoTarefa(true)}
      >
        + Nova tarefa
      </button>

      {adicionandoTarefa && (
        <CardAdicionarTarefa
          materia={materia}
          setAdicionandoTarefa={setAdicionandoTarefa}
        />
      )}
    </main>
  );
}
