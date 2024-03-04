import { useEffect, useState } from "react"

import { emailService } from "../services/EmailService"

import { EmailList } from "../cmps/EmailList"
import { EmailFilter } from "../cmps/EmailFilter"




export function EmailIndex() {
    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())


    useEffect(() => {
        loadEmails()
    }, [filterBy])

    function onSetFilter(fieldsToUpdate) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))

    }


    async function loadEmails() {

        try {
            const emails = await emailService.query(filterBy)
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
        console.log("in onStaring");
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

    console.log(emails);
    if (!emails) return <div>Loading...</div>
    return (
        <section className="email-index">
            <EmailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <EmailList emails={emails} onRemoveEmail={onRemoveEmail} onSetIsRead={onSetIsRead} onStaring={onStaring} />
        </section>
    )
}