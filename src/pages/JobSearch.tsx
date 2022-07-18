import React from 'react';
import { BrowserRouter } from "react-router-dom";

import Header from '../component/Header/Header';
import LeftCol from '../component/LeftCol/LeftCol';
import ListVacancies from '../component/ListVacancies/ListVacancies';
import Navbar from '../component/Navbar/Navbar';
import Search from '../component/Search/Search';



const JobSearch = () => {
    return (
        <div>
            <Header/>
            <Navbar/>
            <Search/>

            <div className='main_content'>
                <h1 className='main_content_title'>Популярные вакансии</h1>
                <LeftCol/>
                <ListVacancies/>
            </div>
        </div>
    );
}

export default JobSearch;
