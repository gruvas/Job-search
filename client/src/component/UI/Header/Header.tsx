import { useEffect } from 'react';
import { useHttp } from '../../../hooks/http.hook';
import coat_arms_img from '../../../img/coat_arms.jpg'
import { IStorageData } from '../../interface/IStorageData';
import Authorization from '../Authorization/Authorization';
import PersonalArea from './Personal_Area';



const Header = () => {
    let storeg: IStorageData = JSON.parse(localStorage.getItem('useData') || 'false')

    return (
        <div>
            <header className='header'>
                <p className='left_header'>
                    РАБОТА
                    РОССИИ
                    кадровый центр
                </p>

                <p className='center_header'>
                    Интерактивный портал служби занятости населения
                    Орловского района
                </p>

                <img className='coat_arms_img' src={coat_arms_img} alt="" />

                {!!storeg.token ? (
                        <PersonalArea/>
                    )
                    : <Authorization/>
                } 
            </header>
        </div>
    );
}

export default Header;