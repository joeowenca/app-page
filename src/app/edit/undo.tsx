import { useState, useEffect } from 'react';
import { AppTypes } from '../apps-manifest';
import { v4 as uuidv4 } from 'uuid';

type UndoModalProps = {
	deletedApps: AppTypes[];
	undoChange: Function;
};

export default function UndoModal({ deletedApps, undoChange }: UndoModalProps) {
	return (
		<div className="absolute bottom-0 m-10 flex flex-col">
			{deletedApps.map((app: AppTypes) => (
				<UndoItem id={app.id} undoChange={undoChange} key={uuidv4()} />
			))}
		</div>
	);
}

type UndoItemProps = {
	id: string;
	undoChange: Function;
};

function UndoItem({ id, undoChange }: UndoItemProps) {
	const [show, setShow] = useState<boolean>(true);

	function undo() {
		undoChange(id);
		setShow(false);
	}

	useEffect(() => {
		setTimeout(() => setShow(false), 10000);
	}, []);

	return (
		<div
			className={`${
				show
					? 'opacity-100 translate-x-0 pointer-events-auto'
					: 'opacity-0 -translate-x-5 pointer-events-none'
			} transition-all duration-300 bg-zinc-900 mt-5 p-5 rounded-2xl`}
		>
			<div className="flex">
				App deleted
				<div
					onClick={() => undo()}
					className="block text-blue-500 pl-5 cursor-pointer hover:text-white transition-colors duration-75"
				>
					Undo
				</div>
				<div className="icon-cross-standard pl-5 text-zinc-500 cursor-pointer hover:text-white transition-colors duration-75"></div>
			</div>
		</div>
	);
}
