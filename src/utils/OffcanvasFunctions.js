import { Offcanvas } from "bootstrap";

export default function fecharSidebar() {
  const elemento = document.getElementById("materiasSidebar"); //Está usando JS para pegar a div do HTML

  const offcanvas = Offcanvas.getInstance(elemento); //Está recuperando a instância Offcanvas da div

  offcanvas?.hide(); //Se offcanvas não for null, ele esconde o offcanvas.
}
