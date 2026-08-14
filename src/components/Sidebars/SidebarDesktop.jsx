import SidebarContent from "./SidebarContent";

export default function SidebarDesktop() {
  return (
    <aside
      className="sidebar bg-black vh-100 position-sticky top-0 border-end border-primary border-5 d-none d-md-flex flex-column"
      style={{
        width: "240px",
        minWidth: "240px",
      }}
    >
      <SidebarContent />
    </aside>
  );
}
