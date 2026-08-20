import { useState } from "react";
import { useParams } from "react-router-dom";
import FlashcardComponent from "../components/FlashcardComponent";
import buscarMateriaPorId from "../utils/FindMateriaFunction";
import CardAdicionarFlashcard from "../components/FlashcardsComponents/CardAdicionarFlashcard";

export default function Flashcards() {
  const { materiaId } = useParams();

  const materia = buscarMateriaPorId(materiaId);

  const [adicionandoFlashcard, setAdicionandoFlashcard] = useState(false);

  return (
    <main className="d-flex flex-column align-items-center">
      <h1 className="text-white">Flashcards de {materia.nome}</h1>
      <FlashcardComponent materia={materia} />
      <button
        type="button"
        className="btn btn-primary fs-3 fw-semibold px-4 py-2 mb-4 position-fixed bottom-0 start-50 translate-middle-x rounded-5"
        onClick={() => setAdicionandoFlashcard(true)}
      >
        + Novo Flashcard
      </button>

      {adicionandoFlashcard && (
        <CardAdicionarFlashcard
          materia={materia}
          setAdicionandoFlashcard={setAdicionandoFlashcard}
        />
      )}
    </main>
  );
}
