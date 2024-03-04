import React, { useEffect, useState } from 'react'

import { IoIosSearch } from "react-icons/io";

export function EmailFilter({ filterBy, onSetFilter }) {
    /* this use state is for two way data binding */
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onSubmitFilter(ev) {
        // ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function handleChange(ev) {
        //console.log("value:", ev.target.value);
        let { value, name: field } = ev.target
        if (field === 'isRead' && value === 'all')
            value = null;
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))

    }

    return <div className="filter-container">
        {/* <form className="email-filter" onSubmit={onSubmitFilter} > */}
        <div className="search-by-txt">
            <button className="search-btn" onClick={() => onSubmitFilter()}><IoIosSearch className="icon" /></button>
            <input
                className="search-inp"
                type="text"
                name="txt"
                placeholder="Search by text"
                value={filterByToEdit.txt}
                onChange={handleChange}
            />
        </div>

        <select className="isRead-inp"
            name="isRead"
            value={filterByToEdit.isRead === null ? 'all' : filterByToEdit.isRead}
            onChange={handleChange}>
            <option value="all" >All</option>
            <option value="true" >Read</option>
            <option value="false" >Unread</option>
        </select>

        {/* <button on onClick={() => onSubmitFilter()}>Filter</button> */}
        {/* </form> */}
    </div>

}