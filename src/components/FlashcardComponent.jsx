import { useEffect, useState } from "react";

import CardEditarFlashcards from "./FlashcardsComponents/CardEditarFlashcard";
import CardRevisarFlashcard from "./FlashcardsComponents/CardRevisarFlashcard";

import { listarFlashcardsMateria } from "../services/flashcardService";

export default function FlashcardComponent({
  materia,
  atualizarFlashcards,
  setAtualizarFlashcards,
  setMensagemSucesso,
}) {
  const [flashcards, setFlashcards] = useState([]); //Armazenamento de flashcards
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [flashcardSelecionado, setFlashcardSelecionado] = useState(null);
  const [flashcardRevisao, setFlashcardRevisao] = useState(null);

  const [filtro, setFiltro] = useState("revisar");

  const [agora, setAgora] = useState(new Date()); //Representa o horário que a interface está usando no momento atual

  // Função que verifica se o flashcard está disponível para ser revisado no momento atual.
  function FlashcardDisponivel(flashcard, horarioAtual = new Date()) {
    if (!flashcard.proximaRevisao) {
      return true;
    }

    return new Date(flashcard.proximaRevisao) <= horarioAtual;
  }

  const flashcardsFiltrados = flashcards.filter((flashcard) => {
    if (filtro === "todos") {
      return true;
    }

    if (filtro === "revisar") {
      return FlashcardDisponivel(flashcard, agora);
    }

    if (filtro === "revisados") {
      if (!flashcard.dataUltimaRevisao || !flashcard.proximaRevisao) {
        return false;
      }

      return !FlashcardDisponivel(flashcard, agora);
    }

    return true;
  });

  //Atualiza o horário (estado 'agora') da interface duas vezes por segundo, deste modo, fazendo com que o React renderize o componente da página constantemente
  useEffect(() => {
    let milisegundos = 500;
    const intervalo = setInterval(() => {
      setAgora(new Date());

      console.log(`${milisegundos}ms se passaram.`);
      milisegundos += 500;
    }, 500);

    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    async function carregarFlashcards() {
      try {
        setErro("");

        const resultado = await listarFlashcardsMateria(materia.id); //Atualiza oficialmente os flashcards.

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
      <div className="d-flex gap-3 mt-4">
        <button
          type="button"
          className={`btn ${
            filtro === "revisar" ? "btn-warning" : "btn-secondary"
          }`}
          onClick={() => setFiltro("revisar")}
        >
          A revisar
        </button>

        <button
          type="button"
          className={`btn ${
            filtro === "revisados" ? "btn-success" : "btn-secondary"
          }`}
          onClick={() => setFiltro("revisados")}
        >
          Revisados
        </button>

        <button
          type="button"
          className={`btn ${
            filtro === "todos" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => setFiltro("todos")}
        >
          Todos
        </button>
      </div>

      <div className="d-flex flex-wrap">
        {flashcardsFiltrados.length > 0 ? (
          flashcardsFiltrados.map((flashcard) => {
            const disponivel = FlashcardDisponivel(flashcard, agora); //Utilizado para desabilitar o botão de revisar quando os flashcards não estiverem disponíveis para revisão no momento atual.

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
                    disabled={!disponivel}
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
            Nenhum flashcard neste filtro.
          </h1>
        )}
      </div>

      {flashcardRevisao && (
        <CardRevisarFlashcard
          flashcardRevisao={flashcardRevisao}
          setFlashcardRevisao={setFlashcardRevisao}
          flashcards={flashcards}
          setAtualizarFlashcards={setAtualizarFlashcards}
          FlashcardDisponivel={FlashcardDisponivel}
        />
      )}

      {flashcardSelecionado && (
        <CardEditarFlashcards
          flashcardSelecionado={flashcardSelecionado}
          setFlashcardSelecionado={setFlashcardSelecionado}
          setAtualizarFlashcards={setAtualizarFlashcards}
          setMensagemSucesso={setMensagemSucesso}
        />
      )}
    </>
  );
}
