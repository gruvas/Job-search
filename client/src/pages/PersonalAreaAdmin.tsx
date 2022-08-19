import { Link } from 'react-router-dom';

import Header from '../component/UI/Header/Header';
import AcceptanceSheet from '../component/UI/AcceptanceSheet/AcceptanceSheet';


const PersonalAreaAdmin = () => {
    
    return (
        <div>
            <Header/>

            <div className='navbar'>
                <Link className='link' to="/">Перейсти на основную страницу</Link>
            </div>

            <h1 className='title personal_area_admin_title'>
                Личный кибинет
            </h1>

            <AcceptanceSheet/>
        </div>
    );
}


export default PersonalAreaAdmin;