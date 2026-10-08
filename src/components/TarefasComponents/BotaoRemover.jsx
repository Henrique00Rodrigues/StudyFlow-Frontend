import { removerTarefa } from "../../services/tarefaService";

export default function BotaoRemover({
  tarefaSelecionada,
  setTarefaSelecionada,
  setAtualizarTarefas,
  setMensagemSucesso,
  setErro,
}) {
  async function RemoverTarefa() {
    const confirmacao = window.confirm(
      `Tem certeza que deseja remover a tarefa "${tarefaSelecionada.titulo}"?`,
    );

    if (!confirmacao) {
      return;
    }

    try {
      setErro("");

      await removerTarefa(tarefaSelecionada.id);

      setMensagemSucesso("Tarefa removida com sucesso.");

      setTimeout(() => {
        setMensagemSucesso("");
      }, 3000);

      setAtualizarTarefas((valorAtual) => valorAtual + 1);

      setTarefaSelecionada(null);
    } catch (error) {
      setErro(error.message);
    }
  }

  return (
    <button
      type="button"
      className="btn btn-danger fw-semibold px-4"
      onClick={RemoverTarefa}
    >
      Remover
    </button>
  );
}
