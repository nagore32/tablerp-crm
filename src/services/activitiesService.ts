import type { ActivitiesResponse } from "../types/activity";

const API_URL = 'https://api-maestra-prod.up.railway.app/bitrix/activities';

export async function fetchActivities(): Promise<ActivitiesResponse> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Error ${response.status} al obtener actividades`);
  }

  const data:ActivitiesResponse = await response.json();
  return data;
} 