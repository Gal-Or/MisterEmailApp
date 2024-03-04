import { Route, Routes, HashRouter as Router } from 'react-router-dom'

import { HomePage } from './pages/HomePage.jsx';
import { AboutUs } from './pages/AboutUs.jsx';
import { EmailIndex } from './pages/EmailIndex.jsx';

import { AppHeader } from './cmps/AppHeader.jsx';
import { AppFooter } from './cmps/AppFooter.jsx';

import { EmailDetails } from './cmps/EmailDetails.jsx';


export function App() {

    return (
        <Router>
            <section className='main-app'>
                <AppHeader />

                <main className='main-container'>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/email" element={<EmailIndex />} />
                        <Route path="/email/:emailId" element={<EmailDetails />} />
                    </Routes>
                </main>

                <AppFooter />
            </section>
        </Router>


    )
}

