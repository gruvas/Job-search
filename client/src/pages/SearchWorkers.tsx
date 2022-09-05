import Header from '../component/UI/Header/Header';
import LeftCol from '../component/UI/LeftCol/LeftCol';
import Navbar from '../component/UI/Navbar/Navbar';
import Search from '../component/UI/Search/Search';
import EmployerJobSearch from '../component/UI/EmployerJobSearch/EmployerJobSearch';

const SearchWorkers = () => {
    

    return (
        <div>
            <Header/>
            <Navbar/>
            <Search/>

            <div className='main_content'>
                <h1 className='main_content_title'>Популярные вакансии</h1>
                
                <LeftCol  value=''/>

                <EmployerJobSearch/>
            </div>
        </div>
    );
}

export default SearchWorkers;
