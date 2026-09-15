import { useState } from "react";

export default function CardAdicionarMateria({ setAdicionandoMateria }) {
  const [dadosMateria, setDadosMateria] = useState({
    nome: "",
  });

  function AdicionarMateria() {
    const nomeMateria = dadosMateria.nome.trim();
    if (nomeMateria === "") {
      alert("Você precisa inserir o nome da matéria.");
    } else {
      const materiaTratada = {
        nome: nomeMateria,
      };
      alert(`Adicionando Matéria: ${materiaTratada.nome}`);
      setAdicionandoMateria(false);
    }
  }

  return (
    <div
      className="position-fixed translate-middle top-50 start-50 bg-dark border border-3 border-black rounded p-4 text-warning fw-semibold overflow-auto"
      style={{
        width: "90%",
        maxWidth: "700px",
        maxHeight: "90vh",
        zIndex: 1050,
      }}
    >
      <h5 className="text-warning">Nome da matéria:</h5>
      <input
        className="form-control"
        type="text"
        value={dadosMateria.nome}
        onChange={(ev) =>
          setDadosMateria({
            ...dadosMateria,
            nome: ev.target.value,
          })
        }
      />
      <button
        type="button"
        className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
        onClick={() => setAdicionandoMateria(false)}
      />
      <div className="mt-4">
        <button
          type="button"
          className="btn btn-primary fw-semibold px-4"
          onClick={AdicionarMateria}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}
