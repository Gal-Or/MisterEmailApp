import { useEffect, useState } from "react"
import { useLocation, useNavigate, Outlet, useParams } from 'react-router-dom'


import { emailService } from "../services/EmailService"

import { AppHeader } from '../cmps/AppHeader.jsx';
import { MenuBar } from '../cmps/MenuBar.jsx';
import { EmailList } from "../cmps/EmailList"
import { AppFooter } from '../cmps/AppFooter.jsx';


export function EmailIndex() {
    const params = useParams()
    const navigate = useNavigate()

    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter(params.folder))

    const { folder, txt, isRead } = filterBy

    useEffect(() => {
        // console.log("params", params);
        // if (!params.folder)
        //     navigate('inbox')

        console.log("filterby:", filterBy);
        loadEmails()
    }, [filterBy])
    /* use effect listening to changes on filterBy that occure in appHeader and menuBar*/


    function onSetFilter(fieldsToUpdate) {
        setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...fieldsToUpdate }))
    }

    async function loadEmails() {

        try {
            const emails = await emailService.query(filterBy)
            console.log(emails);
            setEmails(emails)
        } catch (err) {
            console.log('Error in load emails', err);
        }
    }

    async function onRemoveEmail(emailId) {
        try {
            await emailService.remove(emailId)
            setEmails((prevEmails) => {
                return prevEmails.filter(email => email.id !== emailId)
            })
        } catch (err) {
            console.log('Error in onRemoveEmail', err)
        }
    }

    async function onSetIsRead(isRead, emailId) {

        console.log("in onSetIsRead");
        try {
            let email = await emailService.getById(emailId)
            email.isRead = !isRead
            await emailService.save(email)
            setEmails((prevEmails) => {
                return prevEmails.map(email => {
                    if (email.id == emailId)
                        email.isRead = !isRead
                    return email
                })
            })
        } catch (err) {
            console.log('Error in onSetIsRead', err)
        }
    }

    async function onStaring(emailId) {
        try {
            let email = await emailService.getById(emailId)
            email.isStarred = !email.isStarred
            await emailService.save(email)
            setEmails((prevEmails) => {
                return prevEmails.map(email => {
                    if (email.id == emailId)
                        email.isStarred = !email.isStarred
                    return email
                })
            })
        } catch (err) {
            console.log('Error in onStaring', err)
        }
    }


    if (!emails) return <div>Loading...</div>
    return (
        <section className='main-app' >
            <AppHeader filterBy={{ txt, isRead }} onSetFilter={onSetFilter} />
            <MenuBar filterBy={{ folder }} onSetFilter={onSetFilter} />
            <div className="main-content">

                {!params.emailId && <EmailList emails={emails} onRemoveEmail={onRemoveEmail} onSetIsRead={onSetIsRead} onStaring={onStaring} />}
                <Outlet />
                {/* outlet is renders the emailDetails cmp */}
            </div>

            {/* <AppFooter /> */}
        </section>
    )
}