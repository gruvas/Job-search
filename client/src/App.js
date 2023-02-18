import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './style/App.css'

import JobSearch from './pages/JobSearch';
import Registration from './pages/Registration';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import SearchWorkers from './pages/SearchWorkers';
import PersonalAreaWorkman from './pages/PersonalAreaWorkman';
import PersonalAreaEmployer from './pages/PersonalAreaEmployer';
import PersonalAreaAdmin from './pages/PersonalAreaAdmin';


function App() {
    const { token, login, logout, userId, ready } = useAuth()
    const isAuthenticated = !!token

    let type = JSON.parse(localStorage.getItem('useData') || 'false').type


    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
            <div className="container">
                <Routes>
                    {isAuthenticated ? (
                        <>

                            {type === 'employer' && (
                                <>
                                    <Route path={'/'} element={<JobSearch />} />
                                    <Route path={'/personal_area_employer'} element={<PersonalAreaEmployer />} />
                                    <Route path="*" element={<Navigate replace to="/" />} />
                                </>
                            )}

                            {type === 'workman' && (
                                <>
                                    <Route path={'/'} element={<JobSearch />} />
                                    <Route path={'/personal_area_workman'} element={<PersonalAreaWorkman />} />
                                    <Route path="*" element={<Navigate replace to="/" />} />
                                </>
                            )
                            }

                            {type === 'admin' && (
                                <>
                                    <Route path={'/'} element={<JobSearch />} />
                                    <Route path={'/personal_area_admin'} element={<PersonalAreaAdmin />} />
                                    <Route path="*" element={<Navigate replace to="/" />} />
                                </>
                            )
                            }
                        </>
                    ) : (
                        <>
                            <Route path={'/'} element={<JobSearch />} />
                            <Route path={'/employer'} element={<SearchWorkers />} />
                            <Route path={'/registration'} element={<Registration />} />
                            <Route path="*" element={<Navigate replace to="/" />} />
                        </>
                    )}


                </Routes>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
