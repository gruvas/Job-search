const DisplayPassword = (type: string): string => {
	if (type === 'text') {
		return 'password'
	} else {
		return 'text'
	}
}

export default DisplayPassword
