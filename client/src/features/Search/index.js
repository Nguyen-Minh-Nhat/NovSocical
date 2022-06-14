import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../App';
import SearchBar from './SearchBar';

function Search() {
	let navigate = useNavigate();
	const setSearchInput = useContext(SearchContext);

	const handleSearch = (data) => {
		const searchData = data.searchValue.trim();
		if (searchData) {
			setSearchInput(searchData);
			navigate(`/search/?user=${searchData}`);
		}
	};

	return (
		<>
			<SearchBar onSubmit={handleSearch} />
		</>
	);
}

export default Search;
