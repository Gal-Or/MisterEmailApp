import path from "../services/image-path";

import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { emailService } from '../services/EmailService';

export function EmailCompose() {
    const navigate = useNavigate()
    const [form, setForm] = useState(emailService.createEmail())

    useEffect(() => {
    }, [form])


    async function onSubmit(ev) {
        ev.preventDefault()
        await emailService.save(form)
        navigate(-1)
    }

    function handleChange(ev) {
        let { value, name: field, type } = ev.target
        value = type === 'number' ? +value : value
        setForm(prev => ({ ...prev, [field]: value }))
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
                <form className="compose-form" action="" onSubmit={(ev) => onSubmit(ev)}>


                    <input required className="to-inp" type="text" onChange={handleChange}
                        name='to' value={form.to} placeholder='To' />

                    <input required className="subj-inp" type="text" onChange={handleChange}
                        name='subject' value={form.subject} placeholder='Subject' />

                    <textarea required className="body-inp txt-area" name="body" onChange={handleChange}
                        id="" value={form.body} ></textarea>

                    <div className="actions">
                        <button className="send-btn">Send</button>
                    </div>

                </form>

            </div>
        </section >
    )
}