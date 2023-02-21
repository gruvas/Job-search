import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Header from '../component/UI/Header/Header'
import JobCreation from '../component/UI/JobCreation/JobCreation'
import ListCreatedVacancies from '../component/UI/ListCreatedVacancies/ListCreatedVacancies'
import ListEmployees, {
	IValue,
} from '../component/UI/ListEmployees/ListEmployees'
import { useHttp } from '../hooks/http.hook'

import { IUser } from '../component/interface/IUser'

const PersonalAreaEmployer = () => {
	const { request } = useHttp()

	const [vacancies, setVacancies] = useState<IUser[]>([])
	const [typeUser, setTypeUser] = useState<string>('')
	const [users, setUsers] = useState<IValue[][]>([])

	let useData = JSON.parse(localStorage.getItem('useData') || 'false')
	let user_id: string = useData.userId

	useEffect(() => {
		let intermediate = request('/api/vacancy/vacancy_search', 'POST', {
			user_id,
		})

		intermediate.then((value) => {
			setVacancies(value)
		})

		let user = request('/api/users/user_search', 'POST', { userId: user_id })

		user.then((value) => {
			setTypeUser(value.type)
		})

		const post_search = async () => {
			setUsers(await array_creation(request, user_id))
		}

		post_search()
	}, [])

	return (
		<div>
			<Header />

			<nav className='navbar'>
				<Link
					className='link'
					to='/'
				>
					Перейсти на основную страницу
				</Link>
			</nav>

			<div className='main_content personal_area'>
				{vacancies.map((post, index) => (
					<ListCreatedVacancies
						value={post}
						type={typeUser}
						index={index}
						key={'list_created_vacancies' + post._id}
					/>
				))}

				<JobCreation />

				{users.map((post, index) => (
					<ListEmployees
						value={post}
						index={index}
						key={'list_employees' + post[0]._id + index}
					/>
				))}
			</div>
		</div>
	)
}

export default PersonalAreaEmployer

async function array_creation(request: any, userId: string) {
	let arr_links: string[]
	let arr_users: IValue[][] = []

	let intermediate_vacancy, intermediate_users

	let data = request('/api/users/links_vacancy', 'POST', { userId }).then(
		(value: string[]) => {
			return value
		}
	)

	arr_links = await data

	for (let i = 0; i < arr_links.length; i++) {
		let vacancy = request('/api/vacancy/vacancyid_search', 'POST', {
			id: arr_links[i],
		}).then((value: IValue) => {
			return value
		})

		intermediate_vacancy = await vacancy

		let user = request('/api/vacancy/user_search', 'POST', {
			id: intermediate_vacancy,
		}).then((value: IValue[]) => {
			return value
		})

		intermediate_users = await user

		if (intermediate_users.length !== 0) {
			intermediate_users.vacancy_id = intermediate_vacancy._id

			arr_users.push(intermediate_users)
		}
	}

	return arr_users
}
