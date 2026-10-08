import { useEffect, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

import CardAdicionarMateria from "../components/MateriaComponents/CardAdicionarMateria";

export default function Dashboard() {
  const [adicionandoMateria, setAdicionandoMateria] = useState(false);

  const { setAtualizarMaterias } = useOutletContext();

  const location = useLocation();
  const navigate = useNavigate();

  const [mensagemSucesso, setMensagemSucesso] = useState("");

  // Responsável por receber uma mensagem enviada durante a navegação
  // (por exemplo, após remover uma matéria e redirecionar para o Dashboard).
  useEffect(() => {
    // Se nenhuma mensagem foi enviada pelo location.state,
    // não há nada para processar.
    if (!location.state?.mensagemSucesso) {
      return;
    }

    // Copia a mensagem recebida pela navegação para um estado local
    // do Dashboard, permitindo que ela seja exibida na interface.
    setMensagemSucesso(location.state.mensagemSucesso);

    // Limpa o location.state depois que a mensagem foi recebida.
    // Isso evita que a mesma mensagem reapareça futuramente
    // ao voltar para esta entrada do histórico do navegador.
    navigate(location.pathname, {
      replace: true,
      state: null,
    });
  }, [location.state, location.pathname, navigate]);

  // Responsável por manter a mensagem de sucesso visível
  // apenas durante um período determinado.
  useEffect(() => {
    // Se não existe uma mensagem sendo exibida,
    // não é necessário criar um temporizador.
    if (!mensagemSucesso) {
      return;
    }

    // Após 3 segundos, limpa o estado da mensagem,
    // fazendo com que o alerta deixe de ser renderizado.
    const timeout = setTimeout(() => {
      setMensagemSucesso("");
    }, 3000);

    // Função de limpeza do useEffect.
    // Cancela o temporizador caso o componente seja desmontado
    // ou o efeito seja executado novamente antes dos 3 segundos.
    return () => clearTimeout(timeout);
  }, [mensagemSucesso]);

  return (
    <main className="page">
      {mensagemSucesso && (
        <div
          className="alert alert-success bg-success position-fixed top-0 start-50 fw-semibold translate-middle-x mt-3 mensagem-sucesso"
          style={{ zIndex: 2000 }}
          role="alert"
        >
          {mensagemSucesso}
        </div>
      )}

      <div className="d-flex flex-column">
        <div className="text-primary">v0.0.0</div>
        <div className="text-primary ms-5 mt-5 fs-7 fw-semibold">
          Data atual:{" "}
          <span className="text-white fs-7">
            {new Date().toLocaleDateString("pt-BR")}
          </span>
        </div>
        <div className="text-primary ms-5 mt-3  fs-7 fw-semibold">
          Tarefas pendentes:
        </div>

        <div className="text-primary ms-5 mt-3  fs-7 fw-semibold">
          Tarefas concluídas:
        </div>
        <div className="text-primary ms-5 mt-3  fs-7 fw-semibold">
          Flashcards pendentes:
        </div>
        <div className="text-primary ms-5 mt-3  fs-7 fw-semibold">
          Flashcards revisados hoje:
        </div>
      </div>
      <button
        className="btn btn-primary  fs-3 fw-semibold px-4 py-2 mb-4 position-fixed bottom-0 start-50 translate-middle-x rounded-5"
        onClick={() => setAdicionandoMateria(true)}
      >
        + Adicionar Matéria
      </button>

      {adicionandoMateria && (
        <CardAdicionarMateria
          setAdicionandoMateria={setAdicionandoMateria}
          setAtualizarMaterias={setAtualizarMaterias}
        />
      )}
    </main>
  );
}
