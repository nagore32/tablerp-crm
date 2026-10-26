import { useMemo, useState } from 'react';
import { useActivities } from './hooks/useActivities';
import { Sidebar } from './components/Sidebar';
import { ActivitiesTable } from './components/ActivitiesTable';
import { Pagination } from './components/Pagination';
import { ActivityDetail } from './components/ActivityDetail';
import type { Activity } from './types/activity';

const PAGE_SIZE = 20;

function App() {
  const { activities, loading, error, reload } = useActivities();
  const [page, setPage] = useState<number>(1);
  const [selected, setSelected] = useState<Activity | null>(null);

  const uniqueActivities = useMemo(() => {
    const byId = new Map(activities.map((activity) => [activity.id, activity]));
    return Array.from(byId.values());
  }, [activities]);

  const totalPages = Math.max(1, Math.ceil(uniqueActivities.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visibleActivities = uniqueActivities.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleReload = () => {
    setPage(1);
    reload();
  };

  return (
    <div className="layout">
      <Sidebar total={uniqueActivities.length} loading={loading} onReload={handleReload} />

      <main className="content">
        {loading && <p role="status" className="message">Cargando actividades...</p>}

        {!loading && error && (
          <div role="alert" className="message message--error">
            <p>No se pudieron cargar las actividades: {error}</p>
            <button className="btn btn--primary" onClick={handleReload}>Reintentar</button>
          </div>
        )}

        {!loading && !error && uniqueActivities.length === 0 && (
          <p className="message">No hay actividades registradas.</p>
        )}

        {!loading && !error && uniqueActivities.length > 0 && (
          <>
            <ActivitiesTable activities={visibleActivities} onView={setSelected} />
            <Pagination page={currentPage} totalPages={totalPages} onPageChange={setPage} />
          </>
        )}
      </main>

      {selected && <ActivityDetail activity={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

export default App;