
import { Link } from "react-router-dom"
import { EmailPreview } from "./EmailPreview.jsx"

import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import { RxEnvelopeOpen } from "react-icons/rx";
import { IoMdStar, IoIosStarOutline } from "react-icons/io";
import { IoStar } from "react-icons/io5";





export function EmailList({ emails, onRemoveEmail, onSetIsRead, onStaring }) {

    return (
        <ul className="email-list clean-list ">
            {emails.map(email =>
                <li key={email.id}
                    className={`email-li li-grid ${email.isRead == true ? 'read' : 'unRead'}`}>
                    <div className="star-div" onClick={() => { onStaring(email.id) }}>
                        {email.isStarred === true ? <IoStar className=" star-icon-on" /> : <IoIosStarOutline className="star-icon-off" />}
                        {/* <IoIosStarOutline className="star-icon-off" /> */}
                        {/* <IoMdStar className=" star-icon-on" /> */}
                    </div>
                    <EmailPreview email={email} />
                    <div className="email-actions hide">
                        <button onClick={() => { onRemoveEmail(email.id) }}><IoTrashOutline className="icon-action-btn" /></button>
                        <button onClick={() => { onSetIsRead(email.isRead, email.id) }} >{email.isRead == true ? <MdOutlineMarkEmailUnread className="icon-action-btn" /> : <RxEnvelopeOpen className="icon-action-btn" />}</button>

                    </div>
                </li>
            )}
        </ul>
    )
}