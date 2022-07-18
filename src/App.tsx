import React from 'react';
import './style/App.css'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import JobSearch from './pages/JobSearch';
import Registration from './pages/Registration';


function App(){
    return (
        <div className="container">
            <Routes>
                <Route path={'/'} element={<JobSearch/>}/>
                <Route path={'/registration'} element={<Registration/>}/>
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </div>
    );
}

export default App;
