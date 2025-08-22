import React, { useState, useEffect } from 'react';

import { CELEBRATION_EVENT_NAME } from '../mocks';

export function Confetti() {
	const [showConfetti, setShowConfetti] = useState(false);

	useEffect(() => {
		const handleCustomEvent = (event) => {
			setShowConfetti(true);
		};

		window.addEventListener(CELEBRATION_EVENT_NAME, handleCustomEvent);

		return () => {
			window.removeEventListener(CELEBRATION_EVENT_NAME, handleCustomEvent);
		};
	}, []);

	if (!showConfetti) return null;

	return (
		<div className="confetti">
			{([...Array(13).keys()]).map((_, index) => <div key={index} className="confetti-piece"></div>)}
		</div>
	)
};
