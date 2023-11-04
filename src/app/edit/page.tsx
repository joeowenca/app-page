'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Category, { CategoryTypes } from '../components/Category';

export default function EditPage() {
	const initialCategory = {
		name: 'Category',
		id: uuidv4(),
		apps: [],
	};

	const [categories, setCategories] = useState<CategoryTypes[]>([
		initialCategory,
	]);

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

	return (
		<>
			{categories.length > 0
				? categories.map((category, index) => (
						<Category
							edit={true}
							category={category}
							categories={categories}
							setCategories={setCategories}
							index={index}
							key={index}
						/>
				  ))
				: null}
			<div className="flex justify-center w-full mt-14">
				<div className="relative w-[120px]">
					<div
						onClick={() => addCategory()}
						className="icon-plus cursor-pointer text-5xl hover:text-blue-500 transition-all duration-75"
					></div>
				</div>
			</div>
		</>
	);
}
