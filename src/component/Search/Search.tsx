import React from 'react';

import search_img from '../../img/search.svg'
import settings_img from '../../img/settings.svg'

const Search = () => {
    return (
        <div className='search'>
            <p>Поиск ваканский</p>

            <div className='search_field'>
                <input placeholder='Профессия, должность или компания'/>

                <img src={settings_img} className='search_field_settings' alt=''></img>

                <button>
                    <img src={search_img} alt="" />
                </button>
            </div>
        </div>
    );
}

export default Search;
