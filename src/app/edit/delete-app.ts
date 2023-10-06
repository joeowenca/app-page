import { AppTypes } from '../apps-manifest';

export function clearAppDetails(index: number, apps: AppTypes[]) {
  const updatedApps = [...apps];
  updatedApps[index].details = undefined;
  return updatedApps;
}

export function addDeletedApp(app: AppTypes, apps: AppTypes[]) {
  apps.push(app);
  return apps;
}

export function purgeApp(index: number, apps: AppTypes[]) {
  apps.splice(index, 1);
  return apps;
}

export function purgeDeletedApp(id: string, apps: AppTypes[]) {
  const index = apps.findIndex(
    (app: AppTypes) => app.id === id,
  );
  apps.splice(index, 1);
  return apps;
}