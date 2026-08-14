import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebars/Sidebar";

export default function Layout() {
  return (
    <main className="page">
      <Sidebar />

      <section className="flex-grow-1">
        <Outlet />
      </section>
    </main>
  );
}
