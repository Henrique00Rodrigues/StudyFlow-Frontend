export default function BotaoRemover({ tarefa }) {
  function RemoverTarefa() {
    if (
      confirm(
        `Tem certeza que deseja remover essa tarefa? ${JSON.stringify(tarefa)}`,
      )
    ) {
      alert(`Removendo tarefa: ${JSON.stringify(tarefa)}`);
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
