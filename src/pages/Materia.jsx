import {
  NavLink,
  useOutletContext,
  useParams,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";

import CardEditarMateria from "../components/MateriaComponents/CardEditarMateria";

import { buscarMateriaPorId, removerMateria } from "../services/materiaService";

export default function Materia() {
  const { materiaId } = useParams();

  const [materia, setMateria] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [configuracoesAberta, setConfiguracoesAberta] = useState(false);
  const [editandoMateria, setEditandoMateria] = useState(false);

  const [mensagemSucesso, setMensagemSucesso] = useState("");

  const { setAtualizarMaterias } = useOutletContext();

  const navigate = useNavigate();

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

  async function RemoverMateria() {
    const confirmacao = window.confirm(
      `Tem certeza que deseja remover a matéria "${materia.nome}"? As tarefas e flashcards associados também serão removidos permanentemente.`,
    );

    if (!confirmacao) {
      return;
    }

    try {
      setErro("");

      await removerMateria(materia.id);

      setAtualizarMaterias((valorAtual) => valorAtual + 1);

      navigate("/", {
        state: {
          mensagemSucesso: "Matéria removida com sucesso.",
        },
      });
    } catch (error) {
      setErro(error.message);
    }
  }

  return (
    <main className="d-flex flex-column vh-100 position-relative">
      {mensagemSucesso && (
        <div
          className="alert alert-success bg-success position-fixed top-0 start-50 fw-semibold translate-middle-x mt-3 mensagem-sucesso"
          style={{ zIndex: 2000 }}
          role="alert"
        >
          {mensagemSucesso}
        </div>
      )}

      <div className="d-flex justify-content-center mt-2">
        <div className="bg-warning w-auto d-inline-block p-2 rounded">
          <h1 className="text-black mt-0">{materia.nome}</h1>
        </div>
      </div>

      <div className="dropdown position-absolute top-0 end-0 m-3">
        <button
          type="button"
          className="btn btn-secondary fs-5 fw-semibold text-dark"
          aria-expanded={configuracoesAberta}
          aria-label="Configurações da matéria"
          onClick={() => setConfiguracoesAberta(!configuracoesAberta)}
        >
          Configurações ⚙️
        </button>

        {configuracoesAberta && (
          <ul className="dropdown-menu dropdown-menu-end show">
            <li>
              <button
                type="button"
                className="dropdown-item"
                onClick={() => {
                  setEditandoMateria(true);
                  setConfiguracoesAberta(false);
                }}
              >
                Editar nome da matéria
              </button>
            </li>

            <li>
              <button
                type="button"
                className="dropdown-item text-danger"
                onClick={() => {
                  RemoverMateria();
                  setConfiguracoesAberta(false);
                }}
              >
                Remover matéria
              </button>
            </li>
          </ul>
        )}
      </div>

      <div className="d-flex justify-content-around align-items-center flex-grow-1">
        <NavLink
          className="btn btn-primary px-5 py-4 fs-4 text-white fw-semibold border-black border-2"
          to={`/materias/${materia.id}/flashcards`}
        >
          Flashcards
        </NavLink>
        <NavLink
          className="btn btn-info px-5 py-4 fs-4 text-black   fw-semibold border-black border-2"
          to={`/materias/${materia.id}/tarefas`}
        >
          Tarefas de {materia.nome}
        </NavLink>
      </div>

      {editandoMateria && (
        <CardEditarMateria
          materia={materia}
          setMateria={setMateria}
          setEditandoMateria={setEditandoMateria}
          setAtualizarMaterias={setAtualizarMaterias}
          setMensagemSucesso={setMensagemSucesso}
        />
      )}
    </main>
  );
}
