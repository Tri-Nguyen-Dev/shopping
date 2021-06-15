import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hidenModal } from '../../redux/slices/ThemeSlice'
import './style.scss'
import ProductInfo from '../product-info';
function ProductModal() {
    const dispatch = useDispatch()

    const handleRemoveModalProduct = () => {
        dispatch(hidenModal())
    }

    const { isShowModal } = useSelector(state => state.theme)
    const { product } = isShowModal

    const settingsProduct = {
        buy: false
    }
    return (
        <div className="modal">
            <div className="modal__inner">
                <div className="modal__close" onClick={handleRemoveModalProduct}>
                    <i className="far fa-times-circle"></i>
                </div>
                <ProductInfo hidenModal={handleRemoveModalProduct} {...settingsProduct} product={product} />
            </div>
            <div className="overflow"></div>
        </div>
    )
}

export default ProductModal
