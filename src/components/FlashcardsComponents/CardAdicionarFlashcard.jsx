import { useState } from "react";

import { criarFlashcard } from "../../services/flashcardService";

export default function CardAdicionarFlashcard({
  materia,
  setAdicionandoFlashcard,
  setAtualizarFlashcards,
}) {
  const [dadosFlashcard, setDadosFlashcard] = useState({
    frente: "",
    verso: "",
  });

  const [erro, setErro] = useState("");

  async function AdicionarFlashcard() {
    //Este if está validando somente no frontend, para que não precise fazer uma requisição desnecessária ao backend
    if (
      dadosFlashcard.frente.trim() === "" ||
      dadosFlashcard.verso.trim() === ""
    ) {
      setErro(
        "Alguma informação está faltando. (O frontend impediu o envio de uma requisição desnecessária ao servidor backend.)",
      );
      return;
    }

    try {
      setErro("");

      const flashcardTratado = {
        //Essa váriavel evita que um input seja salvo sem padronização. Ex: frente: "    O que é....?  ", verso: "   sdfasf...", etc
        frente: dadosFlashcard.frente.trim(),
        verso: dadosFlashcard.verso.trim(),
      };

      await criarFlashcard(
        flashcardTratado.frente,
        flashcardTratado.verso,
        materia.id,
      );

      setAtualizarFlashcards((valorAtual) => valorAtual + 1);

      setAdicionandoFlashcard(false);
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

      {erro && (
        <div className="alert alert-danger mt-3" role="alert">
          {erro}
        </div>
      )}

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
