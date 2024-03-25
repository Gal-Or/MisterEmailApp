import { Icon } from './Icon.jsx'
import path from '../services/image-path.js'
import { IoSettingsOutline } from "react-icons/io5";
import { BsQuestionCircle } from "react-icons/bs";


export function MoreActions() {

    return (
        <section className="more-symbols">
            <div className='icon-div tooltip' datatype='Support'>
                <BsQuestionCircle className='icon support-icon' />
            </div>
            <div className='icon-div tooltip' datatype='Settings'>
                <IoSettingsOutline className='icon settings-icon' />
            </div>


            <Icon path={path.googleApps} />
        </section>
    )
}