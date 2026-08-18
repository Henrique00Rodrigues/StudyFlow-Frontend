export default function BotaoRemover({
  tarefaSelecionada,
  setTarefaSelecionada,
}) {
  function RemoverTarefa() {
    if (
      confirm(
        `Tem certeza que deseja remover essa tarefa? ${JSON.stringify(tarefaSelecionada)}`,
      )
    ) {
      alert(`Removendo tarefa: ${JSON.stringify(tarefaSelecionada)}`);
      setTarefaSelecionada(null); //Fecha o card de edição de tarefa
    } else {
      alert("Foi recusado.");
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
