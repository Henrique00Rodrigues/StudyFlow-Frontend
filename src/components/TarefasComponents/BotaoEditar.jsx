export default function BotaoEditar({
  campo,
  campoEditando,
  setCampoEditando,
}) {
  return (
    <button
      className={`btn ${campoEditando === campo ? "btn-primary" : "btn-dark"} border border-2 border-black d-flex justify-content-center align-items-center`}
      style={{
        width: "42px",
        height: "42px",
      }}
      onClick={() => {
        campoEditando !== campo
          ? setCampoEditando(campo)
          : setCampoEditando(null);
      }}
    >
      ✏️
    </button>
  );
}
