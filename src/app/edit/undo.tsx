import { useState, useEffect } from 'react';
import { AppTypes } from '../apps-manifest';
import Image, { StaticImageData } from 'next/image';
import { v4 as uuidv4 } from 'uuid';

type UndoModalProps = {
	deletedApps: AppTypes[];
	undoChange: Function;
	cancelUndo: Function;
};

export default function UndoModal({
	deletedApps,
	undoChange,
	cancelUndo,
}: UndoModalProps) {
	return (
		<div className="absolute bottom-0 m-10 flex flex-col items-start">
			{deletedApps.map((app: AppTypes) => (
				<UndoItem
					app={app}
					undoChange={undoChange}
					cancelUndo={cancelUndo}
					key={uuidv4()}
				/>
			))}
		</div>
	);
}

type UndoItemProps = {
	app: AppTypes;
	undoChange: Function;
	cancelUndo: Function;
};

function UndoItem({ app, undoChange, cancelUndo }: UndoItemProps) {
	const [show, setShow] = useState<boolean>(true);

	function undo() {
		undoChange(app.id);
		setShow(false);
	}

	function handleCancelUndo() {
		cancelUndo(app.id);
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
			} transition-all duration-300 bg-zinc-800 shadow-md shadow-zinc-950 mt-5 p-5 rounded-2xl`}
		>
			<div className="flex items-center">
				<Image
					className="max-w-[2rem]"
					src={app.details.icon}
					alt={`${app.details.name} undo icon`}
				/>
				<p className="pl-4 pr-5">{`${app.details.name} deleted`}</p>
				<div
					onClick={() => undo()}
					className="block text-blue-500 pr-5 cursor-pointer hover:text-white transition-colors duration-75"
				>
					Undo
				</div>
				<div
					onClick={() => handleCancelUndo()}
					className="icon-cross-standard text-zinc-500 cursor-pointer hover:text-white transition-colors duration-75"
				></div>
			</div>
		</div>
	);
}
