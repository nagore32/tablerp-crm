interface SidebarProps {
  total: number;
  loading: boolean;
  onReload: () => void;
}

export function Sidebar({ total, loading, onReload }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__logo">CRM</span>
        <h1>Actividades</h1>
      </div>

      <div className="sidebar__card">
        <span className="sidebar__label">Total de actividades</span>
        <strong className="sidebar__value">{loading ? '...' : total}</strong>
      </div>

      <button className="btn btn--primary" onClick={onReload} disabled={loading}>
        {loading ? 'Actualizando...' : 'Actualizar'}
      </button>
    </aside>
  );
}