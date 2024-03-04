import React, { useEffect, useState } from 'react'

export function EmailFilter({ filterBy, onSetFilter }) {
    /* this use state is for two way data binding */
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function handleChange(ev) {
        console.log("value:", ev.target.value);
        let { value, name: field } = ev.target
        if (field === 'isRead' && value === 'all')
            value = null;
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))

    }

    return <div className="filter-container">
        <form className="email-filter" onSubmit={onSubmitFilter} >
            <label >Text
                <input
                    type="text"
                    name="txt"
                    placeholder="Search by text"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />
            </label>

            <select
                name="isRead"
                value={filterByToEdit.isRead === null ? 'all' : filterByToEdit.isRead}
                onChange={handleChange}>
                <option value="all" >All</option>
                <option value="true" >Read</option>
                <option value="false" >Unread</option>
            </select>

            <button>Filter</button>
        </form>
    </div>

}