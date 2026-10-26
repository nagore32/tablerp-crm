import { useEffect, useState } from 'react';
import { fetchActivities } from '../services/activitiesService';
import type { Activity } from '../types/activity';

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState<number>(0);

  useEffect(() => {
    let ignore = false;

    fetchActivities()
      .then((data) => {
        if (!ignore) setActivities(data.activities);
      })
      .catch((err: unknown) => {
        if (!ignore) {
          setError(err instanceof Error ? err.message : 'Error desconocido');
        }
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [reloadKey]);

  const reload = () => {
    setLoading(true);
    setError(null);
    setReloadKey((key) => key + 1);
  };

  return { activities, loading, error, reload };
}