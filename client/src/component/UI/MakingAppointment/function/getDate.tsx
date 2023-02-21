export default function getDate(intermediate: Date): string {
	let date = intermediate
	var days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
	var day = date.getDay()
	return days[day]
}
