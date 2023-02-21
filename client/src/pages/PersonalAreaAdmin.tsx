import { Link } from 'react-router-dom'

import Header from '../component/UI/Header/Header'
import AcceptanceSheet from '../component/UI/AcceptanceSheet/AcceptanceSheet'

const PersonalAreaAdmin = () => {
	return (
		<section>
			<Header />

			<nav className='navbar'>
				<Link
					className='link'
					to='/'
				>
					Перейсти на основную страницу
				</Link>
			</nav>

			<h1 className='title personal_area_admin_title'>Личный кибинет</h1>

			<AcceptanceSheet />
		</section>
	)
}

export default PersonalAreaAdmin
