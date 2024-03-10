import { useEffect, useState } from "react"
import { useLocation, useNavigate, Outlet, useParams, useSearchParams } from 'react-router-dom'


import { emailService } from "../services/EmailService"

import { AppHeader } from '../cmps/AppHeader.jsx';
import { MenuBar } from '../cmps/MenuBar.jsx';
import { EmailList } from "../cmps/EmailList"
import { AppFooter } from '../cmps/AppFooter.jsx';

import { eventBusService, showErrorMsg, showSuccessMsg } from "../services/event-bus.service"



export function EmailIndex() {
    const params = useParams()
    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams()
    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getFilterFromParams(searchParams))
    const [unreadCount, setUnreadCount] = useState(null)


    const { folder, txt, isRead } = filterBy

    useEffect(() => {
        //getUnreadCountFromService()
    })

    useEffect(() => {
        console.log("start ----------------------------------------");
        setSearchParams(filterBy)
        console.log(filterBy);
        loadEmails()
        console.log("end ----------------------------------------");

    }, [filterBy])
    /* use effect listening to changes on filterBy that occure in appHeader and menuBar*/


    async function getUnreadCountFromService() {
        const count = await emailService.getUnreadCount()
        setUnreadCount(count)
    }

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
            let email = await emailService.getById(emailId)
            if (!email.removedAt) {
                email.removedAt = new Date();
                await emailService.save(email)
                showSuccessMsg('Conversation moved to Trash.')
            } else {
                await emailService.remove(emailId)
                showSuccessMsg('Conversation deleted forever.')
            }



            setEmails((prevEmails) => {
                return prevEmails.filter(email => email.id !== emailId)
            })



        } catch (err) {
            console.log('Error in onRemoveEmail', err)
            showErrorMsg('Could not remove email')

        }
    }

    async function onSetIsRead(isRead, emailId) {

        try {
            let email = await emailService.getById(emailId)
            email.isRead = !isRead
            await emailService.save(email)
            setEmails((prevEmails) => {
                return prevEmails.filter(email => {
                    if (email.id == emailId) {
                        email.isRead = !isRead
                        updateUnreadCount(email)
                        if (email.isRead != searchParams.get('isRead') && searchParams.get('isRead') != 'null') {
                            return false
                        }
                    }
                    return true
                })
            })
        } catch (err) {
            console.log('Error in onSetIsRead', err)
        }
    }

    function updateUnreadCount(email) {
        if (!email.isRead && (email.to === emailService.loggedinUser.email && !email.removedAt))
            setUnreadCount(prevCount => prevCount++)

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
            <MenuBar filterBy={{ folder }} onSetFilter={onSetFilter} unreadCount={unreadCount} />
            <div className="main-content">

                {!params.emailId && <EmailList emails={emails} onRemoveEmail={onRemoveEmail} onSetIsRead={onSetIsRead} onStaring={onStaring} />}
                <Outlet />
                {/* outlet is renders the emailDetails cmp */}
            </div>

            {/* <AppFooter /> */}
        </section>
    )
}