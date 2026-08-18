export default function BotaoSalvar({
  tarefaModificada,
  setTarefaSelecionada,
}) {
  function SalvarTarefa() {
    if (
      tarefaModificada.titulo.trim() === "" ||
      tarefaModificada.descricao.trim() === "" ||
      tarefaModificada.prioridade.trim() === "" ||
      tarefaModificada.dataCriacao === "" ||
      tarefaModificada.dataEntrega === ""
    ) {
      alert("Alguma informação está faltando");
    } else if (
      tarefaModificada.prioridade.trim().toLowerCase() !== "alta" &&
      tarefaModificada.prioridade.trim().toLowerCase() !== "média" &&
      tarefaModificada.prioridade.trim().toLowerCase() !== "baixa"
    ) {
      alert("A prioriadade precisa ser: Alta/Média/Baixa");
    } else {
      const tarefaTratada = {
        //Essa váriavel evita que um input seja salvo sem padronização. Ex: titulo: "    Hey  ", prioridade: "   ALta", etc
        ...tarefaModificada,
        titulo: tarefaModificada.titulo.trim(),
        descricao: tarefaModificada.descricao.trim(),
        prioridade: tarefaModificada.prioridade.trim().toLowerCase(),
      };
      alert(`Salvando tarefa: ${JSON.stringify(tarefaTratada)}`);
      setTarefaSelecionada(tarefaTratada); //Substitui os dados da tarefa original, pelos dados da tarefaEditada que está sendo salva.

      setTarefaSelecionada(null); //Fecha o card de edição de tarefa
    }
  }
  return (
    <button className="btn btn-primary fw-semibold px-4" onClick={SalvarTarefa}>
      Salvar
    </button>
  );
}
