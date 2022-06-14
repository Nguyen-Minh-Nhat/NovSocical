import React, { useEffect, useState } from 'react';
import InputSelect from './InputSelect';

function DatePicker({ setDate, initialValue }) {
	const currentDate = new Date();
	const [maxDay, setMaxDay] = useState(31);
	const [month, setMonth] = useState();
	const [year, setYear] = useState();
	const [day, setDay] = useState();
	const [typeSelect, setTypeSelect] = useState();

	useEffect(() => {
		if (initialValue) {
			const initialDate = new Date(initialValue);
			setDay(initialDate.getDate());
			setMonth(initialDate.getMonth() + 1);
			setYear(initialDate.getFullYear());
		}
	}, []);

	useEffect(() => {
		switch (month) {
			case 2:
				setMaxDay(28);
				break;
			case 4:
			case 6:
			case 9:
			case 11:
				setMaxDay(30);
				break;
			default:
				setMaxDay(31);
		}
	}, [month]);
	useEffect(() => {
		if (month && day && year) {
			const newMonth = month - 1;
			const date = new Date(year, newMonth, day);
			setDate(date);
		}
	}, [month, day, year]);
	return (
		<div>
			<label
				className="text-2xl font-normal text-gray-600 mb-3 dark:text-textColorDark"
				htmlFor="email"
			>
				Date of Birth
			</label>
			<div className="flex space-x-4">
				<InputSelect
					type="Month"
					start={1}
					end={12}
					value={month}
					setValue={setMonth}
					typeSelect={typeSelect}
					setTypeSelect={setTypeSelect}
				/>
				<InputSelect
					type="Day"
					start={1}
					end={maxDay}
					value={day}
					setValue={setDay}
					typeSelect={typeSelect}
					setTypeSelect={setTypeSelect}
				/>
				<InputSelect
					type="Year"
					start={1970}
					end={currentDate.getFullYear()}
					value={year}
					setValue={setYear}
					typeSelect={typeSelect}
					setTypeSelect={setTypeSelect}
				/>
			</div>
		</div>
	);
}

export default DatePicker;
