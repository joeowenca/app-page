'use client';

import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AppPage from '../../components/AppPage';
import EditModal from './EditModal';
import Undo from './Undo';
import { AppTypes } from '../../scripts/apps';
import {
	hideApp,
	addDeletedApp,
	purgeApp,
	purgeDeletedApp,
} from '../scripts/delete';
import { TimeoutTypes, addTimeout, removeTimeout } from '../scripts/timeout';

export default function Edit() {
	const [showModal, setShowModal] = useState(false);
	const [apps, setApps] = useState<AppTypes[]>([]);
	const appsRef = useRef<AppTypes[]>(apps);
	const [deletedApps, setDeletedApps] = useState<AppTypes[]>([]);
	const deletedAppsRef = useRef<AppTypes[]>(deletedApps);
	const [timeouts, setTimeouts] = useState<TimeoutTypes[]>([]);

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

		function delayedDelete() {
			const index = appsRef.current.findIndex((app) => app.id === id);

			if (!appsRef.current[index].active) {
				setApps(purgeApp(index, appsRef.current));
				setDeletedApps(purgeDeletedApp(id, deletedAppsRef.current));
			}
		}

		if (appIndex !== -1 && deletedApp) {
			setApps(hideApp(appIndex, apps));
			setDeletedApps(addDeletedApp(deletedApp, deletedApps));
			const timer = window.setTimeout(() => delayedDelete(), 10000);
			const timeout = {
				id: timer,
				appId: deletedApp.id,
			};
			setTimeouts(addTimeout(timeout, timeouts));
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
		setTimeouts(removeTimeout(id, timeouts));
	}

	function cancelUndo(id: string) {
		const appIndex = apps.findIndex((app: AppTypes) => app.id === id);

		if (appIndex !== -1) {
			setApps(purgeApp(appIndex, apps));
			setDeletedApps(purgeDeletedApp(id, deletedApps));
			setTimeouts(removeTimeout(id, timeouts));
		}
	}

	return (
		<div>
			<EditModal
				title="Add App"
				show={showModal}
				setShow={setShowModal}
				save={addApp}
			/>
			<AppPage
				apps={apps}
				edit={true}
				handleDelete={deleteApp}
				setModal={setShowModal}
			/>
			<Undo
				deletedApps={deletedApps}
				undoChange={undoChange}
				cancelUndo={cancelUndo}
			/>
		</div>
	);
}
