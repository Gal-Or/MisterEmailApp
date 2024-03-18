import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useOutletContext } from "react-router-dom";

import { EmailDetailsActions } from "./EmailDetailsActions";
import { GoogleMap } from "./GoogleMap"

import { emailService } from "../services/EmailService";

import { FaCircleUser } from "react-icons/fa6";


export function EmailDetails() {

    const [email, setEmail] = useState(null)
    const [updateList, setUpdateList] = useState(false)
    const params = useParams()

    const onReadEmailDetails = useOutletContext();

    useEffect(() => {
        loadEmail()
    }, [params.emailId])

    useEffect(() => {
        if (email)
            onEmailChanged()
    }, [email])

    async function loadEmail() {
        try {
            let curEmail = await emailService.getById(params.emailId)
            setEmail({ ...curEmail, isRead: true })
        } catch (err) {
            navigate('/')
            console.log('Error in loadEmail', err)
        }
    }

    async function onEmailChanged() {
        let sevedEmail = await emailService.save(email)
        onReadEmailDetails(sevedEmail)
    }

    if (!email) return <div>Loading..</div>
    return (
        <>
            <EmailDetailsActions />
            <div className="email-details-container">
                <h1 className="subject"> {email.subject}</h1>
                <div className="from-div">
                    <FaCircleUser className="user-icon" />
                    <h3 className="from">{email.from}</h3>
                </div>
                <div className="body-div">
                    <p>{email.body}</p>
                </div>
                <div className="map-div">
                    <h3>Sender Location:</h3>
                    <GoogleMap lat={email.location.lat} lng={email.location.lng} />
                </div>
            </div>
        </>
    )

}