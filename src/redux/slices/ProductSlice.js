import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "../../api/productApi";

export const fetchAllProducts = createAsyncThunk(
    'products/fetchAllProducts',
    async (params) => {
        try {
            const response = await productApi.getAll(params)
            return response
        } catch (error) {
            console.log("fail", error)
        }
    }
)

export const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: {}
    },
    extraReducers: {
        [fetchAllProducts.fulfilled]: (state, action) => {
            state.products = action.payload
        }
    }
})

const { reducer } = productSlice

export default reducer