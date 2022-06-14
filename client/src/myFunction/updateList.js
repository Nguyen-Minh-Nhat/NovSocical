const updateList = (list, id, data, type) => {
	let newList = [];
	if (type === 'delete') {
		newList = list.filter((item) => item._id !== id);
	} else if (type === 'edit') {
		newList = list.map((item) => {
			if (item.id === id) return data;
			return item;
		});
	}
	return newList;
};
export default updateList;
