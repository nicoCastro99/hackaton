import React, { useCallback, useEffect, useState, createContext } from "react";

const ToastContext = createContext();

export default ToastContext;

export function ToastContextProvider({ children }) {
	const [toasts, setToasts] = useState([]);

	useEffect(() => {
		if (toasts.length > 0) {
			const timer = setTimeout(
				() => setToasts((toasts) => toasts.slice(1)),
				3000
			);
			return () => clearTimeout(timer);
		}
	}, [toasts]);

	const addToast = useCallback(
		function (message, action = "success") {
			setToasts((toasts) => [...toasts, { message: message, action: action }]);
		},
		[setToasts]
	);

	const getToastBgColor = (action) => {
		switch (action) {
			case "warning":
				return "db9a50";
			case "error":
				return "indianred";

			default:
				return "#67b867";
		}
	};

	const getToastHeader = (action) => {
		switch (action) {
			case "warning":
				return "Attention !";
			case "error":
				return "Erreur !";

			default:
				return "Succès !";
		}
	};

	return (
		<ToastContext.Provider value={addToast}>
			{children}
			<div className="toasts-wrapper">
				{toasts.map((toast, index) => (
					<div
						className="toast"
						key={toast.message + toast.action + index}
						style={{ backgroundColor: getToastBgColor(toast.action) }}
					>
						<span className="title">{getToastHeader(toast.action)}</span>
						<span>
							{toast.message ? toast.message : "Une erreur a été rencontrée veuillez contacter un administrateur"}
						</span>
					</div>
				))}
			</div>
		</ToastContext.Provider>
	);
}
