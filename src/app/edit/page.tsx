'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AppPage from '../apppage';
import Modal from './modal';
import { AppTypes } from '../apps-manifest';

export default function Edit() {
	const [showModal, setShowModal] = useState(false);
	const [apps, setApps] = useState<AppTypes[]>([]);
	const [previousApps, setPreviousApps] = useState<AppTypes[]>(apps);
	const [undo, setUndo] = useState<boolean>(false);

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
		const selectedApp =
			apps.find((app: AppTypes) => app.id === id) ?? undefined;

		if (selectedApp) {
			const index = apps.indexOf(selectedApp);

			const newApps = structuredClone(apps);
			newApps.splice(index, 1);
			setApps(newApps);
			setPreviousApps(apps);
			setUndo(true);
			setTimeout(() => setUndo(false), 10000);
		}
	}

	function undoChange() {
		setApps(previousApps);
		setUndo(false);
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
				show={undo}
				undoChange={undoChange}
				cancelUndo={setUndo}
			/>
		</div>
	);
}

type UndoModalProps = {
	show: boolean;
	undoChange: Function;
	cancelUndo: Function;
};

function UndoModal({ show, undoChange, cancelUndo }: UndoModalProps) {
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
				<div
					onClick={() => cancelUndo(false)}
					className="icon-cross-standard pl-5 text-zinc-500 cursor-pointer hover:text-white transition-colors duration-75"
				></div>
			</div>
		</div>
	);
}
