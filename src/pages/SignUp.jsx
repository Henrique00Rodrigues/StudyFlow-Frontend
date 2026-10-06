import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signup } from "../services/authService";

export default function SignUp() {
  const [apelido, setApelido] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setErro("");

      if (senha !== confirmarSenha) {
        setErro("As senhas não coincidem.");
        return;
      }

      await signup(apelido, email, senha);

      navigate("/login", {
        state: {
          mensagem: "Conta criada com sucesso! Faça login para continuar.",
          tipo: "sucesso",
        },
      });
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
        <h1 className="text-info text-center mb-4">Criar conta</h1>

        <div className="mb-3">
          <label className="form-label">Apelido:</label>

          <input
            type="text"
            className="form-control"
            value={apelido}
            onChange={(event) => setApelido(event.target.value)}
            required
          />
        </div>

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

        <div className="mb-4">
          <label className="form-label">Confirmar senha:</label>

          <input
            type="password"
            className="form-control"
            value={confirmarSenha}
            onChange={(event) => setConfirmarSenha(event.target.value)}
            required
          />
        </div>

        {erro && (
          <div className="alert alert-danger" role="alert">
            {erro}
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100 mb-3">
          Criar conta
        </button>

        <Link to="/login" className="btn btn-outline-light w-100">
          Já tenho uma conta
        </Link>
      </form>
    </main>
  );
}
