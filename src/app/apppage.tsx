'use client';

import { v4 as uuidv4 } from 'uuid';
import Image, { StaticImageData } from 'next/image';
import { AppTypes } from './apps-manifest';

type AppPageProps = {
	apps: AppTypes[];
	edit: boolean;
	handleDelete?: Function;
	setModal?: Function;
};

export default function AppPage({
	apps,
	edit,
	handleDelete,
	setModal,
}: AppPageProps) {
	return (
		<div className="flex justify-center w-full">
			<div className="grid grid-cols-6 grid-flow-row gap-8 p-8 items-center">
				{apps.length > 0
					? apps.map((app: AppTypes) => (
							<AppItem
								name={app.details.name}
								icon={app.details.icon}
								url={app.details.url}
								id={app.id}
								edit={edit}
								handleDelete={handleDelete}
								key={uuidv4()}
							></AppItem>
					  ))
					: null}

				{edit ? (
					<div onClick={() => (setModal ? setModal(true) : null)}>
						<div className="relative aspect-square w-[120px]">
							<div className="icon-plus cursor-pointer text-5xl hover:text-blue-500 transition-all duration-75"></div>
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
}

type AppItemProps = {
	name: string;
	icon: StaticImageData;
	url: string | Function;
	id?: string;
	edit?: boolean;
	handleDelete?: Function;
	active?: boolean;
};

function AppItem({
	name,
	icon,
	url,
	id,
	edit,
	handleDelete,
	active,
}: AppItemProps) {
	function handleOnClick() {
		if (typeof url === 'string') {
			window.location.href = url;
		}

		if (typeof url === 'function') {
			url(id);
		}
	}

	return (
		<div className="group relative">
			{edit ? (
				<div
					onClick={() => {
						handleDelete ? handleDelete(id) : null;
					}}
					className="group/cross cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-75 absolute -top-3 -right-3 aspect-square w-8 bg-red-500 hover:bg-white rounded-full z-10"
				>
					<div className="icon-cross text-white group-hover/cross:text-red-500 transition-colors duration-75"></div>
				</div>
			) : null}
			<div
				onClick={() => handleOnClick()}
				className={`${
					active ? 'outline bg-white/[15%]' : null
				} relative w-[120px] cursor-pointer transition-all duration-75 group-hover:outline outline-4 outline-blue-500 group-hover:bg-white/[15%] rounded-2xl`}
			>
				{icon ? <Image src={icon} alt={name} /> : null}
			</div>
		</div>
	);
}

export { AppItem };
