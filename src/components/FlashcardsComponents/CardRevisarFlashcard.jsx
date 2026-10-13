import { useState } from "react";

import { revisarFlashcard } from "../../services/flashcardService";

export default function CardRevisarFlashcard({
  flashcardRevisao,
  setFlashcardRevisao,
  flashcards,
  setAtualizarFlashcards,
  FlashcardDisponivel,
}) {
  const [mostrarVerso, setMostrarVerso] = useState(false);

  const [erro, setErro] = useState("");

  function AcharProximoFlashcard(idAtual, listaFlashcards) {
    const indiceAtual = listaFlashcards.findIndex(
      (flashcard) => flashcard.id === idAtual,
    );

    if (indiceAtual === -1) {
      return null;
    }

    //Busca circular
    for (
      let deslocamento = 1;
      deslocamento <= listaFlashcards.length;
      deslocamento++
    ) {
      const indice = (indiceAtual + deslocamento) % listaFlashcards.length;

      const flashcard = listaFlashcards[indice];

      if (FlashcardDisponivel(flashcard)) {
        return flashcard;
      }
    }

    return null;
  }

  async function RegistrarRevisao(resultado) {
    try {
      setErro("");

      //Atualiza flashcard revisado no backend
      const flashcardAtualizado = await revisarFlashcard(
        flashcardRevisao.id,
        resultado,
      );

      // Atualiza temporariamente o cartão antigo pelo cartão atualizado devolvido pelo backend
      const flashcardsAtualizados = flashcards.map((flashcard) =>
        flashcard.id === flashcardAtualizado.id
          ? flashcardAtualizado
          : flashcard,
      );

      setAtualizarFlashcards((valorAtual) => valorAtual + 1);

      //Retorna o próximo flashcard DISPONÍVEL para revisão usando a lista que já contém o resultado da revisão recém-atualizada.
      const proximoFlashcard = AcharProximoFlashcard(
        flashcardRevisao.id,
        flashcardsAtualizados,
      );

      if (proximoFlashcard) {
        setFlashcardRevisao(proximoFlashcard);
        setMostrarVerso(false);
      } else {
        setFlashcardRevisao(null);
      }
    } catch (error) {
      setErro(error.message);
    }
  }

  return (
    <div
      className="position-fixed translate-middle top-50 start-50 bg-dark border border-3 border-black rounded p-4 text-warning fw-semibold overflow-auto"
      style={{
        width: "90%",
        maxWidth: "700px",
        maxHeight: "90vh",
        zIndex: 1050,
      }}
    >
      <div className="d-flex justify-content-around">
        <h4 className="text-warning mb-4">Flashcard {flashcardRevisao.id}</h4>
        <h4 className="text-info mb-4">
          Criado em: {flashcardRevisao.dataCriacao}
        </h4>
      </div>

      <h5 className="text-warning">Frente:</h5>

      <div className="bg-light text-dark rounded p-3">
        {flashcardRevisao.frente}
      </div>

      <div
        className={`${!mostrarVerso ? "d-flex" : "d-none"} justify-content-center mt-4`}
      >
        <button
          className="btn btn-info fw-semibold"
          onClick={() => setMostrarVerso(true)}
        >
          Mostrar Verso
        </button>
      </div>

      <div className={mostrarVerso ? "d-block" : "d-none"}>
        <h5 className="text-warning mt-4">Verso:</h5>

        <div className="bg-light text-dark rounded p-3">
          {flashcardRevisao.verso}
        </div>

        {erro && (
          <div className="alert alert-danger mt-3" role="alert">
            {erro}
          </div>
        )}

        <div className="d-flex justify-content-between mt-4">
          <button
            type="button"
            className="btn btn-danger fw-semibold"
            onClick={() => RegistrarRevisao("erro")}
          >
            Errei
          </button>

          <button
            type="button"
            className="btn btn-success fw-semibold"
            onClick={() => RegistrarRevisao("acerto")}
          >
            Acertei
          </button>
        </div>
      </div>
      <button
        className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
        onClick={() => setFlashcardRevisao(null)}
      ></button>
    </div>
  );
}
