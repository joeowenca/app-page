'use client';

import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AppPage from './AppPage';
import Undo from '../edit/components/Undo';
import { AppTypes } from '../scripts/apps';
import {
	DeletedAppTypes,
	hideApp,
	addDeletedApp,
	purgeApp,
	purgeDeletedApp,
} from '../edit/scripts/delete';

export type CategoryTypes = {
	name: string;
	id: string;
	apps: AppTypes[];
};

type CategoryProps = {
	edit: boolean;
	category: CategoryTypes;
	categories: CategoryTypes[];
	setCategories: Function;
	index: number;
};

export default function Category({
	edit,
	category,
	categories,
	setCategories,
	index,
}: CategoryProps) {
	const [apps, setApps] = useState<AppTypes[]>(category.apps);
	const appsRef = useRef<AppTypes[]>(apps);
	const [deletedApps, setDeletedApps] = useState<DeletedAppTypes[]>([]);
	const deletedAppsRef = useRef<DeletedAppTypes[]>(deletedApps);

	useEffect(() => {
		appsRef.current = apps;
		updateCategories(apps);
	}, [apps]);

	useEffect(() => {
		deletedAppsRef.current = deletedApps;
	}, [deletedApps]);

	function updateCategories(updatedApps: AppTypes[]) {
		const updatedCategories = [...categories];
		updatedCategories[index].apps = updatedApps;
		setCategories(updatedCategories);
	}

	function addApp(app: AppTypes) {
		const updatedApps = [...apps];
		const newApp: AppTypes = {
			details: { ...app.details },
			id: uuidv4(),
			active: true,
		};
		updatedApps.push(newApp);
		setApps(updatedApps);
	}

	function editApp(updatedAppDetails: AppTypes) {
		const updatedApps = [...apps];
		const index = updatedApps.findIndex(
			// To change to a separate ID argument
			(app) => app.id === updatedAppDetails.id,
		);
		const newApp: AppTypes = {
			details: { ...updatedAppDetails.details },
			id: uuidv4(),
			active: true,
		};
		updatedApps[index] = newApp;
		setApps(updatedApps);
	}

	function deleteApp(id: string) {
		const appIndex = apps.findIndex((app: AppTypes) => app.id === id);
		const deletedApp = apps.find((app: AppTypes) => app.id === id);

		if (appIndex !== -1 && deletedApp) {
			setApps(hideApp(appIndex, apps));
			setDeletedApps(addDeletedApp(deletedApp, deletedApps));
		}
	}

	function undoChange(id: string) {
		const appIndex = apps.findIndex((app: AppTypes) => app.id === id);

		if (appIndex !== -1) {
			const updatedApps = [...apps];
			updatedApps[appIndex].active = true;
			setApps(updatedApps);
		}

		setDeletedApps(purgeDeletedApp(id, deletedApps));
	}

	function cancelUndo(id: string) {
		const appIndex = appsRef.current.findIndex(
			(app: AppTypes) => app.id === id,
		);

		if (appIndex !== -1) {
			setApps(purgeApp(appIndex, appsRef.current));
			setDeletedApps(purgeDeletedApp(id, deletedAppsRef.current));
		}
	}

	return (
		<div>
			<h1 className="text-center pt-8 text-2xl font-semibold">
				{category.name}
			</h1>
			<AppPage
				apps={apps}
				addApp={addApp}
				edit={edit}
				editApp={editApp}
				handleDelete={deleteApp}
			/>
			<Undo
				deletedApps={deletedApps}
				undoChange={undoChange}
				cancelUndo={cancelUndo}
			/>
		</div>
	);
}
