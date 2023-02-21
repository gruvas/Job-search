import React from 'react'
import { useHttp } from '../../../hooks/http.hook'
import { IVacancies } from '../../interface/IVacancies'

const ListCreatedVacancies = (props: {
	index: number
	key?: string
	type: string
	value: IVacancies
}) => {
	let class_name_block
	let vacancies = props.value
	let index: number = props.index
	let type: string = props.type
	let path = document.location.pathname
	let status: boolean = Boolean(vacancies.status) || false

	const { request } = useHttp()

	let storeg = JSON.parse(localStorage.getItem('useData') || 'false')

	if (path === '/') {
		class_name_block = 'listVacancies'
	} else {
		class_name_block = 'list_employees'
	}

	const [job_status, setJobStatus] = React.useState<boolean>(status)
	const [job_delete, setDeleteJob] = React.useState(false)

	function delete_job(vacancies: IVacancies) {
		let id = vacancies._id
		let arr_links_creator = vacancies.links_creator
		let arr_links_user = vacancies.links_user

		if (arr_links_creator) {
			arr_links_creator.forEach((post: string) => {
				request('/api/vacancy/one_creator_delete_link', 'POST', {
					vacancyId: id,
					creatorId: post,
				})
			})
		}

		if (arr_links_user) {
			arr_links_user.forEach((post: string) => {
				request('/api/vacancy/one_user_delete_link', 'POST', {
					vacancyId: id,
					userId: post,
				})
			})
		}

		request('/api/vacancy/delete', 'POST', { id })

		setDeleteJob(true)

		alert('Данная вакансия удалена')
	}

	function update_status(id: string) {
		let intermediate_status = !status

		request('/api/vacancy/status_change', 'POST', {
			id,
			status: intermediate_status,
		})

		setJobStatus(!job_status)
	}

	async function respond(id: string) {
		let userId = storeg.userId

		const compliances_check = request(
			'/api/users/check_links_vacancy',
			'POST',
			{ id, userId }
		)

		compliances_check.then((value) => {
			if (value === null) {
				request('/api/vacancy/respond', 'POST', { id, userId })

				alert('Резюме отправлено на данную вакансию.')
			} else {
				alert('Вы уже откликались на данную вакансию!')
			}
		})
	}

	return (
		<section>
			{job_delete ? (
				<></>
			) : (
				<div>
					{index === 0 && path === '/personal_area_employer' && (
						<h1 className='title'>Список созданных вакансий</h1>
					)}

					<div className={class_name_block}>
						<h1 className='listVacancies_profession'>{vacancies.name}</h1>

						<h1 className='listVacancies_company'>
							{vacancies.name_organization}
						</h1>

						{vacancies.address !== '' && (
							<h1 className='listVacancies_address'>
								Адрес: {vacancies.address}
							</h1>
						)}

						{vacancies.salary !== '' && (
							<h1 className='listVacancies_salary'>
								от {vacancies.salary} руб.
							</h1>
						)}

						{vacancies.experience !== '' && (
							<h1 className='listVacancies_description'>
								{vacancies.experience}
							</h1>
						)}

						{vacancies.employment !== '' && (
							<h1 className='listVacancies_description'>
								{vacancies.employment}
							</h1>
						)}

						{vacancies.description !== '' && (
							<h1 className='listVacancies_description'>
								<p className='list_employees_title bold'>Описание: </p>
								<p>{vacancies.description}</p>
							</h1>
						)}

						{vacancies.responsibilities !== '' && (
							<h1 className='listVacancies_description'>
								<p className='list_employees_title bold'>Обязанности: </p>
								<p>{vacancies.responsibilities}</p>
							</h1>
						)}

						{vacancies.requirements !== '' && (
							<h1 className='listVacancies_description'>
								<p className='list_employees_title bold'>Требования: </p>
								<p>{vacancies.requirements}</p>
							</h1>
						)}

						{vacancies.terms !== '' && (
							<h1 className='listVacancies_description'>
								<p className='list_employees_title bold'>Условия: </p>
								<p>{vacancies.terms}</p>
							</h1>
						)}

						<h1 className='list_employees_contacts'>
							Контакты: {vacancies.contacts}
						</h1>

						{job_status ? (
							<h1 className='status_active'>Активен</h1>
						) : (
							<h1 className='status_not_active'>Не активен</h1>
						)}

						{!!storeg.token && (
							<>
								{type === 'employer' && path === '/personal_area_employer' && (
									<>
										<button
											className='list_employees_btn_delete'
											onClick={() => delete_job(vacancies)}
										>
											Удалить
										</button>
										<button
											className='list_employees_btn_change'
											onClick={() => update_status(vacancies._id)}
										>
											Изменить статус
										</button>
									</>
								)}

								{type === 'workman' && path === '/' && (
									<>
										<button
											className='list_employees_btn_respond'
											onClick={() => respond(vacancies._id)}
										>
											Откликнуться
										</button>
									</>
								)}
							</>
						)}
					</div>
				</div>
			)}
		</section>
	)
}

export default ListCreatedVacancies
