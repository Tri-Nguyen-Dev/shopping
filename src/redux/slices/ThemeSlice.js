import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name: 'sidebar',
    initialState: {
        isShowSidebar: false,
        isShowModal: {
            isShow: false,
            product: {}
        },
        isShowToastMessage: {
            isShow: false,
            type: '',
            message: ''
        }
    },
    reducers: {
        showSidebar: (state, action) => {
            state.isShowSidebar = !state.isShowSidebar
        },
        hidenSidebar: (state, action) => {
            state.isShowSidebar = false
        },
        showModal: (state, action) => {
            state.isShowModal.isShow = !state.isShowModal.isShow
            state.isShowModal.product = action.payload
        },
        hidenModal: (state, acton) => {
            state.isShowModal.isShow = false
        },
        showToastMessage: (state, action) => {
            state.isShowToastMessage = {
                isShow: true,
                type: action.payload.type,
                message: action.payload.message
            }

        },
        hidenToastMessage: (state, action) => {
            state.isShowToastMessage.isShow = false
        },
    }
})

const { actions, reducer } = themeSlice

export const { showSidebar, hidenSidebar, showModal, hidenModal, showToastMessage, hidenToastMessage } = actions
export default reducer