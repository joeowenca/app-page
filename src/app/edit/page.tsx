'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AppPage from '../apppage';
import Modal from './modal';
import UndoModal from './undo';
import { AppTypes } from '../apps-manifest';
import {
	hideApp,
	addDeletedApp,
	purgeApp,
	purgeDeletedApp,
} from './delete-app';
import { TimeoutTypes, addTimeout, removeTimeout } from './timeout';

export default function Edit() {
	const [showModal, setShowModal] = useState(false);
	const [apps, setApps] = useState<AppTypes[]>([]);
	const [deletedApps, setDeletedApps] = useState<AppTypes[]>([]);
	const [timeouts, setTimeouts] = useState<TimeoutTypes[]>([]);

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
			if (!apps[appIndex].active) {
				setApps(purgeApp(appIndex, apps));
				setDeletedApps(purgeDeletedApp(id, deletedApps));
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
			<Modal
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
			<UndoModal
				deletedApps={deletedApps}
				undoChange={undoChange}
				cancelUndo={cancelUndo}
			/>
		</div>
	);
}
