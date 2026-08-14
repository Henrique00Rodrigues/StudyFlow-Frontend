import { useParams } from "react-router-dom";
import FlashcardComponent from "../components/FlashcardComponent";
import dados from "../data/db.json";

export default function Materia() {
  const { id } = useParams();

  const materia = dados.materias.find((materia) => materia.id === +id);

  return (
    <main>
      <div className="d-flex justify-content-center mt-2">
        <div className="bg-warning w-auto d-inline-block p-2 rounded">
          <h1 className="text-black mt-0">{materia.nome}</h1>
        </div>
      </div>
      <FlashcardComponent props={materia} /> //Estou passando matéria para o
      componente funcional dos Flashcards.
    </main>
  );
}
