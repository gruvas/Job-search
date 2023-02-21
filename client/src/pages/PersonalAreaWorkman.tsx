import { Link } from 'react-router-dom'
import FillingResume from '../component/UI/FillingResume/FillingResume'
import Header from '../component/UI/Header/Header'
import MakingAppointment from '../component/UI/MakingAppointment/MakingAppointment'

const PersonalAreaWorkman = () => {
	return (
		<>
			<Header />

			<nav className='navbar'>
				<Link
					className='link'
					to='/'
				>
					Перейти на основную страницу
				</Link>
			</nav>

			<div className='main_content personal_area'>
				<FillingResume />

				<hr className='personal_area_hr' />

				<MakingAppointment />
			</div>
		</>
	)
}

export default PersonalAreaWorkman
