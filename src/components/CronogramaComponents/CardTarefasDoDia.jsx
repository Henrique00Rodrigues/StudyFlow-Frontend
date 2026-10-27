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

      {diaSelecionado.tarefas.length > 0 && (
        <div>
          <h4 className="text-secondary mb-3">Tarefas</h4>

          {diaSelecionado.tarefas.map((tarefa) => (
            <div
              key={tarefa.id}
              className="border border-secondary rounded p-3 mb-3"
            >
              <h5
                className={`${
                  tarefa.concluida
                    ? "text-success"
                    : tarefa.dataEntrega.slice(0, 10) < dataHoje
                      ? "text-danger"
                      : "text-warning"
                } d-flex justify-content-between`}
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
        </div>
      )}

      {diaSelecionado.atividade && (
        <div className="mt-4">
          <h4 className="text-primary mb-3">Histórico de atividades</h4>

          <div className="border border-primary rounded p-3">
            <p className="mb-2">
              Flashcards revisados:{" "}
              <strong>{diaSelecionado.atividade.flashcardsRevisados}</strong>
            </p>

            <p className="mb-2">
              Flashcards criados:{" "}
              <strong>{diaSelecionado.atividade.flashcardsCriados}</strong>
            </p>

            {diaSelecionado.atividade.flashcardsCriadosExcluidos > 0 && (
              <p className="mb-0 text-secondary">
                {diaSelecionado.atividade.flashcardsCriadosExcluidos} desses
                flashcards foram excluídos posteriormente.
              </p>
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
        onClick={() => setDiaSelecionado(null)}
      ></button>
    </div>
  );
}
