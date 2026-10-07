import { removerFlashcard } from "../../services/flashcardService";

export default function BotaoRemoverFlashcard({
  flashcardSelecionado,
  setFlashcardSelecionado,
  setAtualizarFlashcards,
  setMensagemSucesso,
  setErro,
}) {
  async function RemoverFlashcard() {
    const confirmacao = window.confirm(
      `Deseja remover este flashcard? ${JSON.stringify(flashcardSelecionado)}`,
    );

    if (!confirmacao) {
      return;
    }

    try {
      setErro("");

      await removerFlashcard(flashcardSelecionado.id);

      setMensagemSucesso("Flashcard removido com sucesso.");

      setTimeout(() => {
        setMensagemSucesso("");
      }, 3000);

      setAtualizarFlashcards((valorAtual) => valorAtual + 1);

      setFlashcardSelecionado(null);
    } catch (error) {
      setErro(error.message);
    }
  }

  return (
    <button className="btn btn-danger" onClick={RemoverFlashcard}>
      Remover
    </button>
  );
}
