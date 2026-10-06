import { atualizarFlashcard } from "../../services/flashcardService";

export default function BotaoSalvarFlashcard({
  flashcardModificado,
  setFlashcardSelecionado,
  setAtualizarFlashcards,
  setErro,
}) {
  async function SalvarAlteracao() {
    if (
      flashcardModificado.frente.trim() === "" ||
      flashcardModificado.verso.trim() === ""
    ) {
      setErro(
        "Alguma informação está faltando. (O frontend impediu o envio de uma requisição desnecessária ao servidor backend.)",
      );
      return;
    }

    try {
      setErro("");

      const flashcardTratado = {
        ...flashcardModificado,
        frente: flashcardModificado.frente.trim(),
        verso: flashcardModificado.verso.trim(),
      };

      await atualizarFlashcard(
        flashcardTratado.id,
        flashcardTratado.frente,
        flashcardTratado.verso,
      );

      setAtualizarFlashcards((valorAtual) => valorAtual + 1);

      setFlashcardSelecionado(null);
    } catch (error) {
      setErro(error.message);
    }
  }

  return (
    <button className="btn btn-primary" onClick={SalvarAlteracao}>
      Salvar
    </button>
  );
}
