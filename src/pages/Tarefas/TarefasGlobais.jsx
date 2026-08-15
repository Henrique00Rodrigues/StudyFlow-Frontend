import dados from "../../data/db.json";
import CardTarefasGlobais from "../../components/CardTarefasGlobais";

export default function TarefasGlobais() {
  const tarefas = dados.materias.flatMap((materia) => materia.tarefas ?? []);

  console.log(tarefas);

  return (
    <main className="d-flex flex-column align-items-center">
      <h1 className="text-white">Tarefas Globais</h1>
      <CardTarefasGlobais props={tarefas} />
    </main>
  );
}
