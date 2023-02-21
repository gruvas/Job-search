import { Link } from 'react-router-dom'

const Navbar = () => {
	let storeg = JSON.parse(localStorage.getItem('useData') || 'false')
	let pathname: string = document.location.pathname

	return (
		<>
			{!!storeg.token ? (
				storeg.type === 'workman' ? (
					<nav className='navbar'>
						<Link
							className='link'
							to='personal_area_workman'
						>
							Личный кабинет
						</Link>
					</nav>
				) : storeg.type === 'employer' ? (
					<nav className='navbar'>
						<Link
							className='link'
							to='personal_area_employer'
						>
							Личный кабинет
						</Link>
					</nav>
				) : (
					<nav className='navbar'>
						<Link
							className='link'
							to='personal_area_admin'
						>
							Личный кабинет
						</Link>
					</nav>
				)
			) : (
				<>
					{pathname === '/' ? (
						<nav className='navbar'>
							<Link
								className='link active'
								to='/'
							>
								Соискателям
							</Link>
							<Link
								className='link'
								to='employer'
							>
								Работодателям
							</Link>
						</nav>
					) : (
						<nav className='navbar'>
							<Link
								className='link'
								to='/'
							>
								Соискателям
							</Link>
							<Link
								className='link active'
								to='employer'
							>
								Работодателям
							</Link>
						</nav>
					)}
				</>
			)}
		</>
	)
}

export default Navbar
