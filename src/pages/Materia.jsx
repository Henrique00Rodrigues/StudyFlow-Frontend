import { useParams } from "react-router-dom";
import dados from "../data/db.json";

export default function Materia() {
  const { id } = useParams();

  const materia = dados.materias.find((materia) => materia.id === +id);

  return (
    <main>
      <h1 className="text-white">Matéria: {materia.nome}</h1>
    </main>
  );
}
