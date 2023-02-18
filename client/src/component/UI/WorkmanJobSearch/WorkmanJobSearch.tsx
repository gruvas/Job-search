import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { useHttp } from '../../../hooks/http.hook'
import sort_options from '../../../store/sort_options'

import ListCreatedVacancies from '../ListCreatedVacancies/ListCreatedVacancies'
import search_string from '../../../store/search_string'
import { IUser } from '../../interface/IUser'
import { IVacancies } from '../../interface/IVacancies'

const WorkmanJobSearch = observer(() => {
	const { request } = useHttp()

	let userId = JSON.parse(localStorage.getItem('useData') || 'false').userId

	const [vacancies, setVacancies] = useState<IVacancies[]>([])
	const [typeUser, setTypeUser] = useState<string>('')

	useEffect(() => {
		const user_verification = async () => {
			let data = request('/api/auth/check', 'POST', { id: userId }).then(
				(value) => {
					return value
				}
			)

			let user = await data

			if (user === null) {
				localStorage.removeItem('useData')

				window.location.reload()
			}
		}

		if (userId !== undefined) {
			user_verification()
		}

		let intermediate = request('/api/vacancy/active_vacancy_search', 'POST')

		intermediate.then((value: IVacancies[]) => {
			setVacancies(value)
		})

		let user = request('/api/users/user_search', 'POST', { userId })

		user.then((value: IUser) => {
			setTypeUser(value.type || '')
		})
	}, [])

	useEffect(() => {
		if (sort_options.state === true) {
			if (sort_options.experience === 'Не имеет значения') {
				let intermediate = request(
					'/api/vacancy/vacancy_search_salary',
					'POST',
					{ salary: Number(sort_options.salary) }
				)

				intermediate.then((value: IVacancies[]) => {
					setVacancies(value)
				})
			} else {
				let intermediate = request(
					'/api/vacancy/vacancy_search_salary_experience',
					'POST',
					{ salary: sort_options.salary, experience: sort_options.experience }
				)

				intermediate.then((value: IVacancies[]) => {
					setVacancies(value)
				})
			}

			sort_options.updateState(false)
		}
	}, [sort_options.state])

	useEffect(() => {
		if (search_string.state === true) {
			let intermediate = request('/api/vacancy/vacancy_search_name', 'POST', {
				text: search_string.text,
			})

			intermediate.then((value: IVacancies[]) => {
				setVacancies(value)
			})

			search_string.updateState(false)
		}
	}, [search_string.state])

	return (
		<>
			{vacancies.map((post, index) => (
				<ListCreatedVacancies
					value={post}
					type={typeUser}
					index={index}
					key={post._id}
				/>
			))}
		</>
	)
})

export default WorkmanJobSearch
