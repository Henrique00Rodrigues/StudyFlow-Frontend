import SidebarMaterias from "./SidebarMaterias";
import MobileMenuButton from "./MobileMenuButton";
import SidebarMobile from "./SidebarMobile";
import SidebarDesktop from "./SidebarDesktop";

export default function Sidebar({ atualizarMaterias, setAtualizarUsuario }) {
  return (
    <>
      <MobileMenuButton />
      <SidebarDesktop setAtualizarUsuario={setAtualizarUsuario} />
      <SidebarMobile setAtualizarUsuario={setAtualizarUsuario} />
      <SidebarMaterias atualizarMaterias={atualizarMaterias} />
    </>
  );
}
