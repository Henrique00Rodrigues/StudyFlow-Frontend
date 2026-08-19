export default function BotaoSalvarFlashcard({
  flashcardModificado,
  setFlashcardSelecionado,
}) {
  function SalvarAlteracao() {
    if (
      flashcardModificado.frente.trim() === "" ||
      flashcardModificado.verso.trim() === ""
    ) {
      alert("Alguma informação está faltando");
    } else {
      const flashcardTratado = {
        //Tratando o flashcard para não salvar espaços desnecessários.
        ...flashcardModificado,
        frente: flashcardModificado.frente.trim(),
        verso: flashcardModificado.verso.trim(),
      };
      alert(`Salvando flashcard: ${JSON.stringify(flashcardTratado)}`);

      //Futuramente: atualizar o flashcard na lista ou no backend
      //Vai ser uma função mais ou menos assim: atualizarFlashcard(flashcardTratado)

      setFlashcardSelecionado(null); //Fecha o card de edição
    }
  }

  return (
    <button className="btn btn-primary" onClick={SalvarAlteracao}>
      Salvar
    </button>
  );
}
