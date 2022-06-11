exports.prettifyErrors = (e) =>
	(e.name === "SequelizeValidationError"
		? e.errors
		: Object.values(e.errors)
	).reduce((acc, err) => {
		acc[err.path] = err.message;
		return acc;
	}, {});
