'use client';

import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AppPage from '../../components/AppPage';
import Undo from './Undo';
import { AppTypes } from '../../scripts/apps';
import {
	DeletedAppTypes,
	hideApp,
	addDeletedApp,
	purgeApp,
	purgeDeletedApp,
} from '../scripts/delete';

export default function Edit() {
	const [apps, setApps] = useState<AppTypes[]>([]);
	const appsRef = useRef<AppTypes[]>(apps);
	const [deletedApps, setDeletedApps] = useState<DeletedAppTypes[]>([]);
	const deletedAppsRef = useRef<DeletedAppTypes[]>(deletedApps);

	useEffect(() => {
		appsRef.current = apps;
	}, [apps]);

	useEffect(() => {
		deletedAppsRef.current = deletedApps;
	}, [deletedApps]);

	function addApp(app: AppTypes) {
		const updatedApps = [...apps];
		if (app.details) {
			const newApp: AppTypes = {
				details: { ...app.details },
				id: uuidv4(),
				active: true,
			};
			updatedApps.push(newApp);
			setApps(updatedApps);
		}
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
			<AppPage
				apps={apps}
				addApp={addApp}
				edit={true}
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
