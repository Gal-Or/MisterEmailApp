import { Route, Routes, HashRouter as Router } from 'react-router-dom'

import { HomePage } from './pages/HomePage.jsx';
import { AboutUs } from './pages/AboutUs.jsx';
import { EmailIndex } from './pages/EmailIndex.jsx';

import { EmailDetails } from './cmps/EmailDetails.jsx';

export function App() {

    return (
        <Router>
            <main className='main-container'>
                <Routes>
                    {/* <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutUs />} /> */}
                    {/* <Route path="/" element={<EmailIndex filterBy={filterBy} />} /> */}
                    <Route path="/:folder?" element={<EmailIndex />}>
                        <Route path="/:folder/:emailId" element={<EmailDetails />} />
                    </Route>



                </Routes>
            </main>
        </Router>
    )
}

