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
			{deletedApps.map((deleteItem: DeletedAppTypes) => (
				<UndoItem
					deleteItem={deleteItem}
					undoChange={undoChange}
					cancelUndo={cancelUndo}
					key={uuidv4()}
				/>
			))}
		</div>
	);
}

type UndoItemProps = {
	deleteItem: DeletedAppTypes;
	undoChange: Function;
	cancelUndo: Function;
};

function UndoItem({ deleteItem, undoChange, cancelUndo }: UndoItemProps) {
	const [show, setShow] = useState<boolean>(true);
	const [mouseOver, setMouseOver] = useState<boolean>(false);
	const mouseOverRef = useRef<boolean>(mouseOver);

	function undo() {
		undoChange(deleteItem.app.id);
		setShow(false);
	}

	function handleCancelUndo() {
		cancelUndo(deleteItem.app.id);
		setShow(false);
	}

	function checkTime() {
		if (new Date().getTime() - deleteItem.timestamp.getTime() >= 10000) {
			if (!mouseOverRef.current) {
				handleCancelUndo();
			}
		}
	}

	useEffect(() => {
		mouseOverRef.current = mouseOver;
	}, [mouseOver]);

	useEffect(() => {
		const timer = window.setInterval(() => checkTime(), 100);
		return () => {
			window.clearInterval(timer);
		};
	}, []);

	return (
		<div
			onMouseEnter={() => setMouseOver(true)}
			onMouseLeave={() => setMouseOver(false)}
			className={`${
				show
					? 'opacity-100 translate-x-0 pointer-events-auto'
					: 'opacity-0 -translate-x-5 pointer-events-none'
			} transition-all duration-300 bg-zinc-800 shadow-md shadow-zinc-950 w-96 mt-5 p-5 rounded-2xl`}
		>
			<div className="flex items-center">
				<Image
					className="max-w-[2rem]"
					src={deleteItem.app.details.icon}
					alt={`${deleteItem.app.details.name} undo icon`}
				/>
				<p className="ml-4 max-w-[134px] whitespace-nowrap overflow-hidden text-ellipsis">
					{deleteItem.app.details.name}
				</p>
				<p className="pl-2">deleted</p>
				<div className="flex flex-1 relative items-center">
					<div className="flex absolute right-0">
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
			</div>
		</div>
	);
}
