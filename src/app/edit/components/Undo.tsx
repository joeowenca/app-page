import { useState, useEffect, useRef } from 'react';
import { DeletedAppTypes } from '../scripts/delete';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

type UndoProps = {
	deletedApps: DeletedAppTypes[];
	undoChange: Function;
	cancelUndo: Function;
};

export default function Undo({
	deletedApps,
	undoChange,
	cancelUndo,
}: UndoProps) {
	return (
		<div className="absolute bottom-0 m-10 flex flex-col items-start">
			{deletedApps.map((app: DeletedAppTypes) => (
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
	app: DeletedAppTypes;
	undoChange: Function;
	cancelUndo: Function;
};

function UndoItem({ app, undoChange, cancelUndo }: UndoItemProps) {
	const [show, setShow] = useState<boolean>(true);
	const [timeDifference, setTimeDifference] = useState<number>(
		new Date().getTime() - app.timestamp.getTime(),
	);
	const timeDifferenceRef = useRef<number>(timeDifference);

	function undo() {
		undoChange(app.deletedApp.id);
		setShow(false);
	}

	function handleCancelUndo() {
		cancelUndo(app.deletedApp.id);
		setShow(false);
	}

	useEffect(() => {
		timeDifferenceRef.current = timeDifference;
	}, [timeDifference]);

	useEffect(() => {
		function checkTime() {
			setTimeDifference(new Date().getTime() - app.timestamp.getTime());
			if (timeDifferenceRef.current >= 10000) {
				handleCancelUndo();
			}
		}

		const timer = window.setInterval(() => checkTime(), 100);
		return () => window.clearInterval(timer);
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
					src={app.deletedApp.details.icon}
					alt={`${app.deletedApp.details.name} undo icon`}
				/>
				<p className="pl-4 pr-5">{`${app.deletedApp.details.name} deleted`}</p>
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
