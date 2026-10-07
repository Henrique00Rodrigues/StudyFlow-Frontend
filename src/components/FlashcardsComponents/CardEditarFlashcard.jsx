import { useState } from "react";
import BotaoSalvarFlashcard from "./BotaoSalvarFlashcard";
import BotaoRemoverFlashcard from "./BotaoRemoverFlashcard";

export default function CardEditarFlashcards({
  flashcardSelecionado,
  setFlashcardSelecionado,
  setAtualizarFlashcards,
  setMensagemSucesso,
}) {
  const [flashcardModificado, setFlashcardModificado] = useState({
    ...flashcardSelecionado,
  });

  const [erro, setErro] = useState("");

  return (
    <div
      className="position-fixed translate-middle top-50 start-50 bg-dark border border-3 border-black rounded p-4 text-warning fw-semibold"
      style={{
        width: "90%",
        maxWidth: "700px",
        zIndex: 1050,
      }}
    >
      <h5>Frente:</h5>

      <textarea
        className="form-control"
        rows={3}
        value={flashcardModificado.frente}
        onChange={(ev) =>
          setFlashcardModificado({
            ...flashcardModificado,
            frente: ev.target.value,
          })
        }
      />

      <h5 className="mt-4">Verso:</h5>

      <textarea
        className="form-control"
        rows={3}
        value={flashcardModificado.verso}
        onChange={(ev) =>
          setFlashcardModificado({
            ...flashcardModificado,
            verso: ev.target.value,
          })
        }
      />

      {erro && (
        <div className="alert alert-danger mt-3" role="alert">
          {erro}
        </div>
      )}

      <div className="d-flex gap-2 mt-4">
        <BotaoSalvarFlashcard
          flashcardModificado={flashcardModificado}
          setFlashcardSelecionado={setFlashcardSelecionado}
          setAtualizarFlashcards={setAtualizarFlashcards}
          setErro={setErro}
          setMensagemSucesso={setMensagemSucesso}
        />
        <BotaoRemoverFlashcard
          flashcardSelecionado={flashcardSelecionado}
          setFlashcardSelecionado={setFlashcardSelecionado}
        />
      </div>

      <button
        className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
        onClick={() => setFlashcardSelecionado(null)}
      ></button>
    </div>
  );
}
