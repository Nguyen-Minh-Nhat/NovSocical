const convertNameImgToPath = (nameImg, type) => {
	return `${process.env.PUBLIC_URL}/assets/uploads/${type}/${nameImg}`;
};
export default convertNameImgToPath;
