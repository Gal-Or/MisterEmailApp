import { Link } from 'react-router-dom'

import { EmailFilter } from "../cmps/EmailFilter"
import { MoreActions } from './MoreActions';

import { GiHamburgerMenu } from "react-icons/gi";


export function AppHeader({ filterBy, onSetFilter }) {


    return (
        <header className="app-header">
            <div className="menu-logo">
                <GiHamburgerMenu className="menu-icon" />
                <img className="gmail-logo" src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png" srcSet="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png 1x, https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_2x_r5.png 2x " alt="" aria-hidden="true" role="presentation" ></img>
            </div>
            <div className="center-div">
                <EmailFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                <MoreActions />
            </div>
        </header>
    )
}


