import { useParams } from "react-router-dom";
import buscarMateriaPorId from "../../utils/FindMateriaFunction";

export default function TarefasMateria() {
  const { materiaId } = useParams();

  const materia = buscarMateriaPorId(materiaId);

  if (!materia) {
    return (
      <div className="d-flex flex-column align-items-center mt-5">
        <h1 className="text-danger">Matéria não encontrada...</h1>
      </div>
    );
  }

  return (
    <main className="d-flex flex-column align-items-center">
      <h1 className="text-white">
        Hey, esta é a página de tarefas de {materia.nome}
      </h1>
      <div className="d-flex flex-column align-items-center w-100">
        {materia.tarefas?.length > 0
          ? materia.tarefas.map((tarefa) => {
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
          : null}
      </div>
    </main>
  );
}
