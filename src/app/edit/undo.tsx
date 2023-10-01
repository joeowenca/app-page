import { useState } from 'react';

type UndoModalProps = {
	undoChange: Function;
};

export default function UndoModal({ undoChange }: UndoModalProps) {
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
