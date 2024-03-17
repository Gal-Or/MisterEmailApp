import path from "../services/image-path";

import { useNavigate } from 'react-router';
import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from "react-router-dom";

import { emailService } from '../services/EmailService';

export function EmailCompose({ onComposeEmail }) {

    const navigate = useNavigate()
    let ref = useRef()

    const [email, setEmail] = useState(emailService.createEmail())
    const [searchParams, setSearchParams] = useSearchParams()

    const eid = searchParams.get('compose')

    useEffect(() => {
        if (eid !== 'new') {
            //console.log("eid:", eid);
            loadEmail()
        }
    }, [])

    useEffect(() => {
        console.log("email update!");
        saveEditDraft()
    }, [email])

    async function loadEmail() {

        try {
            let e = await emailService.getById(eid)
            setEmail(e)
        } catch (err) {
            console.log('error in load email', err);
        }
    }

    async function saveEditDraft() {
        try {
            if (ref.current) {
                clearTimeout(ref.current)
                ref.current = null
            }
            ref.current = setTimeout(async () => {
                let e = await onComposeEmail(email, 'Email saved to drafts.', 'Could not save email.')
                if (!email.id)
                    setEmail(e)
            }, 5000)
        } catch (err) {
            console.log('error in saveEditDraft', err);
        }
    }

    async function handleChange(ev) {
        let { value, name: field, type } = ev.target
        //value = type === 'number' ? +value : value
        setEmail(prev => ({ ...prev, [field]: value }))
    }

    async function sendEmail(ev) {
        ev.preventDefault()
        onComposeEmail({ ...email, sentAt: new Date() }, 'Email sent.', 'Cold not send email.')
        navigate(-1)
    }

    return (
        <section className="email-compose">
            <div className="compose-layout">
                <div className='header-container'>
                    <header >New Message</header>
                    <span className='icon-span' onClick={() => navigate(-1)} >
                        <img className={'icon'}
                            src={path.x}
                            alt={'x'} />
                    </span>
                </div>
                <form className="compose-form" action="" onSubmit={(ev) => sendEmail(ev)}>
                    <input required className="to-inp" type="text" onChange={handleChange}
                        name='to' value={email.to} placeholder='To' />

                    <input required className="subj-inp" type="text" onChange={handleChange}
                        name='subject' value={email.subject} placeholder='Subject' />

                    <textarea required className="body-inp txt-area" name="body" value={email.body} onChange={handleChange}
                        id=""  ></textarea>

                    <div className="actions">
                        <button className="send-btn">Send</button>
                    </div>
                </form>

            </div>
        </section >
    )
}