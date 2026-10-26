import type { Activity } from '../types/activity';
import { formatDate, formatStatus, getDayColor, getDayKey } from '../utils/format';

interface ActivitiesTableProps {
  activities: Activity[];
  onView: (activity: Activity) => void;
}

export function ActivitiesTable({ activities, onView }: ActivitiesTableProps) {
  return (
    <div className="table-wrapper">
      <table className="activities-table">
        <thead>
          <tr>
            <th scope="col">Fecha de creación</th>
            <th scope="col">Asunto</th>
            <th scope="col">Responsable</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => {
            const status = formatStatus(activity.completed);
            const dayColor = getDayColor(getDayKey(activity.created));
            return (
              <tr key={activity.id}>
                <td>
                  <span className="date-chip" style={{ backgroundColor: dayColor }}>
                    {formatDate(activity.created)}
                  </span>
                </td>
                <td>{activity.subject || '—'}</td>
                <td>{activity.responsible_name || '—'}</td>
                <td>
                  <span className={`status status--${status.toLowerCase()}`}>{status}</span>
                </td>
                <td>
                  <button className="btn btn--ghost" onClick={() => onView(activity)}>
                    Ver
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}