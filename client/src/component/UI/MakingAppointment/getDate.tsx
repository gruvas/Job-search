import React, { useEffect, useState } from 'react'
import { useHttp } from '../../../hooks/http.hook'

import { ITime } from '../../interface/ITime'
import { IDate } from '../../interface/IDate'

import getDate from './function/getDate'

let time_segmented: IDate[] = []

let date: Date = new Date()
let intermediate_date = date.getDate() + 1
let intermediate: Date = new Date(
	date.getFullYear(),
	date.getMonth(),
	intermediate_date
)

let visiting_time_obj: IDate = {
	year: intermediate.getFullYear(),
	month: intermediate.getMonth(),
	day: intermediate.getDate(),
	hours: 0,
	minutes: 0,
}

export const Days = () => {
	const { request } = useHttp()

	const [time, setTime] = useState<ITime[]>([])
	const [disabled, setDisabled] = useState(true)
	const [activeBtn, setActiveBtn] = useState<string[]>(['', '', '', '', '', ''])
	let state_variable: string[] = ['', '', '', '', '', '']

	useEffect(() => {
		let data = request('/api/reception_unemployed/time', 'POST')

		data.then((value) => {
			setTime(value)
		})

		let first_time: HTMLElement | null = document.querySelector(
			'.making_appointment_timing_block'
		)
		first_time!.classList.add('active')

		setTimeout(() => {
			day_button(
				`timing_block1`,
				intermediate.getDate(),
				intermediate.getMonth(),
				intermediate.getFullYear()
			)
			setDisabled(false)
		}, 1000)
	}, [])

	useEffect(() => {
		let intermediate_date
		time_segmented = []
		let today: Date = new Date(
			date.getFullYear(),
			date.getMonth(),
			date.getDate()
		)

		if (time !== undefined) {
			for (let i = 0; i < time.length; i++) {
				intermediate_date = new Date(time[i].date)

				if (today > intermediate_date) {
					let _id = time[i]._id
					let unemployed_id = time[i].unemployed

					request('/api/reception_unemployed/delete', 'POST', { _id })

					request('/api/reception_unemployed/user_delete_link', 'POST', {
						unemployed_id: unemployed_id[0],
						reception_unemployed_id: _id,
					})
				}
			}

			for (let i = 0; i < time.length; i++) {
				let local_date: Date = new Date(time[i].date)
				let month, day, hours, minutes: number

				month = local_date.getMonth()
				day = local_date.getDate()
				hours = local_date.getHours()
				minutes = local_date.getMinutes()

				time_segmented.push({
					month,
					day,
					hours,
					minutes,
				})
			}
		}
	}, [time])

	let arr_dom: JSX.Element[] = []
	let arr_data = []

	let now: Date = new Date()
	let year: number = now.getFullYear()
	let month: number = now.getMonth()

	for (let i = 1; i < 31; i++) {
		let date = now.getDate() + i
		let intermediate = new Date(year, month, date)

		arr_data.push({
			day: getDate(intermediate),
			number: intermediate.getDate(),
		})

		arr_dom.push(
			<div
				className='making_appointment_timing_block'
				id={'timing_block' + i}
				key={'making_appointment_timing_block' + i}
				onClick={() =>
					day_button(
						`timing_block${i}`,
						intermediate.getDate(),
						intermediate.getMonth(),
						intermediate.getFullYear()
					)
				}
			>
				<p className='making_appointment_day'>{getDate(intermediate)}</p>
				<p className='making_appointment_date'>{intermediate.getDate()}</p>
			</div>
		)
	}

	let arr_time: JSX.Element[] = []
	let arr: { hours: number; minutes: number; minutes_render: string }[]

	arr = [
		{ hours: 14, minutes: 0, minutes_render: '00' },
		{ hours: 14, minutes: 30, minutes_render: '30' },
		{ hours: 15, minutes: 0, minutes_render: '00' },
		{ hours: 15, minutes: 30, minutes_render: '30' },
		{ hours: 16, minutes: 0, minutes_render: '00' },
		{ hours: 16, minutes: 30, minutes_render: '30' },
	]

	for (let i = 0; i < 6; i++) {
		arr_time.push(
			<button
				id={'timing_btn' + i}
				className={'appointment_timing_right_btn ' + activeBtn[i]}
				key={'timing_btn' + i}
				disabled={disabled}
				onClick={(e) =>
					timing_btn(e, `timing_btn${i}`, arr[i].hours, arr[i].minutes)
				}
			>
				{arr[i].hours + ':' + arr[i].minutes_render}
			</button>
		)
	}

	async function day_button(
		id: string,
		day: number,
		month: number,
		year: number
	) {
		state_variable = ['', '', '', '', '', '']

		visiting_time_obj.year = year
		visiting_time_obj.month = month
		visiting_time_obj.day = day

		let active_day_button = document.querySelectorAll(
			'.making_appointment_timing_block'
		)
		for (let i = 0; i < active_day_button.length; i++) {
			active_day_button[i].classList.remove('active')
		}

		let active_btn = document.querySelector(`#${id}`)
		active_btn!.classList.add('active')

		for (let i = 0; i < time_segmented.length; i++) {
			if (
				visiting_time_obj.month === time_segmented[i].month &&
				visiting_time_obj.day === time_segmented[i].day
			) {
				if (time_segmented[i].hours === 14) {
					if (time_segmented[i].minutes === 0) {
						state_variable[0] = 'inactive'
					}

					if (time_segmented[i].minutes === 30) {
						state_variable[1] = 'inactive'
					}
				}

				if (time_segmented[i].hours === 15) {
					if (time_segmented[i].minutes === 0) {
						state_variable[2] = 'inactive'
					}

					if (time_segmented[i].minutes === 30) {
						state_variable[3] = 'inactive'
					}
				}

				if (time_segmented[i].hours === 16) {
					if (time_segmented[i].minutes === 0) {
						state_variable[4] = 'inactive'
					}

					if (time_segmented[i].minutes === 30) {
						state_variable[5] = 'inactive'
					}
				}
			}
		}

		setActiveBtn(state_variable)
	}

	return (
		<div className='making_appointment_block'>
			<div className='making_appointment_timing'>{arr_dom}</div>

			<div>
				<div className='appointment_timing_right'>{arr_time}</div>

				<button
					className='appointment_timing_right_end'
					disabled={disabled}
					onClick={() => registration_visit(request)}
				>
					Завершить регистрацию
				</button>
			</div>
		</div>
	)
}

function timing_btn(
	e: React.MouseEvent<HTMLButtonElement>,
	id: string,
	hours: number,
	minutes: number
) {
	if (
		document.querySelector(`#${id}`)!.classList.value !==
		'appointment_timing_right_btn inactive'
	) {
		visiting_time_obj.hours = hours
		visiting_time_obj.minutes = minutes

		let btn = document.querySelectorAll('.appointment_timing_right_btn')

		for (let i = 0; i < btn.length; i++) {
			btn[i].classList.remove('active')
		}

		document.querySelector(`#${id}`)!.classList.add('active')
	}
}

function registration_visit(request: any) {
	let date: Date = new Date(
		visiting_time_obj.year || 22,
		visiting_time_obj.month,
		visiting_time_obj.day,
		visiting_time_obj.hours,
		visiting_time_obj.minutes
	)

	if (visiting_time_obj.hours === 0) {
		alert('Необходимо выбрать время')
		return false
	}

	let localStr_id = JSON.parse(localStorage.getItem('useData') || 'false')
	localStr_id = localStr_id.userId

	request('/api/reception_unemployed/session_creation', 'POST', {
		date,
		localStr_id,
	})

	alert(
		'Данное время зарезервировано для посещеия и будет отображено в вашем личном кабинете'
	)

	window.location.reload()
}
