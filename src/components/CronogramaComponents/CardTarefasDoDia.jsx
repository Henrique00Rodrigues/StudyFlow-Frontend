export default function CardTarefasDoDia({
  diaSelecionado,
  setDiaSelecionado,
  meses,
}) {
  const hoje = new Date();

  const dataHoje = `${hoje.getFullYear()}-${String(
    hoje.getMonth() + 1,
  ).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;

  return (
    <div
      className="position-fixed translate-middle top-50 start-50 bg-dark border border-3 border-black rounded p-4 text-white overflow-auto"
      style={{
        width: "90%",
        maxWidth: "700px",
        maxHeight: "90vh",
        zIndex: 1050,
      }}
    >
      <h3 className="text-light mb-4">
        {diaSelecionado.dia} de {meses[diaSelecionado.mes]} de{" "}
        {diaSelecionado.ano}
      </h3>

      {diaSelecionado.tarefas.map((tarefa) => (
        <div
          key={tarefa.id}
          className="border border-secondary rounded p-3 mb-3"
        >
          <h5
            className={`${tarefa.concluida ? "text-success" : !tarefa.concluida && tarefa.dataEntrega.slice(0, 10) < dataHoje ? "text-danger" : "text-warning"} d-flex justify-content-between`}
          >
            {tarefa.titulo}
            <span className="text-white">
              {tarefa.concluida
                ? "Concluído"
                : tarefa.dataEntrega.slice(0, 10) < dataHoje
                  ? "Vencido"
                  : "Pendente"}
            </span>
          </h5>
        </div>
      ))}

      <button
        type="button"
        className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
        onClick={() => setDiaSelecionado(null)}
      ></button>
    </div>
  );
}
