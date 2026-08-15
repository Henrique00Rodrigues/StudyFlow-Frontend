import { useParams } from "react-router-dom";
import buscarMateriaPorId from "../../utils/FindMateriaFunction";

export default function TarefasMateria() {
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
    <main className="d-flex justify-content-center text-white">
      <h1>Hey, esta é a página de tarefas de {materia.nome}</h1>
    </main>
  );
}
