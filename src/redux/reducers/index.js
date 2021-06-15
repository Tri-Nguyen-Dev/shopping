import { combineReducers } from "redux";
import ThemeRuducer from '../slices/ThemeSlice'
import ProductReducer from '../slices/ProductSlice'
import CartReducer from '..//slices/CartSlice'

const rootReducer = combineReducers({
    theme: ThemeRuducer,
    products: ProductReducer,
    carts: CartReducer
})

export default rootReducer