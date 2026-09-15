import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <main className="page d-flex flex-column justify-content-around align-items-center min-vh-100">
      <h1 className="text-primary">StudyFlow</h1>
      <div
        className="bg-dark border border-3 border-info rounded p-4 text-white"
        style={{
          width: "90%",
          maxWidth: "500px",
        }}
      >
        <h1 className="text-info text-center mb-4">Criar conta</h1>

        <div className="mb-3">
          <label className="form-label">Email:</label>

          <input type="email" className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">Senha:</label>

          <input type="password" className="form-control" />
        </div>

        <div className="mb-4">
          <label className="form-label">Confirmar senha:</label>

          <input type="password" className="form-control" />
        </div>

        <button type="button" className="btn btn-primary w-100 mb-3">
          Criar conta
        </button>

        <Link to="/login" className="btn btn-outline-light w-100">
          Já tenho uma conta
        </Link>
      </div>
    </main>
  );
}
