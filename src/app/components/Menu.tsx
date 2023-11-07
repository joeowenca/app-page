import Link from 'next/link';

type MenuProps = {
	edit: boolean;
};

export default function Menu({ edit }: MenuProps) {
	return (
		<div className="fixed bottom-0 w-full p-5">
			{edit ? null : (
				<Link href="/edit">
					<div className="icon-cog float-right cursor-pointer text-3xl text-zinc-600 hover:text-white transition-colors duration-75"></div>
				</Link>
			)}
		</div>
	);
}
