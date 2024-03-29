import React, { useEffect, useState } from 'react'

import { NavLink, Link } from "react-router-dom";
import path from "../services/image-path";

import { utilService } from "../services/util.service"

import { useEffectUpdate } from "../customHooks/useEffectUpdate.js"


const navigationLinks = [
    { path: '/inbox', name: 'Inbox', icon: path.inbox },
    { path: '/sent', name: 'Sent', icon: path.sent },
    { path: '/starred', name: 'Starred', icon: path.starred },
    { path: '/drafts', name: 'Drafts', icon: path.drafts },
    { path: '/trash', name: 'Trash', icon: path.trash },
]
export function MenuBar({ filterBy, onSetFilter, unreadCount, searchParams }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    const params = utilService.getSearchParamsArray(searchParams)
    let composeParam = params["compose"]
    let paramsPath = `?folder=${params["folder"]}&txt=${params["txt"]}&isRead=${params["isRead"]}&${composeParam ? `compose=${composeParam}` : ''}`

    useEffectUpdate(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange(folder) {
        setFilterByToEdit(prevFilter => ({ ...prevFilter, folder: folder }))
    }

    return <section className="menu-bar">
        <Link to={`/${params["folder"]}?folder=${params["folder"]}&txt=${params["txt"]}&isRead=${params["isRead"]}&compose=new`} className='compose-link'>
            <div className="compose-btn" >
                <img className="icon compose-icon" src={path.edit} />
                <span className="compose">Compose</span>
            </div>
        </Link>

        {navigationLinks.map((folder) => {
            return (
                <NavLink
                    className={'nav-link'}
                    key={folder.name}
                    onClick={() => { handleChange(folder.name.toLocaleLowerCase()) }}
                    to={`${folder.path}${paramsPath}`}>
                    {/* check if add search params to path here when the compose open and we navigate betweem folders */}
                    <div className="img-icon"><img className="icon" src={folder.icon} alt={folder.name} /></div>
                    <div className="folder-des"><span className="folder-name">{folder.name}</span><span className="folder-count">{folder.name == 'Inbox' ? `${unreadCount}` : ''}</span></div>
                </NavLink>
            )
        })}

    </section>
}