import { useState, useEffect, MouseEventHandler } from 'react';
import { apps, AppTypes } from '../../scripts/appsManifest';
import { StaticImageData } from 'next/image';
import AppLibrary from './AppLibrary';
import AppDetails from './AppDetails';

type EditModalProps = {
	title: string;
	show: boolean;
	appToEdit?: AppTypes;
	cancel: Function;
	save: Function;
};

export default function EditModal({
	title,
	show,
	appToEdit,
	cancel,
	save,
}: EditModalProps) {
	const [activeApp, setActiveApp] = useState<AppTypes>();

	const modalFadeDuration = 300;

	function closeModal() {
		cancel(false);

		function closeModalDelayed() {
			setActiveApp(undefined);
			document.getElementById('app-library')?.scrollTo(0, 0);
		}

		setTimeout(() => closeModalDelayed(), modalFadeDuration);
	}

	function setActive(icon: StaticImageData) {
		const selectedApp = apps.find(
			(app: AppTypes) => app.details.icon === icon,
		);

		if (appToEdit && selectedApp) {
			selectedApp.id = appToEdit.id;
		}

		if (selectedApp) {
			setActiveApp(selectedApp);
		}
	}

	useEffect(() => {
		if (appToEdit) {
			setActiveApp(appToEdit);
		}
	}, [appToEdit]);

	return (
		<div
			className={`${
				show
					? 'opacity-100 translate-y-0 pointer-events-auto'
					: 'opacity-0 translate-y-4 pointer-events-none'
			} z-50 fixed top-0 left-0 flex justify-center items-center w-full h-full bg-black/50 transition-all duration-${modalFadeDuration}`}
		>
			<div className="flex flex-col items-center p-5 bg-zinc-900 rounded-2xl z-40">
				<div className="flex px-5 pt-3 pb-6 flex-col transition-all">
					<h1 className="pb-7 text-xl">{title}</h1>
					<div className="flex">
						<AppLibrary onClick={setActive} activeApp={activeApp} />
						<AppDetails
							activeApp={activeApp}
							setActiveApp={setActiveApp}
						/>
					</div>
				</div>
				<ActionRow
					activeApp={activeApp}
					save={save}
					cancel={closeModal}
				/>
			</div>
			<div
				onClick={() => closeModal()}
				className="absolute top-0 left-0 w-full h-full z-15"
			></div>
		</div>
	);
}

type ActionRowProps = {
	activeApp?: AppTypes;
	save: Function;
	cancel: Function;
};

function ActionRow({ save, cancel, activeApp }: ActionRowProps) {
	function applySave() {
		if (activeApp) {
			save(activeApp);
		}
		cancel(false);
	}

	return (
		<div className="w-full px-1">
			<div className="flex float-right">
				<Button
					className="select-none text-zinc-400 hover:text-white hover:bg-blue-800"
					onClick={() => cancel(false)}
				>
					Cancel
				</Button>
				<Button
					className="select-none text-blue-500 hover:text-white hover:bg-blue-800"
					onClick={() => applySave()}
				>
					Save
				</Button>
			</div>
		</div>
	);
}

type ButtonProps = {
	className: string;
	onClick: MouseEventHandler<HTMLDivElement>;
	children: string;
};

function Button({ className, onClick, children }: ButtonProps) {
	return (
		<div
			onClick={onClick}
			className={`p-2 mx-1 hover:cursor-pointer transition-colors rounded-lg ${className}`}
		>
			{children}
		</div>
	);
}
