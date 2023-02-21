import Header from '../component/UI/Header/Header'
import LeftCol from '../component/UI/LeftCol/LeftCol'
import Navbar from '../component/UI/Navbar/Navbar'
import Search from '../component/UI/Search/Search'
import WorkmanJobSearch from '../component/UI/WorkmanJobSearch/WorkmanJobSearch'
import EmployerJobSearch from '../component/UI/EmployerJobSearch/EmployerJobSearch'

const JobSearch = () => {
	let type: string = JSON.parse(localStorage.getItem('useData') || 'false').type

	return (
		<div>
			<Header />
			<Navbar />
			<Search />

			<section className='main_content'>
				<h1 className='main_content_title'>Популярные вакансии</h1>

				<LeftCol value='' />

				{!!type ? (
					<>
						{type === 'workman' && <WorkmanJobSearch />}

						{type === 'employer' && <EmployerJobSearch />}

						{type === 'admin' && <WorkmanJobSearch />}
					</>
				) : (
					<WorkmanJobSearch />
				)}
			</section>
		</div>
	)
}

export default JobSearch
