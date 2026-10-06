import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setErro("");

      await login(email, senha);

      navigate("/");
    } catch (error) {
      setErro(error.message);
    }
  }

  return (
    <main className="page d-flex flex-column justify-content-around align-items-center min-vh-100">
      <h1 className="text-primary">StudyFlow</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-dark border border-3 border-info rounded p-4 text-white"
        style={{
          width: "90%",
          maxWidth: "500px",
        }}
      >
        <h1 className="text-info text-center mb-4">Login</h1>

        <div className="mb-3">
          <label className="form-label">Email:</label>

          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Senha:</label>

          <input
            type="password"
            className="form-control"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            required
          />
        </div>

        {erro && (
          <div className="alert alert-danger" role="alert">
            {erro}
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100 mb-3">
          Entrar
        </button>

        <Link to="/signup" className="btn btn-outline-light w-100">
          Criar conta
        </Link>
      </form>
    </main>
  );
}
