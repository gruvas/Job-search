import { Link } from 'react-router-dom'

const Navbar = () => {
	let storeg = JSON.parse(localStorage.getItem('useData') || 'false')
	let pathname: string = document.location.pathname

	return (
		<div>
			{!!storeg.token ? (
				storeg.type === 'workman' ? (
					<div className='navbar'>
						<Link
							className='link'
							to='personal_area_workman'
						>
							Личный кабинет
						</Link>
					</div>
				) : storeg.type === 'employer' ? (
					<div className='navbar'>
						<Link
							className='link'
							to='personal_area_employer'
						>
							Личный кабинет
						</Link>
					</div>
				) : (
					<div className='navbar'>
						<Link
							className='link'
							to='personal_area_admin'
						>
							Личный кабинет
						</Link>
					</div>
				)
			) : (
				<div>
					{pathname === '/' ? (
						<div className='navbar'>
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
						</div>
					) : (
						<div className='navbar'>
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
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default Navbar
