import SidebarContent from "./SidebarContent";

export default function SidebarMobile() {
  return (
    <div
      className="offcanvas offcanvas-start bg-black text-white"
      tabIndex="-1"
      id="sidebarMobile"
      data-bs-backdrop="false" //Não deixa a tela escura quando a Sidebar está ativa.
    >
      <div className="offcanvas-header">
        <h2 className="text-primary">StudyFlow</h2>

        <button
          type="button"
          className="btn-close btn-close-white"
          data-bs-dismiss="offcanvas"
          aria-label="Fechar" /* Tecnologias assistivas. Para acessibilidade (por exemplo, leitores de tela) */
        ></button>
      </div>

      <div className="offcanvas-body p-0 d-flex flex-column">
        <SidebarContent hideTitle={true} />
      </div>
    </div>
  );
}
