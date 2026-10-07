import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import FlashcardComponent from "../components/FlashcardComponent";
import CardAdicionarFlashcard from "../components/FlashcardsComponents/CardAdicionarFlashcard";

import { buscarMateriaPorId } from "../services/materiaService";

export default function Flashcards() {
  const { materiaId } = useParams();

  const [materia, setMateria] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [adicionandoFlashcard, setAdicionandoFlashcard] = useState(false);

  const [mensagemSucesso, setMensagemSucesso] = useState("");

  // Contador usado como sinal para recarregar a lista de flashcards após alguma alteração, evitando, dessa forma, uma atualização manual com F5.
  const [atualizarFlashcards, setAtualizarFlashcards] = useState(0);

  useEffect(() => {
    async function carregarMateria() {
      try {
        setErro("");

        const resultado = await buscarMateriaPorId(materiaId);

        setMateria(resultado);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarMateria();
  }, [materiaId]);

  if (carregando) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <p className="text-white">Carregando matéria...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="d-flex flex-column align-items-center mt-5">
        <h1 className="text-danger">{erro}</h1>
      </div>
    );
  }

  if (!materia) {
    return (
      <div className="d-flex flex-column align-items-center mt-5">
        <h1 className="text-danger">Matéria não encontrada...</h1>
      </div>
    );
  }

  return (
    <main className="d-flex flex-column align-items-center">
      {mensagemSucesso && (
        <div
          className="alert alert-success bg-success position-fixed top-0 start-50 fw-semibold translate-middle-x mt-3 mensagem-sucesso"
          style={{ zIndex: 2000 }}
          role="alert"
        >
          {mensagemSucesso}
        </div>
      )}

      <h1 className="text-white">Flashcards de {materia.nome}</h1>
      <FlashcardComponent
        materia={materia}
        atualizarFlashcards={atualizarFlashcards}
        setAtualizarFlashcards={setAtualizarFlashcards}
        setMensagemSucesso={setMensagemSucesso}
      />
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
          setAtualizarFlashcards={setAtualizarFlashcards}
          setMensagemSucesso={setMensagemSucesso}
        />
      )}
    </main>
  );
}
