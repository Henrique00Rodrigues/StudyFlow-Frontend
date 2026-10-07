import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CardTarefasMateria from "../../components/CardTarefasMateria";
import CardAdicionarTarefa from "../../components/TarefasComponents/CardAdicionarTarefa";

import { buscarMateriaPorId } from "../../services/materiaService";

export default function TarefasMateria() {
  const { materiaId } = useParams();

  const [materia, setMateria] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Contador usado como sinal para recarregar a lista de tarefas após alguma alteração, evitando uma atualização manual com F5.
  const [atualizarTarefas, setAtualizarTarefas] = useState(0);

  const [adicionandoTarefa, setAdicionandoTarefa] = useState(false);

  useEffect(() => {
    async function carregarMateria() {
      try {
        setErro("");

        const resultado = await buscarMateriaPorId(materiaId);

        setMateria(resultado);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    }

    carregarMateria();
  }, [materiaId]);

  if (carregando) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <p className="text-white">Carregando matéria...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="d-flex flex-column align-items-center mt-5">
        <h1 className="text-danger">{erro}</h1>
      </div>
    );
  }

  if (!materia) {
    return (
      <div className="d-flex flex-column align-items-center mt-5">
        <h1 className="text-danger">Matéria não encontrada...</h1>
      </div>
    );
  }

  return (
    <main className="d-flex flex-column align-items-center">
      <h1 className="text-white">Tarefas de {materia.nome}</h1>
      <CardTarefasMateria
        materia={materia}
        atualizarTarefas={atualizarTarefas}
      />
      <button
        type="button"
        className="btn btn-primary fs-3 fw-semibold px-4 py-2 mb-4 position-fixed bottom-0 start-50 translate-middle-x rounded-5"
        onClick={() => setAdicionandoTarefa(true)}
      >
        + Nova tarefa
      </button>

      {adicionandoTarefa && (
        <CardAdicionarTarefa
          materia={materia}
          setAdicionandoTarefa={setAdicionandoTarefa}
          setAtualizarTarefas={setAtualizarTarefas}
        />
      )}
    </main>
  );
}
