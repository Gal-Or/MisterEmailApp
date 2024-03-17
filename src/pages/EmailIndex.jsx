import { useEffect, useState } from "react"
import { useLocation, useNavigate, Outlet, useParams, useSearchParams } from 'react-router-dom'


import { emailService } from "../services/EmailService"

import { AppHeader } from '../cmps/AppHeader.jsx';
import { MenuBar } from '../cmps/MenuBar.jsx';
import { RightSymbols } from '../cmps/RightSymbols.jsx';
import { ListActions } from "../cmps/ListActions.jsx";
import { EmailList } from "../cmps/EmailList"
import { AppFooter } from '../cmps/AppFooter.jsx';
import path from "../services/image-path";


import { eventBusService, showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { EmailCompose } from "../cmps/EmailCompose.jsx";



export function EmailIndex() {
    const params = useParams()
    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams()
    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getFilterFromParams(searchParams))
    const [unreadCount, setUnreadCount] = useState(null)


    const { folder, txt, isRead } = filterBy

    useEffect(() => {
        getUnreadCountFromService()
    })


    useEffect(() => {
        setSearchParams(filterBy)
        //console.log(filterBy);
        loadEmails()
    }, [filterBy])
    /* use effect listening to changes on filterBy that occure in appHeader and menuBar*/

    function addSearchParams(params) {
        setSearchParams(params)
    }


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

    function checkIfMatchToCurFilter(email) {

        //console.log("in func ");
        let isMatch = true
        if (txt != '')
            isMatch = isMatchToTxt(email, txt)

        //console.log("isMatch", isMatch);
        //console.log("isRead", isRead);
        //console.log("isRead === 'null'", isRead === 'null');

        if (isMatch && (isRead == `${email.isRead}` || isRead === 'null')) {
            console.log("in if match");
            switch (folder) {
                case 'sent':
                    return (email.from === emailService.loggedinUser.email && !email.removedAt && email.sentAt) ? true : false
                case 'drafts':
                    return (!email.sentAt && !email.removedAt) ? true : false
                case 'inbox':
                    return (email.to === emailService.loggedinUser.email && !email.removedAt)
            }
        }
        return false
    }

    function checkIfEmailExsist(emailId) {

        let exsist = false
        emails.forEach(email => {
            if (email.id === emailId)
                exsist = true
        });
        return exsist
    }

    async function onComposeEmail(email, okMsg, errMsg) {

        try {
            const savedEmail = await emailService.save(email)
            if (checkIfMatchToCurFilter(savedEmail)) {
                if (checkIfEmailExsist(savedEmail.id))
                    setEmails(prevEmails => prevEmails.map(e => e.id === savedEmail.id ? savedEmail : e))
                else
                    setEmails(prevEmails => [...prevEmails, savedEmail])
            }
            else {
                setEmails(prevEmails => prevEmails.filter(e => e.id !== email.id))
            }
            showSuccessMsg(okMsg)
            return savedEmail

        } catch (err) {
            console.log('Error in onComposeEmail', err)
            showErrorMsg(errMsg)
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

    async function onReadEmailDetails(email) {

        try {
            if (checkIfMatchToCurFilter(email)) {
                setEmails(prevEmails => prevEmails.map(e => {
                    if (e.id == email.id)
                        e.isRead = email.isRead
                    return e
                }))
            }
            else
                setEmails(prevEmails => prevEmails.filter(e => e.id !== email.id))

        } catch (err) {
            console.log('Error in onReadEmailDetails', err)
        }
    }

    if (!emails) return <div>Loading...</div>
    return (
        <section className='main-app' >
            <AppHeader filterBy={{ txt, isRead }} onSetFilter={onSetFilter} />
            <MenuBar filterBy={{ folder }} onSetFilter={onSetFilter} unreadCount={unreadCount} searchParams={searchParams} />
            <RightSymbols />
            <div className="main-content">
                {/* <ListActions /> */}
                {!params.emailId && <EmailList emails={emails} onRemoveEmail={onRemoveEmail} onSetIsRead={onSetIsRead} onStaring={onStaring} />}
                <Outlet context={onReadEmailDetails} />
                {/* outlet is renders the emailDetails cmp */}
                {searchParams.get("compose") && <EmailCompose onComposeEmail={onComposeEmail} />}
            </div>

            {/* <AppFooter /> */}
        </section>
    )
}