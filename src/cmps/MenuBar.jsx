import { NavLink } from "react-router-dom";
import path from "../services/image-path";

const navigationLinks = [
    { to: '/inbox', name: 'Inbox', icon: path.inbox },
    { to: '/sent', name: 'Sent', icon: path.sent },
    { to: '/starred', name: 'Starred', icon: path.starred },
    { to: '/drafts', name: 'Drafts', icon: path.drafts },
    { to: '/trash', name: 'Trash', icon: path.trash },
]
export function MenuBar() {



    return <section className="menu-bar">
        <div className="compose-btn" >
            <img className="icon compose-icon" src={path.edit} />
            <span className="compose">Compose</span>
        </div>

        {navigationLinks.map((folder) => {
            return (
                <NavLink
                    className={'nav-link'}
                    key={folder.name}
                    to={folder.to}>
                    <div className="img-icon"><img className="icon" src={folder.icon} alt={folder.name} /></div>
                    <div className="folder-des"><span className="folder-name">{folder.name}</span> <span className="folder-count"></span></div>
                </NavLink>
            )
        })}

    </section>
}