'use client';

import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Category, { CategoryTypes } from '../components/Category';
import {
	DeletedAppTypes,
	purgeAppFromCategory,
	purgeDeletedApp,
} from '../edit/scripts/delete';
import Undo from '../edit/components/Undo';

const LOCAL_STORAGE_KEY = 'local-categories';

type AppPageProps = {
	edit: boolean;
};

export default function AppPage({ edit }: AppPageProps) {
	const initialCategory = {
		name: 'Category',
		id: uuidv4(),
		apps: [],
	};

	const [categories, setCategories] = useState<CategoryTypes[]>([]);
	const categoriesRef = useRef<CategoryTypes[]>(categories);
	const [deletedApps, setDeletedApps] = useState<DeletedAppTypes[]>([]);
	const deletedAppsRef = useRef<DeletedAppTypes[]>(deletedApps);

	useEffect(() => {
		if (
			typeof window !== 'undefined' &&
			window.localStorage &&
			categories.length > 0
		) {
			window.localStorage.setItem(
				LOCAL_STORAGE_KEY,
				JSON.stringify(categories),
			);
		}

		categoriesRef.current = categories;
	}, [categories]);

	useEffect(() => {
		deletedAppsRef.current = deletedApps;
	}, [deletedApps]);

	useEffect(() => {
		setCategories(() => {
			if (typeof window !== 'undefined' && window.localStorage) {
				const storedData =
					window.localStorage.getItem(LOCAL_STORAGE_KEY);
				return storedData ? JSON.parse(storedData) : [initialCategory];
			} else {
				return [initialCategory];
			}
		});
	}, []);

	function addCategory() {
		const updatedCategories = [...categories];
		const newCategory = {
			name: 'Category',
			id: uuidv4(),
			apps: [],
		};
		updatedCategories.push(newCategory);
		setCategories(updatedCategories);
	}

	function undoChange(appId: string, categoryId: string) {
		const updatedCategories = [...categories];
		const categoryIndex = updatedCategories.findIndex(
			(item) => item.id === categoryId,
		);

		if (categoryIndex !== -1) {
			const updatedApps = [...updatedCategories[categoryIndex].apps];
			const appIndex = updatedApps.findIndex((item) => item.id === appId);

			if (appIndex !== -1) {
				updatedApps[appIndex].active = true;
				updatedCategories[categoryIndex].apps = updatedApps;
				setCategories(updatedCategories);
			}
		}

		setDeletedApps(purgeDeletedApp(appId, deletedApps));
	}

	function cancelUndo(appId: string, categoryId: string) {
		const updatedCategories = [...categoriesRef.current];
		const categoryIndex = updatedCategories.findIndex(
			(item) => item.id === categoryId,
		);

		if (categoryIndex !== -1) {
			const appIndex = updatedCategories[categoryIndex].apps.findIndex(
				(item) => item.id === appId,
			);

			if (appIndex !== -1) {
				setCategories(
					purgeAppFromCategory(
						appIndex,
						categoryId,
						categoriesRef.current,
					),
				);
				setDeletedApps(purgeDeletedApp(appId, deletedAppsRef.current));
			}
		}
	}

	return (
		<>
			{categories.length > 0
				? categories.map((category, index) => (
						<Category
							edit={edit}
							category={category}
							categories={categories}
							setCategories={setCategories}
							deletedApps={deletedApps}
							setDeletedApps={setDeletedApps}
							key={index}
						/>
				  ))
				: null}
			{edit && categories.length > 0 ? (
				<div className="flex justify-center w-full mt-14">
					<div className="relative w-[120px]">
						<div
							onClick={() => addCategory()}
							className="icon-plus cursor-pointer text-5xl hover:text-blue-500 transition-all duration-75"
						></div>
					</div>
				</div>
			) : null}
			<Undo
				deletedApps={deletedApps}
				undoChange={undoChange}
				cancelUndo={cancelUndo}
			/>
		</>
	);
}
