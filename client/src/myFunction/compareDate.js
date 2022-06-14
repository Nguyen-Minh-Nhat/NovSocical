const compareDate = (a, b) => {
	const date1 = Date(a);
	const date2 = Date(b);
	return date1 > date2 ? 1 : -1;
};

export default compareDate;
