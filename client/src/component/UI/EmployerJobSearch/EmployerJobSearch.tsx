import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { useHttp } from '../../../hooks/http.hook'

import UserList from '../UserList/UserList'

import sort_options from '../../../store/sort_options'
import search_string from '../../../store/search_string'
import { IUser } from '../../interface/IUser'

const EmployerJobSearch = observer(() => {
	const { request } = useHttp()

	const [dataUser, setDataUser] = useState([])

	useEffect(() => {
		async function detData() {
			let data

			let user = request('/api/users/user_search_active', 'POST').then(
				(value) => {
					return value
				}
			)

			data = await user

			setDataUser(data)
		}

		detData()
	}, [])

	useEffect(() => {
		if (sort_options.state === true) {
			if (sort_options.experience === 'Не имеет значения') {
				let user = request('/api/users/user_search_salary', 'POST', {
					salary: Number(sort_options.salary),
				})

				user.then((value) => {
					setDataUser(value)
				})
			} else {
				let user = request('/api/users/user_search_salary_experience', 'POST', {
					salary: sort_options.salary,
					experience: sort_options.experience,
				})

				user.then((value) => {
					setDataUser(value)
				})
			}

			sort_options.updateState(false)
		}
	}, [sort_options.state])

	useEffect(() => {
		if (search_string.state === true) {
			let user = request('/api/users/user_search_profession', 'POST', {
				text: search_string.text,
			})

			user.then((value) => {
				setDataUser(value)
			})

			search_string.updateState(false)
		}
	}, [search_string.state])

	return (
		<>
			{dataUser.map((post: IUser, index: number) => (
				<UserList
					value={post}
					index={index}
					key={'uesr_list' + post._id}
				/>
			))}
		</>
	)
})

export default EmployerJobSearch
