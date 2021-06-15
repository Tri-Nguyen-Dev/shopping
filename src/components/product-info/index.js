
import React, { useState } from 'react'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addCart } from '../../redux/slices/CartSlice'
import { showToastMessage } from '../../redux/slices/ThemeSlice'
import './style.scss'

function ProductInfo({ product, hidenModal, ...settingsProduct }) {
    const dispatch = useDispatch()
    const { buy } = settingsProduct
    const [qty, setQty] = useState(1)
    const handlePlusQty = () => {
        if (qty >= 1) setQty(qty + 1)
    }
    const handleMinusQty = () => {
        if (qty > 1) setQty(qty - 1)
    }
    const handleBlurQty = (e) => {
        if (!e.target.value || qty <= 0) {
            setQty(1)
        }
    }
    const handleChangeQty = (e) => {
        setQty(e.target.value)
    }
    const [imgIndex, setImgIndex] = useState(0)
    const handleChangeIndexImg = (index) => {
        setImgIndex(index)
    }

    const refImg = useRef()

    const handleMouseImg = (e) => {
        let clientX = e.clientX - e.target.offsetLeft
        let clientY = e.clientX - e.target.offsetTop
        const widthEle = e.target.offsetWidth
        const heightEle = e.target.offsetHeight

        clientX = clientX / widthEle * 100
        clientY = clientY / heightEle * 100
        if (refImg.current) {
            refImg.current.style.transform = `translate(-${clientX}%,-${clientY}%) scale(2)`
        }
    }

    const handleLeaveImg = (e) => {
        if (refImg.current) {
            refImg.current.style.transform = 'translate(-50%,-50%) scale(1)'
        }
    }
    const handleAddCart = () => {
        dispatch(addCart({
            product,
            qty
        }))
        if (hidenModal) hidenModal()
        dispatch(showToastMessage({
            type: 'success',
            message: 'Successfully added to cart'
        }))
    }
    return (
        <div className="product-info">

            {
                buy ? (<div className="product-info__image" onMouseMove={handleMouseImg} onMouseLeave={handleLeaveImg}>
                    {
                        product.image_library ? <img ref={refImg} className="product-info__image--img" alt="" src={product.image_library[imgIndex]} /> : ''
                    }
                </div>)
                    : (

                        <div className="product-info__image--modal">
                            {
                                product.image_library ? <img src={product.image_library[imgIndex]} alt="" /> : ''
                            }
                        </div>
                    )
            }



            <div className="product-info__info">
                <h3 className="product-info__product--name" >{product.name}</h3>
                <p className="product-info__product--price">
                    <span className="product-info__product--price--new">${product.price}</span>
                    <span className="product-info__product--price--old">$550.00</span>
                </p>
                <p className="product-info__product--rating">
                    <span>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                    </span>
                    <span>
                        NO REVIEWS
                    </span>
                </p>
                <div className="product-info__product--info">
                    <div className="product-info__product--info--main">
                        <p>
                            <span>AVAILABILITY: </span>
                            <span className="product-info__product--info--in-stock">IN STOCK <i className="far fa-check-square"></i>  </span>
                        </p>
                        <p>
                            <span >SKU: </span>
                            <span className="product-info__product--info--sku">E-00024</span>
                        </p>
                        <p>
                            <span>COLLECTIONS: </span>
                            <span className="product-info__product--collection">Home page, Living Room</span>
                        </p>
                        <p>
                            <span>TAGS: </span>
                            <span className="product-info__product--tags">PINK</span>
                        </p>
                    </div>
                    <p className="product-info__product--info--description">
                        {product.description}
                    </p>
                </div>
                <div className="product-info__product--qty">
                    <span className="product-info__product--qty--input">
                        <button onClick={handleMinusQty} className="product-info__product--qty--minus">-</button>
                        <input type="number" value={qty} onChange={handleChangeQty} onBlur={handleBlurQty} />
                        <button onClick={handlePlusQty} className="product-info__product--qty--plus">+</button>
                    </span>
                    <span className="product-info__product--qty--wish-list">
                        <span><i className="fas fa-heart"></i></span>
                        <span>ADD TO WISH LIST</span>
                    </span>
                </div>
                <div className="product-info__product--add-to-cart" onClick={handleAddCart}>
                    ADD TO CART
                </div>
                {
                    buy ? (<div className="product-info__product--buy">
                        BUY IT NOW
                    </div>) : ''
                }

                {
                    buy ? (<div className="product-info__image--library">

                        {
                            product.image_library ? product.image_library.map((item, index) => {
                                return (<div key={index} onClick={() => handleChangeIndexImg(index)} className={index === imgIndex ? 'image-library__item active' : 'image-library__item'}>
                                    <img src={item} alt="" />
                                </div>)
                            }) : ''
                        }

                    </div>) : ''
                }

            </div>
        </div>
    )
}

export default ProductInfo
