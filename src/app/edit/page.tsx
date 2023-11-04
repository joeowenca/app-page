'use client';

import { useState } from 'react';
import Category, { CategoryTypes } from '../components/Category';

export default function EditPage() {
	const initialCategory: CategoryTypes = {
		name: 'Category',
		id: '1234',
		apps: [],
	};

	const [categories, setCategories] = useState<CategoryTypes[]>([
		initialCategory,
	]);

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
				: console.log(categories.length)}
		</>
	);
}
