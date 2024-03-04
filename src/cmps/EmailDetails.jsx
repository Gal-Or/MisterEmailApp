import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import { emailService } from "../services/EmailService";

import { FaCircleUser } from "react-icons/fa6";


export function EmailDetails() {

    const [email, setEmail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadEmail()
    }, [params.emailId])

    async function loadEmail() {
        try {
            let curEmail = await emailService.getById(params.emailId)

            if (curEmail.isRead === false)
                curEmail = { ...curEmail, isRead: true }

            setEmail(curEmail)
            emailService.save(curEmail)

        } catch (err) {
            navigate('/email')
            console.log('Error in loadEmail', err)
        }
    }

    if (!email) return <div>Loading..</div>
    return <div className="email-details-container">
        <h1> {email.subject}</h1>
        <div className="from-div">
            <FaCircleUser className="user-icon" />
            <h3 className="from">{email.from}</h3>
        </div>
        <div>
            <p>{email.body}</p>
        </div>
    </div>

}