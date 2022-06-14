import React from 'react';

function ErrorMessage({ message }) {
	return <span className="text-base text-red-500 mt-2">{message}</span>;
}

export default ErrorMessage;
