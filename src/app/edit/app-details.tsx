import { useState, useEffect, FormEvent } from 'react';
import { AppTypes } from '../apps-manifest';

type AppDetailsProps = {
	activeApp?: AppTypes;
	setActiveApp: Function;
};

export default function AppDetails({
	activeApp,
	setActiveApp,
}: AppDetailsProps) {
	return (
		<div>
			{activeApp ? (
				<>
					<h1 className="py-5 text-xl">App Details</h1>
					<form className="flex flex-col">
						<AppDetailsField
							label="Name"
							defaultValue={activeApp.details.name}
							activeApp={activeApp}
							setActiveApp={setActiveApp}
							width="[12rem]"
						/>
						<AppDetailsField
							label="URL"
							defaultValue={activeApp.details.url}
							activeApp={activeApp}
							setActiveApp={setActiveApp}
							width="sm"
						/>
					</form>
				</>
			) : null}
		</div>
	);
}

type AppDetailsFieldProps = {
	label: 'Name' | 'URL';
	defaultValue: string;
	activeApp?: AppTypes;
	setActiveApp: Function;
	width?: string;
};

function AppDetailsField({
	label,
	defaultValue,
	activeApp,
	setActiveApp,
	width,
}: AppDetailsFieldProps) {
	const [textValue, setTextValue] = useState<string>(defaultValue);

	function handleChange(event: FormEvent<HTMLInputElement>) {
		setTextValue(event.currentTarget.value);

		if (label === 'Name' && activeApp) {
			const newActiveApp: AppTypes = {
				details: {
					name: event.currentTarget.value,
					url: activeApp.details.url,
					icon: activeApp.details.icon,
				},
				id: activeApp.id,
				active: activeApp.active,
			};
			setActiveApp(newActiveApp);
		}

		if (label === 'URL' && activeApp) {
			const newActiveApp: AppTypes = {
				details: {
					name: activeApp.details.name,
					url: event.currentTarget.value,
					icon: activeApp.details.icon,
				},
				id: activeApp.id,
				active: activeApp.active,
			};
			setActiveApp(newActiveApp);
		}
	}

	useEffect(() => {
		setTextValue(defaultValue);
	}, [activeApp]);

	return (
		<>
			<label className="pb-1">{label}</label>
			<input
				className={`transition-colors outline-0 hover:cursor-text bg-zinc-800 hover:bg-zinc-700 focus:bg-zinc-700 p-2 mb-5 max-w-${width} rounded-xl`}
				type="text"
				id="name"
				onChange={handleChange}
				value={textValue}
			></input>
		</>
	);
}
