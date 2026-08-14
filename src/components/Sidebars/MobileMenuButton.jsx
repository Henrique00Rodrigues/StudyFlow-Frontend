export default function MobileMenuButton() {
  return (
    <button
      className="btn btn-primary d-md-none m-3 align-self-start"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#sidebarMobile"
      aria-controls="sidebarMobile" /* Tecnologias assistivas */
    >
      ☰
    </button>
  );
}
