
import { EmailPreview } from "./EmailPreview.jsx"
import { ListActions } from "../cmps/ListActions.jsx";


import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import { IoIosStarOutline } from "react-icons/io";
import { BiEnvelopeOpen } from "react-icons/bi";
import { IoStar } from "react-icons/io5";

export function EmailList({ emails, onRemoveEmail, onSetIsRead, onStaring }) {

    return (
        <>
            <ListActions />
            <ul className="email-list clean-list ">
                {emails.map(email =>
                    <li key={email.id}
                        className={`email-li li-grid ${email.isRead == true ? 'read' : 'unRead'}`}>
                        <div className="star-div" onClick={() => { onStaring(email.id) }}>
                            {email.isStarred === true ? <IoStar className=" star-icon-on" /> : <IoIosStarOutline className="star-icon-off" />}
                        </div>
                        <EmailPreview email={email} />
                        <div className="email-actions hide">
                            <button className="btn tooltip" onClick={() => { onRemoveEmail(email.id) }} datatype="Delete" ><IoTrashOutline className="icon" /></button>
                            <button className="btn tooltip" onClick={() => { onSetIsRead(email.isRead, email.id) }} datatype={`Mark as ${email.isRead == true ? 'unread' : 'read'}`}>
                                {email.isRead == true ? <MdOutlineMarkEmailUnread className="icon" /> : <BiEnvelopeOpen className="icon-action-btn" />}
                            </button>
                        </div>
                    </li>
                )}
            </ul>
        </>
    )
}