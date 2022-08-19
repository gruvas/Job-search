import React, { useState } from 'react';

import search_img from '../../../img/search.svg'
import settings_img from '../../../img/settings.svg'
import search_string from '../../../store/search_string';

import LeftCol from '../LeftCol/LeftCol';

const Search = () => {
    const [text, setText] = useState<string>('')
    const [searchParameters, setSearchParameters] = useState<boolean>(false)

    function search_query() {
        search_string.updateText(text)
        search_string.updateState(true)
    }
    
    return (
        <>
            <div className='search'>
                <p>Поиск ваканский</p>

                <div className='search_field'>
                    <input placeholder='Профессия или должность' onChange={(e) => setText(e.target.value)}/>

                    <img src={settings_img} className='search_field_settings' 
                    onClick={() => setSearchParameters(!searchParameters)} alt=''></img>

                    <button onClick={search_query}>
                        <img src={search_img} alt=""/>
                    </button>
                </div>
            </div>

            {searchParameters && (
                <LeftCol value='search'/>
            )}
        </>
    );
}

export default Search;

