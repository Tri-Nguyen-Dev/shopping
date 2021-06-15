import React, { useState } from 'react'
import './style.scss'

function Qty(props) {
    const { changeQty, index, quantity } = props
    const [qty, setQty] = useState(quantity)

    const handleBlurQty = (e) => {
        if (qty <= 0) {
            setQty(1)
        }
        if (changeQty) {
            changeQty(qty, index)
        }
    }
    const handlePlusQty = () => {
        if (qty) {
            const newQty = parseInt(qty) + 1
            setQty(newQty)
            if (changeQty) {
                changeQty(newQty, index)
            }
        }
    }

    const handleMinusQty = () => {
        if (qty && qty > 1) {
            const newQty = parseInt(qty) - 1
            setQty(newQty)
            if (changeQty) {
                changeQty(newQty, index)
            }
        }
    }

    const handleChangeQty = (e) => {
        setQty(e.target.value)
    }
    return (
        <div className="qty">
            <button onClick={handleMinusQty} className="qty__minus">-</button>
            <input type="number" value={qty} onChange={handleChangeQty} min="1" onBlur={handleBlurQty} />
            <button onClick={handlePlusQty} className="qty__plus">+</button>
        </div>
    )
}

export default Qty
