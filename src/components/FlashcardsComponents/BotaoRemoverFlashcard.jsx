export default function BotaoRemoverFlashcard({
  flashcardSelecionado,
  setFlashcardSelecionado,
}) {
  function RemoverFlashcard() {
    if (
      confirm(
        `Deseja remover este flashcard? ${JSON.stringify(
          flashcardSelecionado,
        )}`,
      )
    ) {
      alert(`Removendo flashcard: ${JSON.stringify(flashcardSelecionado)}`);
      setFlashcardSelecionado(null);
    } else {
      alert("Foi recusado.");
    }
  }

  return (
    <button className="btn btn-danger" onClick={RemoverFlashcard}>
      Remover
    </button>
  );
}
