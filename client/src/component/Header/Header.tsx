import React from 'react';
import coat_arms_img from '../../img/coat_arms.jpg'
import Authorization from '../Authorization/Authorization';

const Header = () => {
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

                <Authorization/>
            </header>
        </div>
    );
}

export default Header;
