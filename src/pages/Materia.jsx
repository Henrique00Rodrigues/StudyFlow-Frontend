import { useParams } from "react-router-dom";
import dados from "../data/db.json";

export default function Materia() {
  const { id } = useParams();

  const materia = dados.materias.find((materia) => materia.id === +id);
  const text = materia.flashcards.find(
    (flashcard) => flashcard.id === 1,
  ).frente;

  const textLimitado = text.length > 10 ? `${text.slice(0, 10)}...` : text;
  console.log(textLimitado);

  return (
    <main>
      <div className="d-flex justify-content-center mt-2">
        <div className="bg-warning w-auto d-inline-block p-2 rounded">
          <h1 className="text-black mt-0">{materia.nome}</h1>
        </div>
      </div>

      {/*Agora, os flashcards */}

      <div
        className="mt-5 ms-5 text-black border border-3 border-black rounded"
        style={{
          width: "200px",
          height: "200px",
          background: "linear-gradient(120deg, #175bae, #8205a8)",
        }}
      >
        <div className="d-flex justify-content-center pt-3 ps-2 pe-2 text-white fw-semibold">
          {textLimitado}
        </div>
        <div
          className="d-flex justify-content-around"
          style={{ marginTop: "80px" }}
        >
          <button
            className="btn btn-danger border border-2 border-black d-flex justify-content-center align-items-center"
            style={{
              width: "80px",
              height: "30px",
              marginTop: "5px",
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
          >
            ✏️
          </button>
        </div>
      </div>
    </main>
  );
}
