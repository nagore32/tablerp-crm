import type { Activity } from '../types/activity';
import { formatDate, formatStatus } from '../utils/format';

interface ActivityDetailProps {
  activity: Activity;
  onClose: () => void;
}

export function ActivityDetail({ activity, onClose }: ActivityDetailProps) {
  const status = formatStatus(activity.completed);

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="detail-title">{activity.subject || 'Sin asunto'}</h2>
        <dl className="modal__list">
          <dt>ID</dt>
          <dd>{activity.id}</dd>
          <dt>Creada</dt>
          <dd>{formatDate(activity.created)}</dd>
          <dt>Finaliza</dt>
          <dd>{formatDate(activity.end_time)}</dd>
          <dt>Responsable</dt>
          <dd>{activity.responsible_name || '—'}</dd>
          <dt>Estado</dt>
          <dd>
            <span className={`status status--${status.toLowerCase()}`}>{status}</span>
          </dd>
        </dl>
        <button className="btn btn--primary" onClick={onClose} autoFocus>
          Cerrar
        </button>
      </div>
    </div>
  );
}