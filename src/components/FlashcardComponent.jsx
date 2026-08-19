import { useState } from "react";
import CardEditarFlashcards from "./FlashcardsComponents/CardEditarFlashcard";

export default function FlashcardComponent({ materia }) {
  const [flashcardSelecionado, setFlashcardSelecionado] = useState(null);
  return (
    <>
      <div className="d-flex flex-wrap">
        {materia.flashcards?.length > 0 ? (
          materia.flashcards.map((flashcard) => {
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

      {flashcardSelecionado && (
        <CardEditarFlashcards
          flashcardSelecionado={flashcardSelecionado}
          setFlashcardSelecionado={setFlashcardSelecionado}
        />
      )}
    </>
  );
}
