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
        <div
          className="d-flex flex-column align-items-center bg-warning rounded mt-4"
          style={{
            width: "90%",
            height: "100px",
          }}
        >
          <div className="fw-semibold">Título</div>
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
            Descrição: Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Aperiam iste voluptatibus molestias blanditiis reiciendis
            consectetur assumenda, iure, sit veritatis quaerat officiis non
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda
            id nesciunt dolores exercitationem labore, optio earum rem excepturi
            quam accusamus quidem dolore doloremque consequuntur odio sequi
            quaerat nobis magnam ad. KKKKKKK
          </div>
        </div>
      </div>
    </main>
  );
}
