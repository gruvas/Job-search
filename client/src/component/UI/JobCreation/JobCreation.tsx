import { useEffect, useState } from 'react'

import { useHttp } from '../../../hooks/http.hook'
import SalaryValidation from '../../validation/salary_validation'

import arrow_down from '../../../img/arrow_down.svg'

const JobCreation = () => {
	const { request } = useHttp()

	const [isOpen1, setOpen1] = useState(false)
	const [isOpen2, setOpen2] = useState(false)
	const [experience, setExperience] = useState('Требуемый опыт работы')
	const [employment, setEmployment] = useState('Тип занятости')

	const [data_vacancy, setData_vacancy] = useState({
		id: JSON.parse(localStorage.getItem('useData') || 'false').userId,
		name_organization: '',
		name: '',
		address: '',
		salary: '',
		experience: '',
		employment: '',
		description: '',
		responsibilities: '',
		requirements: '',
		terms: '',
		contacts: '',
		status: true,
	})

	useEffect(() => {
		setData_vacancy({ ...data_vacancy, experience, employment })
	}, [employment, experience, data_vacancy])

	const changeHandler = (
		event:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setData_vacancy({
			...data_vacancy,
			[event.target.name]: event.target.value,
		})
	}

	function submitting_job() {
		if (
			data_vacancy.experience !== 'Требуемый опыт работы' &&
			data_vacancy.employment !== 'Тип занятости' &&
			data_vacancy.name_organization !== '' &&
			data_vacancy.name !== '' &&
			data_vacancy.contacts !== ''
		) {
			request('/api/vacancy/session_creation', 'POST', { ...data_vacancy })

			alert('Данная вакансия была размещена на портале')

			window.location.reload()
		} else {
			alert(
				'Необходимо заполнить все поля и выбрать тип занятости, и опыт работы'
			)
		}
	}

	return (
		<div className='job_creation'>
			<h1 className='title'>Создание вакансии</h1>

			<div className='job_creation_indent'>
				<p className='filling_resume_title'>Название работы</p>
				<input
					type='text'
					className='filling_resume_input'
					id='name'
					name='name'
					onChange={changeHandler}
					maxLength={100}
				/>
			</div>

			<div className='job_creation_indent'>
				<p className='filling_resume_name'>Наименование организации</p>
				<input
					type='text'
					className='filling_resume_input'
					id='name_organization'
					name='name_organization'
					onChange={changeHandler}
					maxLength={100}
				/>
			</div>

			<div className='job_creation_indent'>
				<p className='filling_resume_name'>Адрес</p>
				<input
					type='text'
					className='filling_resume_input'
					id='address'
					name='address'
					onChange={changeHandler}
					maxLength={75}
				/>
			</div>

			<div className='job_creation_indent'>
				<p>Зарплата</p>
				<input
					className='filling_resume_input filling_resume_salary'
					type='text'
					id='salary'
					name='salary'
					onChange={changeHandler}
					onKeyPress={SalaryValidation}
					maxLength={15}
				/>
			</div>

			<div
				className='job_creation_indent dropdown_block'
				onClick={() => setOpen1(!isOpen1)}
			>
				<p className='filling_resume_title'>{experience}</p>
				<img
					src={arrow_down}
					alt=''
				/>
			</div>

			{isOpen1 && (
				<>
					<div className='dropdown_menu'>
						<div
							className='dropdown_menu_text'
							onClick={() => {
								setExperience('Не имеет значения')
								setOpen1(false)
							}}
						>
							Не имеет значения
						</div>
						<hr className='dropdown_menu_hr' />
						<div
							className='dropdown_menu_text'
							onClick={() => {
								setExperience('Нет опыта')
								setOpen1(false)
							}}
						>
							Нет опыта
						</div>
						<hr className='dropdown_menu_hr' />
						<div
							className='dropdown_menu_text'
							onClick={() => {
								setExperience('От 1 года до 3 лет')
								setOpen1(false)
							}}
						>
							От 1 года до 3 лет
						</div>
						<hr className='dropdown_menu_hr' />
						<div
							className='dropdown_menu_text'
							onClick={() => {
								setExperience('От 3 до 6 лет')
								setOpen1(false)
							}}
						>
							От 3 до 6 лет
						</div>
						<hr className='dropdown_menu_hr' />
						<div
							className='dropdown_menu_text'
							onClick={() => {
								setExperience('Более 6 лет')
								setOpen1(false)
							}}
						>
							Более 6 лет
						</div>
					</div>
				</>
			)}

			<div
				className='job_creation_indent dropdown_block'
				onClick={() => setOpen2(!isOpen2)}
			>
				<p className='filling_resume_title'>{employment}</p>
				<img
					src={arrow_down}
					alt=''
				/>
			</div>

			{isOpen2 && (
				<>
					<div className='dropdown_menu'>
						<div
							className='dropdown_menu_text'
							onClick={() => {
								setEmployment('Стажировка')
								setOpen2(false)
							}}
						>
							Стажировка
						</div>
						<hr className='dropdown_menu_hr' />
						<div
							className='dropdown_menu_text'
							onClick={() => {
								setEmployment('Полная занятость')
								setOpen2(false)
							}}
						>
							Полная занятость
						</div>
						<hr className='dropdown_menu_hr' />
						<div
							className='dropdown_menu_text'
							onClick={() => {
								setEmployment('Проектная работа')
								setOpen2(false)
							}}
						>
							Проектная работа
						</div>
						<hr className='dropdown_menu_hr' />
						<div
							className='dropdown_menu_text'
							onClick={() => {
								setEmployment('Частичная занятость')
								setOpen2(false)
							}}
						>
							Частичная занятость
						</div>
						<hr className='dropdown_menu_hr' />
						<div
							className='dropdown_menu_text'
							onClick={() => {
								setEmployment('Волонтерство')
								setOpen2(false)
							}}
						>
							Волонтерство
						</div>
					</div>
				</>
			)}

			<div className='job_creation_indent'>
				<p className='filling_resume_title'>Описание</p>
				<textarea
					className='filling_resume_textarea'
					id='description'
					name='description'
					onChange={changeHandler}
					maxLength={499}
				/>
			</div>

			<div className='job_creation_indent'>
				<p className='filling_resume_title'>Обязанности</p>
				<textarea
					className='filling_resume_textarea'
					id='responsibilities'
					name='responsibilities'
					onChange={changeHandler}
					maxLength={499}
				/>
			</div>

			<div className='job_creation_indent'>
				<p className='filling_resume_title'>Требования</p>
				<textarea
					className='filling_resume_textarea'
					id='requirements'
					name='requirements'
					onChange={changeHandler}
					maxLength={499}
				/>
			</div>

			<div className='job_creation_indent'>
				<p className='filling_resume_title'>Условия</p>
				<textarea
					className='filling_resume_textarea'
					id='terms'
					name='terms'
					onChange={changeHandler}
					maxLength={499}
				/>
			</div>

			<div className='job_creation_indent'>
				<p className='filling_resume_title'>Контакты (почта, телефон и т.п.)</p>
				<input
					className='filling_resume_input filling_resume_phone'
					type='text'
					id='contacts'
					name='contacts'
					onChange={changeHandler}
					maxLength={75}
				/>
			</div>

			<button
				className='job_creation_btn'
				onClick={submitting_job}
			>
				Создать вакансию
			</button>
		</div>
	)
}

export default JobCreation
