import { useState } from "react";

export default function CardRevisarFlashcard({
  flashcardRevisao,
  setFlashcardRevisao,
  materia,
}) {
  const [mostrarVerso, setMostrarVerso] = useState(false);

  function AcharProximoFlashcard(id) {
    const indiceAtual = materia.flashcards.findIndex(
      (flashcard) => flashcard.id === id,
    );
    // No futuro irá mudar. Eu vou precisar achar o próximo flashcard DISPONÍVEL. Tendo em vista que, muitos estarão indisponíveis por conta da repetição espaçada.
    return materia.flashcards[indiceAtual + 1];
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

        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-danger fw-semibold"
            onClick={() => {
              alert(
                `Você errou o flashcard ${flashcardRevisao.id} da matéria de ${materia.nome}`,
              ); //Futuramente será substituido por uma função que virá da classe Flashcards em POO

              const proximoFlashcard = AcharProximoFlashcard(
                flashcardRevisao.id,
              );

              if (proximoFlashcard) {
                setFlashcardRevisao(proximoFlashcard);
                setMostrarVerso(false);
              } else {
                alert(
                  `Seus flashcards dessa matéria de ${materia.nome} acabaram!`,
                );
                setFlashcardRevisao(null);
              }
            }}
          >
            Errei
          </button>

          <button
            className="btn btn-success fw-semibold"
            onClick={() => {
              alert(
                `Você acertou o flashcard ${flashcardRevisao.id} da matéria de ${materia.nome}`,
              ); //Futuramente será substituido por uma função que virá da classe Flashcards em POO

              const proximoFlashcard = AcharProximoFlashcard(
                flashcardRevisao.id,
              );

              if (proximoFlashcard) {
                setFlashcardRevisao(proximoFlashcard);
                setMostrarVerso(false);
              } else {
                alert(
                  `Seus flashcards dessa matéria de ${materia.nome} acabaram!`,
                );
                setFlashcardRevisao(null);
              }
            }}
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
