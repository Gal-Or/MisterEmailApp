import { useEffect, useState } from "react"

import { emailService } from "../services/EmailService"

import { EmailList } from "../cmps/EmailList"

export function EmailIndex({ filterBy }) {
    const [emails, setEmails] = useState(null)

    useEffect(() => {
        loadEmails()
    }, [filterBy])
    /* use effect listening to changes on filterBy that occure in appHeader*/

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
            <EmailList emails={emails} onRemoveEmail={onRemoveEmail} onSetIsRead={onSetIsRead} onStaring={onStaring} />
        </section>
    )
}