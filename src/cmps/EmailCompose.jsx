import path from "../services/image-path";

import { useNavigate } from 'react-router';
import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from "react-router-dom";

import { emailService } from '../services/EmailService';
import { utilService } from "../services/util.service";

import { useEffectUpdate } from "../customHooks/useEffectUpdate.js"

export function EmailCompose({ onComposeEmail }) {

    let saveEmail = useRef(false)
    let ref = useRef()
    const navigate = useNavigate()

    const [email, setEmail] = useState(emailService.createEmail())
    const [searchParams, setSearchParams] = useSearchParams()

    const params = utilService.getSearchParamsArray(searchParams)
    let backPath = `/${params["folder"]}?folder=${params["folder"]}&txt=${params["txt"]}&isRead=${params["isRead"]}`

    let to = null
    let subject = null

    const eid = searchParams.get('compose')

    useEffect(() => {
        console.log("in effect compose");
        if (eid !== 'new') {
            loadEmail()
        } else {
            to = searchParams.get('to')
            subject = searchParams.get('subject')
            setEmail(prev => ({ ...prev, to: searchParams.get('to'), subject: searchParams.get('subject') }))
        }
    }, [])

    useEffectUpdate(() => {
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
        // console.log("saveEmail=", saveEmail.current);
        if (!saveEmail.current)
            return

        try {
            if (ref.current) {
                clearTimeout(ref.current)
                ref.current = null
            }
            ref.current = setTimeout(async () => {
                let e = await onComposeEmail(email, 'Email saved to drafts.', 'Could not save email.')
                if (!email.id)
                    email.id = e.id //setEmail(e)
            }, 5000)
        } catch (err) {
            console.log('error in saveEditDraft', err);
        }
    }

    async function handleChange(ev) {
        let { value, name: field, type } = ev.target
        //value = type === 'number' ? +value : value
        saveEmail.current = true
        setEmail(prev => ({ ...prev, [field]: value }))
    }

    async function sendEmail(ev) {
        ev.preventDefault()
        onComposeEmail({ ...email, sentAt: new Date() }, 'Email sent.', 'Cold not send email.')
        navigate(backPath)
    }

    function changeComposeSize() {
        if (document.querySelector('.compose-layout').classList.contains('expand')) {
            document.querySelector('.compose-layout').classList.remove('expand')
            document.querySelector('.email-compose').classList.remove('expand-bg')
            document.querySelector('.compose-size').src = path.expend
        } else {
            document.querySelector('.compose-layout').classList.add('expand')
            document.querySelector('.email-compose').classList.add('expand-bg')
            document.querySelector('.compose-size').src = path.deExpand
        }
    }

    return (
        <section className="email-compose">
            <div className="compose-layout small">
                <div className='header-container'>
                    <header >New Message</header>
                    <div className="window-actions">
                        <img className={'img-icon'}
                            src={path.minimize}
                            alt={'_'} />
                        <img className={'img-icon compose-size'}
                            src={path.expend}
                            alt={'expend'}
                            onClick={() => changeComposeSize()} />
                        <img className={'img-icon'}
                            src={path.x}
                            alt={'x'}
                            onClick={() => navigate(backPath)} />
                    </div>

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