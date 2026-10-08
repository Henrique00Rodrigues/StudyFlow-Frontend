import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebars/Sidebar";
import { useState } from "react";

export default function Layout() {
  // Contador usado como sinal para recarregar a lista de matérias
  // após alguma alteração, evitando uma atualização manual com F5.
  const [atualizarMaterias, setAtualizarMaterias] = useState(0);

  return (
    <main className="page">
      <Sidebar atualizarMaterias={atualizarMaterias} />

      <section className="flex-grow-1">
        <Outlet context={{ setAtualizarMaterias }} />
      </section>
    </main>
  );
}
