import { Route, Routes, HashRouter as Router, Navigate } from 'react-router-dom'
import { useLocation, useNavigate, Outlet, useParams } from 'react-router-dom'


import { HomePage } from './pages/HomePage.jsx';
import { AboutUs } from './pages/AboutUs.jsx';
import { EmailIndex } from './pages/EmailIndex.jsx';

import { UserMsg } from './cmps/UserMsg.jsx'

import { EmailDetails } from './cmps/EmailDetails.jsx';
import { EmailCompose } from './cmps/EmailCompose.jsx';
import { useEffect } from 'react';

export function App() {


    // function HomePage() {
    //     // const navigate = useNavigate()
    //     // useEffect(() => {
    //     //     navigate('inbox')
    //     // }, [])
    //     return <h1>home page</h1>
    // }

    return (
        <Router>
            <main className='main-container'>
                <Routes>
                    {/* <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutUs />} /> */}
                    {/* <Route path="/" element={<EmailIndex filterBy={filterBy} />} /> */}

                    <Route index path="/home" element={<HomePage />} />
                    <Route path="/" element={<Navigate to={"/inbox"} />} />
                    <Route path="/:folder" element={<EmailIndex />}>

                        <Route path="/:folder/:emailId" element={<EmailDetails />} />
                        {/* <Route path="/:folder/compose" element={<EmailCompose />} /> */}
                    </Route>
                </Routes>
            </main>
            <UserMsg />
        </Router>
    )
}

