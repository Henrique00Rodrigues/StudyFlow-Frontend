import { useEffect, useState } from "react";

import CardTarefasGlobais from "../../components/CardTarefasGlobais";

import { listarTarefas } from "../../services/tarefaService";

export default function TarefasGlobais() {
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  // const tarefas = dados.materias.flatMap((materia) => materia.tarefas ?? []);

  useEffect(() => {
    async function carregarTarefas() {
      try {
        setErro("");

        const resultado = await listarTarefas();

        setTarefas(resultado);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarTarefas();
  }, []);

  console.log(tarefas);

  if (carregando) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <p className="text-white">Carregando tarefas...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="alert alert-danger mt-5" role="alert">
        {erro}
      </div>
    );
  }

  return (
    <main className="d-flex flex-column align-items-center">
      <h1 className="text-white">Tarefas Globais</h1>

      <CardTarefasGlobais tarefas={tarefas} />
    </main>
  );
}
