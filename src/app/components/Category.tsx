'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AppPage from './AppPage';
import Undo from '../edit/components/Undo';
import { AppTypes } from '../scripts/apps';
import {
	DeletedAppTypes,
	hideApp,
	addDeletedApp,
	purgeApp,
	purgeDeletedApp,
} from '../edit/scripts/delete';

export type CategoryTypes = {
	name: string;
	id: string;
	apps: AppTypes[];
};

type CategoryProps = {
	edit: boolean;
	category: CategoryTypes;
	categories: CategoryTypes[];
	setCategories: Function;
	index: number;
};

export default function Category({
	edit,
	category,
	categories,
	setCategories,
	index,
}: CategoryProps) {
	const [apps, setApps] = useState<AppTypes[]>(category.apps);
	const appsRef = useRef<AppTypes[]>(apps);
	const [deletedApps, setDeletedApps] = useState<DeletedAppTypes[]>([]);
	const deletedAppsRef = useRef<DeletedAppTypes[]>(deletedApps);

	useEffect(() => {
		appsRef.current = apps;
		updateCategories(apps);
	}, [apps]);

	useEffect(() => {
		deletedAppsRef.current = deletedApps;
	}, [deletedApps]);

	function updateCategories(updatedApps: AppTypes[]) {
		const updatedCategories = [...categories];
		updatedCategories[index].apps = updatedApps;
		setCategories(updatedCategories);
	}

	function addApp(app: AppTypes) {
		const updatedApps = [...apps];
		const newApp: AppTypes = {
			details: { ...app.details },
			id: uuidv4(),
			active: true,
		};
		updatedApps.push(newApp);
		setApps(updatedApps);
	}

	function editApp(updatedAppDetails: AppTypes) {
		const updatedApps = [...apps];
		const index = updatedApps.findIndex(
			// To change to a separate ID argument
			(app) => app.id === updatedAppDetails.id,
		);
		const newApp: AppTypes = {
			details: { ...updatedAppDetails.details },
			id: uuidv4(),
			active: true,
		};
		updatedApps[index] = newApp;
		setApps(updatedApps);
	}

	function deleteApp(id: string) {
		const appIndex = apps.findIndex((app: AppTypes) => app.id === id);
		const deletedApp = apps.find((app: AppTypes) => app.id === id);

		if (appIndex !== -1 && deletedApp) {
			setApps(hideApp(appIndex, apps));
			setDeletedApps(addDeletedApp(deletedApp, deletedApps));
		}
	}

	function undoChange(id: string) {
		const appIndex = apps.findIndex((app: AppTypes) => app.id === id);

		if (appIndex !== -1) {
			const updatedApps = [...apps];
			updatedApps[appIndex].active = true;
			setApps(updatedApps);
		}

		setDeletedApps(purgeDeletedApp(id, deletedApps));
	}

	function cancelUndo(id: string) {
		const appIndex = appsRef.current.findIndex(
			(app: AppTypes) => app.id === id,
		);

		if (appIndex !== -1) {
			setApps(purgeApp(appIndex, appsRef.current));
			setDeletedApps(purgeDeletedApp(id, deletedAppsRef.current));
		}
	}

	return (
		<div>
			<CategoryName
				name={category.name}
				categories={categories}
				setCategories={setCategories}
				index={index}
				edit={edit}
			/>
			<AppPage
				apps={apps}
				addApp={addApp}
				edit={edit}
				editApp={editApp}
				handleDelete={deleteApp}
			/>
			<Undo
				deletedApps={deletedApps}
				undoChange={undoChange}
				cancelUndo={cancelUndo}
			/>
		</div>
	);
}

type CategoryNameProps = {
	name: string;
	categories: CategoryTypes[];
	setCategories: Function;
	index: number;
	edit: boolean;
};

function CategoryName({
	name,
	categories,
	setCategories,
	index,
	edit,
}: CategoryNameProps) {
	const [textValue, setTextValue] = useState<string>(name);

	function updateCategoryName(updatedName: string) {
		const updatedCategories = [...categories];
		updatedCategories[index].name = updatedName;
		setCategories(updatedCategories);
	}

	function handleChange(event: FormEvent<HTMLInputElement>) {
		setTextValue(event.currentTarget.value);
		updateCategoryName(event.currentTarget.value);
	}

	return (
		<div className="flex items-center justify-center w-full mt-6">
			{edit ? (
				<input
					className={`text-2xl text-center transition-colors outline-0 hover:cursor-text bg-zinc-800 hover:bg-zinc-700 focus:bg-zinc-700 focus:outline focus:outline-2 focus:outline-blue-600 p-2 pb-2.5 rounded-xl`}
					type="text"
					id="name"
					onChange={handleChange}
					value={textValue}
				></input>
			) : (
				<h1 className="text-center text-2xl p-2 pb-2.5 font-semibold">
					{name}
				</h1>
			)}
		</div>
	);
}
