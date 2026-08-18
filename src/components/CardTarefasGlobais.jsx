export default function CardTarefasGlobais({ tarefas }) {
  return (
    <div className="d-flex flex-column align-items-center w-100">
      {tarefas.length > 0 ? (
        tarefas.map((tarefa) => {
          const textoLimitado =
            tarefa.descricao.length > 300
              ? `${tarefa.descricao.slice(0, 300)}...`
              : tarefa.descricao;
          return (
            <div
              key={tarefa.id}
              className="d-flex flex-column align-items-center bg-warning rounded mt-4"
              style={{
                width: "90%",
                height: "100px",
              }}
            >
              <div className="fw-semibold">{tarefa.titulo}</div>
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
