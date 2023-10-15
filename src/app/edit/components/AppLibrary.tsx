import { apps, AppTypes } from '../../scripts/apps';
import { AppItem } from '../../components/AppPage';

type AppLibraryProps = {
	onClick: Function;
	activeApp: AppTypes | undefined;
};

export default function AppLibrary({ onClick, activeApp }: AppLibraryProps) {
	return (
		<>
			<div className="rounded-2xl outline outline-4 outline-zinc-800 overflow-hidden">
				<div
					id="app-library"
					className="max-h-96 grid grid-cols-4 grid-flow-row gap-8 p-8 overflow-y-auto"
				>
					{apps.map((app: AppTypes) =>
						app.details ? (
							<AppItem
								name={app.details.name}
								icon={app.details.icon}
								onClick={onClick}
								id={app.id}
								key={app.id}
								active={app.id === activeApp?.id}
							/>
						) : (
							''
						),
					)}
				</div>
			</div>
		</>
	);
}
