import Link from 'next/link';

type MenuProps = {
	edit: boolean;
};

export default function Menu({ edit }: MenuProps) {
	return (
		<div
			className={`fixed bottom-0 w-full p-5 ${edit ? 'bg-zinc-800' : ''}`}
		>
			<div className="float-right">
				{edit ? (
					<Button
						className="text-blue-500 hover:text-white hover:bg-blue-800"
						onClick="/"
					>
						Save
					</Button>
				) : (
					<Link href="/edit">
						<div className="icon-cog cursor-pointer text-3xl text-zinc-600 hover:text-white transition-colors duration-75"></div>
					</Link>
				)}
			</div>
		</div>
	);
}

type ButtonProps = {
	className: string;
	onClick: string;
	children: string;
};

function Button({ className, onClick, children }: ButtonProps) {
	return (
		<Link href={onClick}>
			<div
				className={`p-2 hover:cursor-pointer transition-colors rounded-lg ${className}`}
			>
				{children}
			</div>
		</Link>
	);
}
