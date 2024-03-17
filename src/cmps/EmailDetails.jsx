import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useOutletContext } from "react-router-dom";


import { emailService } from "../services/EmailService";
import path from "../services/image-path";


import { FaCircleUser } from "react-icons/fa6";


export function EmailDetails() {

    const [email, setEmail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    const onReadEmailDetails = useOutletContext();

    useEffect(() => {
        loadEmail()
    }, [params.emailId])

    async function loadEmail() {
        try {
            let curEmail = await emailService.getById(params.emailId)
            let updateList = false
            if (curEmail.isRead === false) {
                curEmail = { ...curEmail, isRead: true }
                updateList = true
            }
            setEmail(curEmail)
            let sevedEmail = await emailService.save(curEmail)
            if (updateList) {
                console.log("sevedEmail", sevedEmail);
                onReadEmailDetails(sevedEmail)
            }


        } catch (err) {
            navigate('/')
            console.log('Error in loadEmail', err)
        }
    }

    if (!email) return <div>Loading..</div>
    return <div className="email-details-container">
        <section className="actions-section">
            <img className="icon back-icon" src={path.back}
                onClick={() => {
                    // onReadEmailDetails(params.emailId)
                    navigate(-1)
                }} />
        </section>
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