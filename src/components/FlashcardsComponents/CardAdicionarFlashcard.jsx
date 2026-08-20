import { useState } from "react";

export default function CardAdicionarFlashcard({
  materia,
  setAdicionandoFlashcard,
}) {
  const [dadosFlashcard, setDadosFlashcard] = useState({
    frente: "",
    verso: "",
  });

  function AdicionarFlashcard() {
    if (
      dadosFlashcard.frente.trim() === "" ||
      dadosFlashcard.verso.trim() === ""
    ) {
      alert("Alguma informação está faltando");
    } else {
      const flashcardTratado = {
        //Essa váriavel evita que um input seja salvo sem padronização. Ex: frente: "    O que é....?  ", verso: "   sdfasf...", etc
        ...dadosFlashcard,
        frente: dadosFlashcard.frente.trim(),
        verso: dadosFlashcard.verso.trim(),
      };
      alert(
        `Adicionando flashcard na matéria ${materia.nome}:  ${JSON.stringify(flashcardTratado)}`,
      );
      // Futuramente:
      // criar objeto Flashcard
      // associar à materia
      // salvar no backend
      setAdicionandoFlashcard(false);
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
      <h5 className="text-warning">Frente:</h5>

      <input
        className="form-control"
        type="text"
        value={dadosFlashcard.frente}
        onChange={(ev) =>
          setDadosFlashcard({
            ...dadosFlashcard,
            frente: ev.target.value,
          })
        }
      />

      <h5 className="text-warning mt-4">Verso:</h5>

      <textarea
        className="form-control"
        rows={2}
        value={dadosFlashcard.verso}
        onChange={(ev) =>
          setDadosFlashcard({
            ...dadosFlashcard,
            verso: ev.target.value,
          })
        }
      />

      <div className="mt-4">
        <button
          type="button"
          className="btn btn-primary fw-semibold px-4"
          onClick={AdicionarFlashcard}
        >
          Adicionar
        </button>
      </div>

      <button
        type="button"
        className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
        onClick={() => setAdicionandoFlashcard(false)}
      />
    </div>
  );
}
