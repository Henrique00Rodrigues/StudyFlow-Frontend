import { atualizarTarefa } from "../../services/tarefaService";

export default function BotaoSalvar({
  tarefaModificada,
  setTarefaSelecionada,
  setAtualizarTarefas,
  setMensagemSucesso,
  setErro,
}) {
  async function SalvarTarefa() {
    if (
      tarefaModificada.titulo.trim() === "" ||
      tarefaModificada.descricao.trim() === "" ||
      tarefaModificada.prioridade.trim() === "" ||
      tarefaModificada.dataEntrega === ""
    ) {
      setErro(
        "Alguma informação está faltando. (O frontend impediu o envio de uma requisição desnecessária ao servidor backend.)",
      );
      return;
    }

    const prioridadeDigitada = tarefaModificada.prioridade.trim().toLowerCase();

    const prioridadeTratada =
      prioridadeDigitada === "média" ? "media" : prioridadeDigitada;

    if (
      prioridadeTratada !== "alta" &&
      prioridadeTratada !== "media" &&
      prioridadeTratada !== "baixa"
    ) {
      setErro("A prioridade precisa ser: Alta, Média ou Baixa.");
      return;
    }

    try {
      setErro("");

      const tarefaTratada = {
        ...tarefaModificada,
        titulo: tarefaModificada.titulo.trim(),
        descricao: tarefaModificada.descricao.trim(),
        prioridade: prioridadeTratada,
      };

      await atualizarTarefa(
        tarefaTratada.id,
        tarefaTratada.titulo,
        tarefaTratada.descricao,
        tarefaTratada.prioridade,
        tarefaTratada.concluida,
        tarefaTratada.dataEntrega,
      );

      setMensagemSucesso("Alteração realizada.");

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
    <button className="btn btn-primary fw-semibold px-4" onClick={SalvarTarefa}>
      Salvar
    </button>
  );
}
