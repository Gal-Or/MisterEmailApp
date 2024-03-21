import { Icon } from './Icon.jsx'
import path from '../services/image-path.js'
import { IoSettingsOutline } from "react-icons/io5";
import { BsQuestionCircle } from "react-icons/bs";


export function MoreActions() {

    return (
        <section className="more-symbols">
            <div className='icon-div'>
                <BsQuestionCircle className='icon settings-icon' />
            </div>
            <div className='icon-div'>
                <IoSettingsOutline className='icon support-icon' />
            </div>


            <Icon path={path.googleApps} />
        </section>
    )
}