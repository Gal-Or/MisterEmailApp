import { Link } from "react-router-dom";
import { utilService } from "../services/util.service";

import { IoMdStar, IoIosStarOutline } from "react-icons/io";

export function EmailPreview({ email }) {

    const date = new Date(email.sentAt)
    const CurrDate = new Date();


    // console.log("email date  ", date.toDateString())

    return (
        <Link to={`/email/${email.id}`} className='email-prev-link' key={email.id}>
            <article className="email-preview ">
                <span className="from-preview"> {email.from}</span>
                <p className="subject-body-preview"><span className="email-subject">{email.subject}- </span>{email.body}</p>
                <span className="date-preview">{date.getFullYear() < CurrDate.getFullYear() ?
                    date.getFullYear() : `${utilService.monthName(date.getMonth())} ${date.getDate()}`}
                </span>
            </article></Link>)

}