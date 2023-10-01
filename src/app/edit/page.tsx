'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AppPage from '../apppage';
import Modal from './modal';
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

	function undoChange() {
		// Undo logic
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
			<UndoModal undoChange={undoChange} />
		</div>
	);
}

type UndoModalProps = {
	undoChange: Function;
};

function UndoModal({ undoChange }: UndoModalProps) {
	const [show, setShow] = useState<boolean>(false);

	return (
		<div
			className={`${
				show
					? 'opacity-100 left-0 pointer-events-auto'
					: 'opacity-0 -left-5 pointer-events-none'
			} absolute bottom-0 m-10 transition-all duration-300 bg-zinc-900 p-5 rounded-2xl`}
		>
			<div className="flex">
				App deleted
				<div
					onClick={() => undoChange()}
					className="block text-blue-500 pl-5 cursor-pointer hover:text-white transition-colors duration-75"
				>
					Undo
				</div>
				<div className="icon-cross-standard pl-5 text-zinc-500 cursor-pointer hover:text-white transition-colors duration-75"></div>
			</div>
		</div>
	);
}
