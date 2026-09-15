export default function CardLogOut({ setConfirmandoLogout, setPerfilAberto }) {
  function FazerLogout() {
    alert("Usuário deslogado!");

    // Futuramente:
    // remover token
    // limpar sessão
    // redirecionar para /login
    setConfirmandoLogout(false);
    if (setPerfilAberto) {
      setPerfilAberto(false);
    }
  }

  return (
    <div
      className="position-fixed translate-middle top-50 start-50 bg-dark border border-3 border-danger rounded p-4 text-white fw-semibold"
      style={{
        width: "90%",
        maxWidth: "500px",
        zIndex: 2000,
      }}
    >
      <h4 className="text-danger mb-3">Sair da conta</h4>

      <p>Você realmente deseja sair?</p>

      <div className="d-flex justify-content-end gap-3 mt-4">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setConfirmandoLogout(false)}
        >
          Não
        </button>

        <button type="button" className="btn btn-danger" onClick={FazerLogout}>
          Sim
        </button>
      </div>

      <button
        type="button"
        className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
        onClick={() => setConfirmandoLogout(false)}
      />
    </div>
  );
}
