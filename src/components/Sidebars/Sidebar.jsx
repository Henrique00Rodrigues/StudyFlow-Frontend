import SidebarMaterias from "./SidebarMaterias";
import MobileMenuButton from "./MobileMenuButton";
import SidebarMobile from "./SidebarMobile";
import SidebarDesktop from "./SidebarDesktop";

export default function Sidebar({ atualizarMaterias }) {
  return (
    <>
      <MobileMenuButton />
      <SidebarDesktop />
      <SidebarMobile />
      <SidebarMaterias atualizarMaterias={atualizarMaterias} />
    </>
  );
}
