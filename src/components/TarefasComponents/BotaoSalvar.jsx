export default function BotaoSalvar({ props }) {
  function SalvarTarefa() {
    if (
      props.prioridade.trim().toLowerCase() !== "alta" &&
      props.prioridade.trim().toLowerCase() !== "média" &&
      props.prioridade.trim().toLowerCase() !== "baixa"
    ) {
      alert("A prioriadade precisa ser: Alta/Média/Baixa");
    } else {
      alert(`Salvando tarefa: ${JSON.stringify(props)}`);
    }
  }
  return (
    <button
      type="submit"
      className="btn btn-primary fw-semibold px-4"
      onClick={SalvarTarefa}
    >
      Salvar
    </button>
  );
}
