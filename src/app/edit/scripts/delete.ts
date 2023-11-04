import { CategoryTypes } from '@/app/components/Category';
import { AppTypes } from '../../scripts/appsManifest';

export type DeletedAppTypes = {
  app: AppTypes;
  categoryId: string;
  timestamp: Date;
}

export function hideApp(index: number, apps: AppTypes[]) {
  const updatedApps = [...apps];
  updatedApps[index].active = false;
  return updatedApps;
}

export function addDeletedApp(app: AppTypes, apps: DeletedAppTypes[], categoryId: string) {
  const updatedApps = [...apps];
  const updatedApp = {
    app: app,
    categoryId: categoryId,
    timestamp: new Date(),
  }
  updatedApps.push(updatedApp);
  return updatedApps;
}

export function purgeAppFromCategory(index: number, categoryId: string, categories: CategoryTypes[]) {
  const updatedCategories = [...categories];
  const categoryIndex = updatedCategories.findIndex(
    (item) => item.id === categoryId,
  );

  if (categoryIndex !== -1) {
    updatedCategories[categoryIndex].apps.splice(index, 1);
  }

  return updatedCategories;
}

export function purgeDeletedApp(id: string, apps: DeletedAppTypes[]) {
  const updatedApps = [...apps];
  const index = updatedApps.findIndex(
    (deleteItem: DeletedAppTypes) => deleteItem.app.id === id,
  );
  updatedApps.splice(index, 1);
  return updatedApps;
}