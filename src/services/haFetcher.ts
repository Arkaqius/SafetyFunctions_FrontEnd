import dotenv from 'dotenv';

dotenv.config(); // Load variables from .env

const BASE_URL = process.env.HA_BASE_URL;
const TOKEN = process.env.HA_API_TOKEN;

const HEADERS = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
};

interface HAEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
}

let retryCount = 0;
const MAX_RETRIES = 5;

async function fetchEntity(entityId: string): Promise<HAEntity | null> {
  try {
    const response = await fetch(`${BASE_URL}/api/states/${entityId}`, { headers: HEADERS });
    if (!response.ok) throw new Error(`Failed to fetch entity ${entityId}`);
    retryCount = 0; // Reset retries on success
    return await response.json();
  } catch (error) {
    console.error(error);
    retryCount++;
    return null;
  }
}

export async function fetchAllData(entityIds: string[]) {
  const results: Record<string, HAEntity> = {};
  for (const id of entityIds) {
    const entity = await fetchEntity(id);
    if (entity) {
      results[id] = entity;
    }
  }
  return results;
}
