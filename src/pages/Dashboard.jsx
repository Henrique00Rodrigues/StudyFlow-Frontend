import { useEffect, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

import CardAdicionarMateria from "../components/MateriaComponents/CardAdicionarMateria";

import { listarTarefas } from "../services/tarefaService";
import { listarFlashcards } from "../services/flashcardService";
import { buscarDadosUsuario } from "../services/usuarioService";

export default function Dashboard() {
  const [tarefasPendentes, setTarefasPendentes] = useState(0);
  const [tarefasConcluidas, setTarefasConcluidas] = useState(0);

  const [flashcardsPendentes, setFlashcardsPendentes] = useState(0);
  const [flashcardsRevisadosHoje, setFlashcardsRevisadosHoje] = useState(0);

  const [adicionandoMateria, setAdicionandoMateria] = useState(false);

  const [dadosUsuario, setDadosUsuario] = useState(null);

  const { setAtualizarMaterias, atualizarUsuario } = useOutletContext();

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

  // Busca todas as tarefas do usuário e calcula
  // a quantidade de tarefas pendentes e concluídas.
  useEffect(() => {
    async function carregarEstatisticasTarefas() {
      try {
        const tarefas = await listarTarefas();

        const pendentes = tarefas.filter((tarefa) => !tarefa.concluida).length;

        const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length;

        setTarefasPendentes(pendentes);
        setTarefasConcluidas(concluidas);
      } catch (error) {
        console.error(error);
      }
    }

    carregarEstatisticasTarefas();
  }, []);

  // Busca todos os flashcards do usuário e calcula
  // quantos estão pendentes para revisão.
  useEffect(() => {
    async function carregarEstatisticasFlashcards() {
      try {
        const flashcards = await listarFlashcards();

        const agora = new Date();

        const pendentes = flashcards.filter((flashcard) => {
          // Flashcard nunca revisado: já está disponível para revisão.
          if (!flashcard.proximaRevisao) {
            return true;
          }

          // Flashcard cuja próxima revisão já chegou ou passou.
          return new Date(flashcard.proximaRevisao) <= agora;
        }).length;

        const revisadosHoje = flashcards.filter((flashcard) => {
          if (!flashcard.dataUltimaRevisao) {
            return false;
          }

          const dataUltimaRevisao = new Date(flashcard.dataUltimaRevisao);

          return (
            dataUltimaRevisao.getFullYear() === agora.getFullYear() &&
            dataUltimaRevisao.getMonth() === agora.getMonth() &&
            dataUltimaRevisao.getDate() === agora.getDate()
          );
        }).length;

        setFlashcardsPendentes(pendentes);
        setFlashcardsRevisadosHoje(revisadosHoje);
      } catch (error) {
        console.error(error);
      }
    }

    carregarEstatisticasFlashcards();
  }, []);

  // Busca os dados do usuário autenticado
  // para exibir seu apelido no Dashboard.
  useEffect(() => {
    async function carregarDadosUsuario() {
      try {
        const usuario = await buscarDadosUsuario();

        setDadosUsuario(usuario);
      } catch (error) {
        console.error(error);
      }
    }

    carregarDadosUsuario();
  }, [atualizarUsuario]);

  return (
    <main className="page">
      {dadosUsuario?.apelido && (
        <div className="position-fixed top-0 start-50 translate-middle-x mt-3 text-white fw-semibold fs-2">
          Bem-vindo,{" "}
          <span
            className={
              dadosUsuario.tipo === "administrador"
                ? "text-info"
                : "text-success"
            }
          >
            {dadosUsuario.apelido}
          </span>
        </div>
      )}

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
          Tarefas pendentes:{" "}
          <span className="text-white">{tarefasPendentes}</span>
        </div>

        <div className="text-primary ms-5 mt-3  fs-7 fw-semibold">
          Tarefas concluídas:{" "}
          <span className="text-white">{tarefasConcluidas}</span>
        </div>
        <div className="text-primary ms-5 mt-3  fs-7 fw-semibold">
          Flashcards pendentes:{" "}
          <span className="text-white">{flashcardsPendentes}</span>
        </div>
        <div className="text-primary ms-5 mt-3  fs-7 fw-semibold">
          Flashcards revisados hoje:{" "}
          <span className="text-white">{flashcardsRevisadosHoje}</span>
        </div>
        <div className="text-primary ms-5 mt-5  fs-7 fw-semibold">
          Tipo de usuário:{" "}
          <span
            className={
              dadosUsuario?.tipo === "administrador"
                ? "text-info"
                : "text-light"
            }
          >
            {dadosUsuario?.tipo?.toUpperCase()}
          </span>
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
          setMensagemSucesso={setMensagemSucesso}
        />
      )}
    </main>
  );
}
