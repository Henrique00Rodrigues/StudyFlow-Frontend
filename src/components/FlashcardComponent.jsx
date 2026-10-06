import { useEffect, useState } from "react";

import CardEditarFlashcards from "./FlashcardsComponents/CardEditarFlashcard";
import CardRevisarFlashcard from "./FlashcardsComponents/CardRevisarFlashcard";

import { listarFlashcardsMateria } from "../services/flashcardService";

export default function FlashcardComponent({
  materia,
  atualizarFlashcards,
  setAtualizarFlashcards,
}) {
  const [flashcards, setFlashcards] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [flashcardSelecionado, setFlashcardSelecionado] = useState(null);
  const [flashcardRevisao, setFlashcardRevisao] = useState(null);

  useEffect(() => {
    async function carregarFlashcards() {
      try {
        setErro("");

        const resultado = await listarFlashcardsMateria(materia.id);

        setFlashcards(resultado);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarFlashcards();
  }, [materia.id, atualizarFlashcards]);

  if (carregando) {
    return <p className="text-white mt-5">Carregando flashcards...</p>;
  }

  if (erro) {
    return (
      <div className="alert alert-danger mt-5" role="alert">
        {erro}
      </div>
    );
  }

  return (
    <>
      <div className="d-flex flex-wrap">
        {flashcards.length > 0 ? (
          flashcards.map((flashcard) => {
            const textoLimitado =
              flashcard.frente.length > 70
                ? `${flashcard.frente.slice(0, 70)}...`
                : flashcard.frente;

            return (
              <div
                key={flashcard.id}
                className="mt-5 ms-5 text-black border border-3 border-black rounded d-flex flex-column"
                style={{
                  width: "200px",
                  height: "200px",
                  background: "linear-gradient(120deg, #175bae, #8205a8)",
                }}
              >
                <div className="d-flex justify-content-center pt-3 ps-2 pe-2 text-white fw-semibold">
                  {textoLimitado}
                </div>

                <div className="d-flex justify-content-around mt-auto mb-3">
                  <button
                    className="btn btn-danger border border-2 border-black d-flex justify-content-center align-items-center"
                    style={{
                      width: "80px",
                      height: "30px",
                    }}
                    onClick={() => setFlashcardRevisao(flashcard)}
                  >
                    REVISAR
                  </button>

                  <button
                    className="btn btn-dark border border-2 border-black d-flex justify-content-center align-items-center rounded-circle"
                    style={{
                      width: "40px",
                      height: "40px",
                    }}
                    onClick={() => setFlashcardSelecionado(flashcard)}
                  >
                    ✏️
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <h1 className="text-danger mx-auto" style={{ marginTop: "12rem" }}>
            Vazio... ;P
          </h1>
        )}
      </div>

      {flashcardRevisao && (
        <CardRevisarFlashcard
          flashcardRevisao={flashcardRevisao}
          setFlashcardRevisao={setFlashcardRevisao}
          materia={materia}
        />
      )}

      {flashcardSelecionado && (
        <CardEditarFlashcards
          flashcardSelecionado={flashcardSelecionado}
          setFlashcardSelecionado={setFlashcardSelecionado}
          setAtualizarFlashcards={setAtualizarFlashcards}
        />
      )}
    </>
  );
}
