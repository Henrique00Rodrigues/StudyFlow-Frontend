import { main } from "@popperjs/core";
import FlashcardComponent from "../components/FlashcardComponent";
import { useParams } from "react-router-dom";
import buscarMateriaPorId from "../utils/FindMateriaFunction";

export default function Flashcards() {
  const { id } = useParams();

  const materia = buscarMateriaPorId(id);

  return (
    <main className="d-flex flex-column align-items-center">
      <h1 className="text-white">
        Hey, aqui é a página dos flashcards de {materia.nome} ;)
      </h1>
      <FlashcardComponent props={materia} />
    </main>
  );
}
