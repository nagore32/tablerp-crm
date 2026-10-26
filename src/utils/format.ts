// Formateador de fechas en español (se crea una sola vez y se reutiliza).
const dateFormatter = new Intl.DateTimeFormat('es-PE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

// Convierte "2025-01-02T17:19:38+03:00" en "02/01/2025, 09:19 a. m."
// Si viene vacía o es inválida, devuelve "—" en vez de romper la tabla.
export function formatDate(value: string | null | undefined): string {
  if (!value) return '—';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';

  return dateFormatter.format(date);
}

export type ActivityStatus = 'Completada' | 'Pendiente' | 'Desconocido';

// "Y" → Completada, "N" → Pendiente, cualquier otra cosa → Desconocido.
export function formatStatus(completed: string): ActivityStatus {
  if (completed === 'Y') return 'Completada';
  if (completed === 'N') return 'Pendiente';
  return 'Desconocido';
}

export function getDayKey(value: string | null | undefined): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString('es-PE');
}

export function getDayColor(dayKey: string | null): string {
  if (!dayKey) return 'rgba(229, 231, 235, 0.6)';
  let hash = 0;
  for (const char of dayKey) {
    hash = (hash * 31 + char.charCodeAt(0)) % 360;
  }
  return `hsla(${hash}, 80%, 85%, 0.55)`;
}