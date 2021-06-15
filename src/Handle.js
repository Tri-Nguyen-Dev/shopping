import { addCart, removeCart } from "./redux/slices/CartSlice"
import { showToastMessage } from "./redux/slices/ThemeSlice"

export const countTotalCart = (carts) => {
    if (!carts) {
        return null
    }
    const totalCart = carts.reduce((total, item) => {
        return total + item.product.price * item.qty
    }, 0)
    return totalCart
}

export const handelRemoveCart = (dispatch, index) => {
    let noti = window.confirm("Do you want to remove item from cart?")
    if (noti) {
        dispatch(removeCart(index))
        dispatch(showToastMessage({
            type: 'error',
            message: 'Removed 1 item from the cart!'
        }))
    }
}

export const handleAddCart = (dispatch, product) => {
    dispatch(addCart({
        product: product,
        qty: 1
    }))
    dispatch(showToastMessage({
        type: 'success',
        message: 'Successfully added to cart'
    }))
}

export const formatMonkey = (monkey) => {
    return monkey.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

export const isInViewport = (elem) => {
    const bounding = elem.getBoundingClientRect();
    return (
        bounding.top <= (window.innerHeight || document.documentElement.clientHeight)
        // bounding.top >= 0 &&
        // bounding.left >= 0 &&
        // bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        // bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};