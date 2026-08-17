import { useParams } from "react-router-dom";
import buscarMateriaPorId from "../../utils/FindMateriaFunction";
import CardTarefasMateria from "../../components/CardTarefasMateria";

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
    <main className="d-flex flex-column align-items-center">
      <h1 className="text-white">Tarefas de {materia.nome}</h1>
      <CardTarefasMateria props={materia} />
    </main>
  );
}
