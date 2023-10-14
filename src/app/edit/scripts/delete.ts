import { AppTypes } from '../../scripts/apps';

export type DeletedAppTypes = {
  app: AppTypes;
  timestamp: Date;
}

export function hideApp(index: number, apps: AppTypes[]) {
  const updatedApps = [...apps];
  updatedApps[index].active = false;
  return updatedApps;
}

export function addDeletedApp(app: AppTypes, apps: DeletedAppTypes[]) {
  const updatedApps = [...apps];
  const updatedApp = {
    app: app,
    timestamp: new Date(),
  }
  updatedApps.push(updatedApp);
  return updatedApps;
}

export function purgeApp(index: number, apps: AppTypes[]) {
  const updatedApps = [...apps];
  updatedApps.splice(index, 1);
  return updatedApps;
}

export function purgeDeletedApp(id: string, apps: DeletedAppTypes[]) {
  const updatedApps = [...apps];
  const index = updatedApps.findIndex(
    (deleteItem: DeletedAppTypes) => deleteItem.app.id === id,
  );
  updatedApps.splice(index, 1);
  return updatedApps;
}