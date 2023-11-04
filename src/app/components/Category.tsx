'use client';

import { useState, useEffect, FormEvent, MouseEventHandler } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AppPage from './AppPage';
import { AppTypes } from '../scripts/apps';
import {
	DeletedAppTypes,
	hideApp,
	addDeletedApp,
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
	deletedApps: DeletedAppTypes[];
	setDeletedApps: Function;
};

export default function Category({
	edit,
	category,
	categories,
	setCategories,
	deletedApps,
	setDeletedApps,
}: CategoryProps) {
	const [apps, setApps] = useState<AppTypes[]>(category.apps);

	useEffect(() => {
		updateCategories(apps);
	}, [apps]);

	function updateCategories(updatedApps: AppTypes[]) {
		const updatedCategories = [...categories];
		const categoryIndex = updatedCategories.findIndex(
			(item) => item.id === category.id,
		);
		updatedCategories[categoryIndex].apps = updatedApps;
		setCategories(updatedCategories);
		console.log('categories updated!');
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
			setDeletedApps(addDeletedApp(deletedApp, deletedApps, category.id));
		}
	}

	return (
		<div>
			<CategoryField
				category={category}
				categories={categories}
				setCategories={setCategories}
				edit={edit}
			/>
			<AppPage
				apps={apps}
				addApp={addApp}
				edit={edit}
				editApp={editApp}
				handleDelete={deleteApp}
			/>
		</div>
	);
}

type CategoryFieldProps = {
	category: CategoryTypes;
	categories: CategoryTypes[];
	setCategories: Function;
	edit: boolean;
};

function CategoryField({
	category,
	categories,
	setCategories,
	edit,
}: CategoryFieldProps) {
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const categoryIndex = categories.findIndex(
		(item) => item.id === category.id,
	);

	function updateCategoryName(updatedName: string) {
		const updatedCategories = [...categories];
		updatedCategories[categoryIndex].name = updatedName;
		setCategories(updatedCategories);
	}

	function deleteCategory() {
		const updatedCategories = [...categories];
		updatedCategories.splice(categoryIndex, 1);
		setCategories(updatedCategories);
	}

	function handleChange(event: FormEvent<HTMLInputElement>) {
		updateCategoryName(event.currentTarget.value);
	}

	return (
		<div className="flex items-center justify-center w-full mt-6 mb-4">
			{edit ? (
				<div className="relative flex flex-row items-center">
					<input
						className={`text-2xl font-semibold text-center transition-colors outline-0 hover:cursor-text bg-zinc-800 hover:bg-zinc-700 focus:bg-zinc-700 focus:outline focus:outline-2 focus:outline-blue-600 p-2 pb-2 rounded-xl`}
						type="text"
						id="name"
						onChange={handleChange}
						value={category.name}
					></input>
					{categoryIndex > 0 ? (
						<div
							onClick={() => setShowDeleteModal(true)}
							className="absolute right-0 translate-x-[135%] group/cross select-none cursor-pointer transition-all duration-75 aspect-square w-8 bg-red-500 hover:bg-white rounded-full z-10"
						>
							<div className="icon-cross text-white group-hover/cross:text-red-500 transition-colors duration-75"></div>
						</div>
					) : null}
					<DeleteModal
						show={showDeleteModal}
						confirm={deleteCategory}
						cancel={setShowDeleteModal}
					/>
				</div>
			) : (
				<h1 className="text-center text-2xl p-2 pb-2.5 font-semibold">
					{category.name}
				</h1>
			)}
		</div>
	);
}

type DeleteModalProps = {
	show: boolean;
	confirm: Function;
	cancel: Function;
};

function DeleteModal({ show, confirm, cancel }: DeleteModalProps) {
	const modalFadeDuration = 300;

	function handleConfirm() {
		cancel(false);

		function closeModalDelayed() {
			confirm();
		}

		setTimeout(() => closeModalDelayed(), modalFadeDuration);
	}

	return (
		<div
			className={`${
				show
					? 'opacity-100 translate-y-0 pointer-events-auto'
					: 'opacity-0 -translate-y-4 pointer-events-none'
			} z-50 fixed top-0 left-0 flex justify-center items-center w-full h-full bg-black/50 transition-all duration-${modalFadeDuration}`}
		>
			<div className="flex flex-col items-center justify-center w-96 p-5 bg-zinc-900 rounded-2xl z-40">
				<h1 className="text-2xl font-semibold">Are you sure?</h1>
				<div className="p-5">
					<p>
						Deleting a category will permanently delete all apps
						within it.
					</p>
				</div>
				<ActionRow confirm={handleConfirm} cancel={cancel} />
			</div>
			<div
				onClick={() => cancel(false)}
				className="absolute top-0 left-0 w-full h-full z-15"
			></div>
		</div>
	);
}

type ActionRowProps = {
	confirm: Function;
	cancel: Function;
};

function ActionRow({ confirm, cancel }: ActionRowProps) {
	return (
		<div className="flex">
			<Button
				className="select-none text-red-500 hover:text-white hover:bg-red-500"
				onClick={() => confirm()}
			>
				Delete
			</Button>
			<Button
				className="select-none text-zinc-400 hover:text-white hover:bg-blue-800"
				onClick={() => cancel(false)}
			>
				Cancel
			</Button>
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
