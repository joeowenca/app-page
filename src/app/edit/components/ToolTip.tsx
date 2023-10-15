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
	}, []);

	return (
		<div
			className={`${
				visible
					? 'opacity-100 pointer-events-auto'
					: 'opacity-0 pointer-events-none'
			} transition-opacity duration-300 bg-zinc-800 p-2 mb-5 rounded-xl flex items-center w-48`}
		>
			<div className="icon-info mr-2 text-yellow-300"></div>
			<p>{tip}</p>
			<div
				onClick={() => closeTip()}
				className="icon-cross-standard"
			></div>
		</div>
	);
}
