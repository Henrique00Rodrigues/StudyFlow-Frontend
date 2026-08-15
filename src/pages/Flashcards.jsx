import FlashcardComponent from "../components/FlashcardComponent";
import { useParams } from "react-router-dom";
import buscarMateriaPorId from "../utils/FindMateriaFunction";

export default function Flashcards() {
  const { materiaId } = useParams();

  const materia = buscarMateriaPorId(materiaId);

  return (
    <main className="d-flex flex-column align-items-center">
      <h1 className="text-white">
        Hey, aqui é a página dos flashcards de {materia.nome} ;)
      </h1>
      <FlashcardComponent props={materia} />
    </main>
  );
}
