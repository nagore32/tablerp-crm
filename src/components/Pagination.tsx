interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <nav className="pagination" aria-label="Paginación">
      <button className="btn btn--ghost" onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
        Anterior
      </button>
      <span>
        Página {page} de {totalPages}
      </span>
      <button className="btn btn--ghost" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>
        Siguiente
      </button>
    </nav>
  );
}