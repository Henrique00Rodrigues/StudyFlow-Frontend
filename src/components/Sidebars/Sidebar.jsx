import { NavLink } from "react-router-dom";
import SidebarMaterias from "./SidebarMaterias";
import MobileMenuButton from "./MobileMenuButton";
import SidebarMobile from "./SidebarMobile";
import SidebarDesktop from "./SidebarDesktop";

export default function Sidebar() {
  return (
    <>
      <MobileMenuButton />
      <SidebarDesktop />
      <SidebarMobile />
      <SidebarMaterias />
    </>
  );
}
