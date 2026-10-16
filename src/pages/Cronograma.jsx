import { useEffect, useState } from "react";

import { listarTarefas } from "../services/tarefaService";

import CardTarefasDoDia from "../components/CronogramaComponents/CardTarefasDoDia";

export default function Cronograma() {
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const hoje = new Date(); //Cria um objeto contendo a data e hora atuais.

  const [anoAtual, setAnoAtual] = useState(hoje.getFullYear()); //Pega o ano atual
  const [mesAtual, setMesAtual] = useState(hoje.getMonth()); //Pega o mês atual

  const [diaSelecionado, setDiaSelecionado] = useState(null);

  const primeiroDiaMes = new Date(anoAtual, mesAtual, 1); //Descobre o primeiro dia do mês atual. A estrutura é: new Date(ano, mes, dia).
  const ultimoDiaMes = new Date(anoAtual, mesAtual + 1, 0); //Descobre o último dia do mês atual ao pegar o dia 0 do mês seguinte (que é o último dia do mês atual).

  const quantidadeDiasMes = ultimoDiaMes.getDate(); //getDate() devolve o número do dia do mês. Ex: Se ultimoDiaMes = 31/10/2026, então ele devolve 31.
  const diaSemanaPrimeiroDia = primeiroDiaMes.getDay(); //getDay() retorna o dia da semana. Ex: Se 01/10/2026 for na quinta-feira, então diaSemanaPrimeiroDia = 4

  const diasCalendario = [];

  for (let i = 0; i < diaSemanaPrimeiroDia; i++) {
    diasCalendario.push(null);
  }

  for (let dia = 1; dia <= quantidadeDiasMes; dia++) {
    diasCalendario.push(dia);
  }

  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  function BuscarTarefasDoDia(dia) {
    return tarefas.filter((tarefa) => {
      const dataEntrega = tarefa.dataEntrega.split("T")[0];

      const [anoEntrega, mesEntrega, diaEntrega] = dataEntrega
        .split("-")
        .map(Number);

      return (
        anoEntrega === anoAtual &&
        mesEntrega === mesAtual + 1 &&
        diaEntrega === dia
      );
    });
  }

  function MesAnterior() {
    if (mesAtual === 0) {
      setMesAtual(11);
      setAnoAtual(anoAtual - 1);
    } else {
      setMesAtual(mesAtual - 1);
    }
  }

  function ProximoMes() {
    if (mesAtual === 11) {
      setMesAtual(0);
      setAnoAtual(anoAtual + 1);
    } else {
      setMesAtual(mesAtual + 1);
    }
  }

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

  if (carregando) {
    return <p className="text-white p-4">Carregando tarefas...</p>;
  }

  if (erro) {
    return (
      <div className="alert alert-danger m-4" role="alert">
        {erro}
      </div>
    );
  }

  return (
    <main className="p-4 text-white">
      <h1
        style={{
          color: "var(--bs-pink)",
        }}
      >
        Cronograma
      </h1>

      <div className="d-flex justify-content-center align-items-center gap-4 mb-4">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={MesAnterior}
        >
          ←
        </button>

        <h2 className="m-0">
          {meses[mesAtual]} de {anoAtual}
        </h2>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={ProximoMes}
        >
          →
        </button>
      </div>

      <div
        className="border border-secondary "
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
        }}
      >
        {diasSemana.map((diaSemana) => (
          <div
            key={diaSemana}
            className="text-center fw-bold bg-dark border border-2 border-secondary p-2"
          >
            {diaSemana}
          </div>
        ))}

        {diasCalendario.map((dia, indice) => {
          const tarefasDoDia = dia ? BuscarTarefasDoDia(dia) : [];

          return (
            <div
              key={indice}
              className="border border-secondary p-2"
              style={
                tarefasDoDia.length > 0 //Se tiver tarefas no dia, o cursor do mouse ficará como clicável.
                  ? {
                      minHeight: "100px",
                      cursor: "pointer",
                    }
                  : {
                      minHeight: "100px",
                    }
              }
              onClick={() => {
                if (tarefasDoDia.length > 0) {
                  setDiaSelecionado({
                    dia,
                    mes: mesAtual,
                    ano: anoAtual,
                    tarefas: tarefasDoDia,
                  });
                }
              }}
            >
              {dia && (
                <>
                  <span className="fw-semibold">{dia}</span>

                  {tarefasDoDia.length > 0 && (
                    <div className="bg-warning rounded mt-2 p-1 text-center text-dark fw-semibold">
                      {tarefasDoDia.length}{" "}
                      {tarefasDoDia.length > 1 ? "Tarefas" : "Tarefa"}
                    </div>
                  )}
                </>
              )}
              {!dia && <span className="text-secondary">X</span>}
            </div>
          );
        })}
      </div>

      {diaSelecionado && (
        <CardTarefasDoDia
          diaSelecionado={diaSelecionado}
          setDiaSelecionado={setDiaSelecionado}
          meses={meses}
        />
      )}
    </main>
  );
}
