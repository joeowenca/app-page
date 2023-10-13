import { AppTypes } from '../../scripts/apps';

export function hideApp(index: number, apps: AppTypes[]) {
  const updatedApps = [...apps];
  updatedApps[index].active = false;
  return updatedApps;
}

export function addDeletedApp(app: AppTypes, apps: AppTypes[]) {
  const updatedApps = [...apps];
  updatedApps.push(app);
  return updatedApps;
}

export function purgeApp(index: number, apps: AppTypes[]) {
  const updatedApps = [...apps];
  updatedApps.splice(index, 1);
  return updatedApps;
}

export function purgeDeletedApp(id: string, apps: AppTypes[]) {
  const updatedApps = [...apps];
  const index = updatedApps.findIndex(
    (app: AppTypes) => app.id === id,
  );
  updatedApps.splice(index, 1);
  return updatedApps;
}