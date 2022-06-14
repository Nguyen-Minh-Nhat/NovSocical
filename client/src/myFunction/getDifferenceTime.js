const getDifferenceTime = (date) => {
	const newDate = new Date(date);
	const currentDate = new Date();
	const differenceTime = currentDate.getTime() - newDate.getTime();
	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;
	const month = day * 30;
	const year = month * 12;
	const differenceTimeSeconds = Math.floor(differenceTime / second);
	const differenceTimeMinutes = Math.floor(differenceTime / minute);
	const differenceTimeHours = Math.floor(differenceTime / hour);
	const differenceTimeDays = Math.floor(differenceTime / day);
	const differenceTimeMonths = Math.floor(differenceTime / month);
	const differenceTimeYears = Math.floor(differenceTime / year);
	if (differenceTimeSeconds < 60) {
		return {
			differenceNumber: differenceTimeSeconds,
			timeUnit: 'seconds',
		};
	}
	if (differenceTimeMinutes < 60) {
		return {
			differenceNumber: differenceTimeMinutes,
			timeUnit: 'minutes',
		};
	}
	if (differenceTimeHours < 24) {
		return { differenceNumber: differenceTimeHours, timeUnit: 'hours' };
	}
	if (differenceTimeDays < 30) {
		return { differenceNumber: differenceTimeDays, timeUnit: 'days' };
	}

	if (differenceTimeMonths < 12) {
		return { differenceNumber: differenceTimeMonths, timeUnit: 'months' };
	}

	return { differenceNumber: differenceTimeYears, timeUnit: 'years' };
};

export default getDifferenceTime;
