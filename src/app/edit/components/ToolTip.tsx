import { useState, useEffect } from 'react';

type ToolTipTypes = {
	tip: string;
};

export default function ToolTip({ tip }: ToolTipTypes) {
	const [visible, setVisible] = useState(false);

	function closeTip() {
		setVisible(false);
	}

	useEffect(() => {
		setVisible(true);
	}, [tip]);

	useEffect(() => {
		setVisible(true);
	}, []);

	return (
		<div
			className={`${
				visible
					? 'opacity-100 pointer-events-auto'
					: 'opacity-0 pointer-events-none'
			} tip-triangle transition-opacity duration-300 absolute left-[50%] -translate-x-[50%] bg-zinc-700 px-4 py-5 mt-1 mb-5 rounded-xl w-72 flex items-center`}
		>
			<div className="icon-info text-xl text-yellow-300"></div>
			<p className="mx-4 whitespace-wrap">{tip}</p>
			<div
				onClick={() => closeTip()}
				className="icon-cross-standard text-zinc-400 cursor-pointer hover:text-white transition-colors duration-75"
			></div>
		</div>
	);
}
