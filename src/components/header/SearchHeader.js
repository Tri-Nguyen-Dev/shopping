import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

function SearchHeader() {
    const [value, setValue] = useState('')
    const handleChange = (e) => {
        setValue(e.target.value)
    }
    const history = useHistory()
    const handleSearch = (e) => {
        e.preventDefault()
        history.push(`/search?q=${value}`)
    }
    return (

        <form onSubmit={handleSearch}>
            <div className="header__action--form-search">
                <input
                    type="text"
                    value={value}
                    placeholder="WHAT ARE YOU LOOKING FOR ?"
                    onChange={handleChange}
                />

                <button type="submit">
                    <i className="fas fa-search"></i>
                </button>
            </div>
        </form>
    )
}

export default SearchHeader
