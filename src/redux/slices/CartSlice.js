import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'carts',
    initialState: {
        carts: localStorage.getItem('carts') ? JSON.parse(localStorage.getItem('carts')) : []
    },
    reducers: {
        addCart: (state, action) => {
            let idProductAction = action.payload.product.id;
            let index = state.carts ? state.carts.map((item) => item.product.id).indexOf(idProductAction) : -1;
            if (index !== -1) {
                state.carts[index].qty += action.payload.qty;
            } else {
                state.carts.push(action.payload)
            }

            localStorage.setItem('carts', JSON.stringify(state.carts))
        },
        removeCart: (state, action) => {
            state.carts.splice(action.payload, 1)

            localStorage.setItem('carts', JSON.stringify(state.carts))
        },
        updateQTy: (state, action) => {
            const { qty, index } = action.payload
            state.carts[index].qty = qty

            localStorage.setItem('carts', JSON.stringify(state.carts))
        }
    }
})

const { actions, reducer } = cartSlice

export const { addCart, removeCart, updateQTy } = actions

export default reducer