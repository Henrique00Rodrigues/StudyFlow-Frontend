export default function BotaoSalvar({ props, setTarefaSelecionada }) {
  function SalvarTarefa() {
    if (
      props.titulo.trim() === "" ||
      props.descricao.trim() === "" ||
      props.prioridade.trim() === "" ||
      props.dataCriacao === "" ||
      props.dataEntrega === ""
    ) {
      alert("Alguma informação está faltando");
    } else if (
      props.prioridade.trim().toLowerCase() !== "alta" &&
      props.prioridade.trim().toLowerCase() !== "média" &&
      props.prioridade.trim().toLowerCase() !== "baixa"
    ) {
      alert("A prioriadade precisa ser: Alta/Média/Baixa");
    } else {
      const tarefaTratada = {
        //Essa váriavel evita que um input seja salvo sem padronização. Ex: titulo: "    Hey  ", prioridade: "   ALta", etc
        ...props,
        titulo: props.titulo.trim(),
        descricao: props.descricao.trim(),
        prioridade: props.prioridade.trim().toLowerCase(),
      };
      alert(`Salvando tarefa: ${JSON.stringify(tarefaTratada)}`);
      setTarefaSelecionada(null); //Fecha o card se estiver tudo correto na hora de Salvar a tarefa modificada.import { useState } from "react";
    }
  }
  return (
    <button className="btn btn-primary fw-semibold px-4" onClick={SalvarTarefa}>
      Salvar
    </button>
  );
}
