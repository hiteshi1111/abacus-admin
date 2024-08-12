import React from 'react'

const Checkbox = ({disabled=false, checked=false, onClick=()=>{}}) => {
    return (
        <label class="container">
            <input disabled={disabled} checked={checked} type="checkbox" onClick={onClick} />
            <div class="checkmark"></div>
        </label>
    )
}

export default Checkbox;