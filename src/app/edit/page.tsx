'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AppPage from '../apppage';
import Modal from './modal';
import UndoModal from './undo';
import { AppTypes } from '../apps-manifest';

export default function Edit() {
	const [showModal, setShowModal] = useState(false);
	const [apps, setApps] = useState<AppTypes[]>([]);
	const [deletedApps, setDeletedApps] = useState<AppTypes[]>([]);

	function addApp(app: AppTypes) {
		if (app.details) {
			const newApp: AppTypes = {
				details: { ...app.details },
				id: uuidv4(),
			};
			apps.push(newApp);
			setApps(apps);
		}
	}

	function deleteApp(id: string) {
		const appIndex = apps.findIndex((app: AppTypes) => app.id === id);
		const deletedApp = apps.find((app: AppTypes) => app.id === id);

		function clearAppDetails(index: number) {
			const updatedApps = [...apps];
			updatedApps[index].details = undefined;
			setApps(updatedApps);
		}

		function purgeApp(index: number) {
			apps.splice(index, 1);
			setApps(apps);
		}

		function addDeletedApp(app: AppTypes) {
			deletedApps.push(app);
			setDeletedApps(deletedApps);
		}

		function purgeDeletedApp() {
			const index = deletedApps.findIndex(
				(app: AppTypes) => app.id === id,
			);
			deletedApps.splice(index, 1);
			setDeletedApps(deletedApps);
		}

		function delayedDelete() {
			purgeApp(appIndex);
			purgeDeletedApp();
		}

		if (appIndex !== -1) {
			clearAppDetails(appIndex);

			if (deletedApp) {
				addDeletedApp(deletedApp);
			}

			setTimeout(() => delayedDelete(), 10000);
		}
	}

	function undoChange(id: string) {
		const deletedApp = deletedApps.find((app: AppTypes) => app.id === id);
		const appIndex = apps.findIndex((app: AppTypes) => app.id === id);

		if (deletedApp && deletedApp.details && appIndex !== -1) {
			apps[appIndex].details = deletedApp.details;
			setApps(apps);
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
			<UndoModal deletedApps={deletedApps} undoChange={undoChange} />
		</div>
	);
}
