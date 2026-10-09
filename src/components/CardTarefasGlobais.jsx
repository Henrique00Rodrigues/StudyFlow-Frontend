export default function CardTarefasGlobais({ tarefasFiltradas }) {
  const hoje = new Date();

  const dataHoje = `${hoje.getFullYear()}-${String(
    hoje.getMonth() + 1,
  ).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;

  return (
    <div className="d-flex flex-column align-items-center w-100">
      {tarefasFiltradas.length > 0 ? (
        tarefasFiltradas.map((tarefa) => {
          const [ano, mes, dia] = tarefa.dataEntrega.slice(0, 10).split("-");

          const dataEntregaFormatada = `${dia}/${mes}/${ano}`;

          const nomeMateriaLimitado =
            tarefa.materia.nome.length > 20
              ? `${tarefa.materia.nome.slice(0, 20)}...`
              : tarefa.materia.nome;

          const tituloLimitado =
            tarefa.titulo.length > 40
              ? `${tarefa.titulo.slice(0, 40)}...`
              : tarefa.titulo;

          const textoLimitado =
            tarefa.descricao.length > 260
              ? `${tarefa.descricao.slice(0, 260)}...`
              : tarefa.descricao;

          const tarefaVencida =
            !tarefa.concluida && tarefa.dataEntrega.slice(0, 10) < dataHoje;

          const corCard = tarefa.concluida
            ? "bg-success"
            : tarefaVencida
              ? "bg-danger"
              : "bg-warning";

          const corTexto = tarefa.concluida
            ? "text-dark"
            : tarefaVencida
              ? "text-warning"
              : "text-secondary";

          return (
            <div
              key={tarefa.id}
              className={`d-flex flex-column align-items-center position-relative ${corCard} rounded mt-4`}
              style={{
                width: "90%",
                height: "100px",
                overflow: "hidden",
              }}
            >
              <div className="position-absolute top-0 end-0 me-4 mt-1 fw-semibold">
                {dataEntregaFormatada}
              </div>
              <div
                className="fw-semibold"
                style={{
                  maxWidth: "48%",
                  overflowWrap: "anywhere",
                  wordBreak: "break-word",
                }}
              >
                {tituloLimitado}
              </div>
              <div className={`${corTexto} fw-bold`}>
                Matéria: {nomeMateriaLimitado}
              </div>
              <hr
                className="border-dark border my-0 opacity-100 rounded"
                style={{
                  width: "95%",
                }}
              />
              <div
                className="fw-semibold"
                style={{
                  width: "95%",
                  overflowWrap: "anywhere",
                  wordBreak: "break-word",
                }}
              >
                {textoLimitado}
              </div>
            </div>
          );
        })
      ) : (
        <h1 className="text-danger mx-auto" style={{ marginTop: "12rem" }}>
          Vazio... ;P
        </h1>
      )}
    </div>
  );
}
