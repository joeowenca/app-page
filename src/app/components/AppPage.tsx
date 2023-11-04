'use client';

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Image, { StaticImageData } from 'next/image';
import { AppTypes } from '../scripts/apps';
import EditModal from '../edit/components/EditModal';

type AppPageProps = {
	apps: AppTypes[];
	addApp?: Function;
	editApp?: Function;
	edit: boolean;
	handleDelete?: Function;
};

export default function AppPage({
	apps,
	addApp,
	editApp,
	edit,
	handleDelete,
}: AppPageProps) {
	const [showAddModal, setShowAddModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [appToEdit, setAppToEdit] = useState<AppTypes>();

	useEffect(() => {
		if (appToEdit) {
			setShowEditModal(true);
		}
	}, [appToEdit]);

	return (
		<div className="flex justify-center w-full">
			<div className="grid grid-cols-6 grid-flow-row gap-8 p-4 items-center">
				{apps.length > 0
					? apps.map((app: AppTypes) =>
							app.active ? (
								<AppItem
									name={app.details.name}
									icon={app.details.icon}
									onClick={app.details.url}
									id={app.id}
									edit={edit}
									appToEdit={setAppToEdit}
									handleDelete={handleDelete}
									key={uuidv4()}
								></AppItem>
							) : (
								''
							),
					  )
					: ''}

				{edit ? (
					<>
						<div>
							<div className="relative aspect-square w-[120px]">
								<div
									onClick={() => setShowAddModal(true)}
									className="icon-plus cursor-pointer text-5xl hover:text-blue-500 transition-all duration-75"
								></div>
							</div>
						</div>
						{addApp ? (
							<EditModal
								title="Add App"
								show={showAddModal}
								save={addApp}
								cancel={setShowAddModal}
							/>
						) : null}
						{editApp ? (
							<EditModal
								title="Edit App"
								show={showEditModal}
								appToEdit={appToEdit}
								save={editApp}
								cancel={setShowEditModal}
							/>
						) : null}
					</>
				) : null}
			</div>
		</div>
	);
}

type AppItemProps = {
	name: string;
	icon: StaticImageData;
	onClick: string | Function;
	id: string;
	edit?: boolean;
	appToEdit?: Function;
	handleDelete?: Function;
	active?: boolean;
};

function AppItem({
	name,
	icon,
	onClick,
	id,
	edit,
	appToEdit,
	handleDelete,
	active,
}: AppItemProps) {
	function handleOnClick() {
		if (typeof onClick === 'string') {
			if (edit) {
				createAppToEdit();
			} else {
				window.location.href = onClick;
			}
		}

		if (typeof onClick === 'function') {
			onClick(icon);
		}
	}

	function createAppToEdit() {
		const editApp: AppTypes = {
			id: id,
			details: {
				name: name,
				url: typeof onClick === 'string' ? onClick : '',
				icon: icon,
			},
			active: true,
		};

		if (appToEdit) {
			appToEdit(editApp);
		}
	}

	return (
		<div className="group relative">
			{edit ? (
				<div
					onClick={() => {
						handleDelete ? handleDelete(id) : null;
					}}
					className="select-none group/cross cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-75 absolute -top-3 -right-3 aspect-square w-8 bg-red-500 hover:bg-white rounded-full z-10"
				>
					<div className="icon-cross text-white group-hover/cross:text-red-500 transition-colors duration-75"></div>
				</div>
			) : null}
			<div
				onClick={() => handleOnClick()}
				className={`${
					active ? 'outline bg-white/[15%]' : null
				} select-none relative w-[120px] cursor-pointer transition-all duration-75 group-hover:outline outline-4 outline-blue-500 group-hover:bg-white/[15%] rounded-2xl`}
			>
				{icon ? (
					<Image src={icon} alt={name} draggable={false} />
				) : null}
			</div>
		</div>
	);
}

export { AppItem };
