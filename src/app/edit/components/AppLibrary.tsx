import { apps, AppTypes } from '../../scripts/appsManifest';
import { AppItem } from '../../components/Apps';

type AppLibraryProps = {
	onClick: Function;
	activeApp: AppTypes | undefined;
};

export default function AppLibrary({ onClick, activeApp }: AppLibraryProps) {
	return (
		<div className="rounded-2xl outline outline-4 outline-zinc-800 overflow-hidden">
			<div
				id="app-library"
				className="max-h-[32rem] grid grid-cols-4 grid-flow-row gap-8 p-8 overflow-y-auto"
			>
				{apps.map((app: AppTypes) =>
					app.details && app.categoryId ? (
						<AppItem
							name={app.details.name}
							icon={app.details.icon}
							onClick={onClick}
							id={app.id}
							categoryId={app.categoryId}
							key={app.id}
							active={
								app.details.icon === activeApp?.details.icon
							}
						/>
					) : (
						''
					),
				)}
			</div>
		</div>
	);
}
