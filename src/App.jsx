import { Route, Routes, HashRouter as Router } from 'react-router-dom'
import { useLocation, useNavigate, Outlet, useParams } from 'react-router-dom'


import { HomePage } from './pages/HomePage.jsx';
import { AboutUs } from './pages/AboutUs.jsx';
import { EmailIndex } from './pages/EmailIndex.jsx';

import { EmailDetails } from './cmps/EmailDetails.jsx';
import { useEffect } from 'react';

export function App() {


    function HomePage() {
        const navigate = useNavigate()
        useEffect(() => {
            navigate('inbox')
        }, [])


        //navigate
    }

    return (
        <Router>
            <main className='main-container'>
                <Routes>
                    {/* <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutUs />} /> */}
                    {/* <Route path="/" element={<EmailIndex filterBy={filterBy} />} /> */}

                    <Route path="/" element={<HomePage />} />
                    <Route path="/:folder" element={<EmailIndex />}>

                        <Route path="/:folder/:emailId" element={<EmailDetails />} />
                    </Route>



                </Routes>
            </main>
        </Router>
    )
}

