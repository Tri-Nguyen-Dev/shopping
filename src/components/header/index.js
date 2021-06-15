import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { countTotalCart, formatMonkey, handelRemoveCart } from '../../Handle'
import { showSidebar } from '../../redux/slices/ThemeSlice'
import './style.scss'
import SearchHeader from './SearchHeader'


function Header() {
    const { carts } = useSelector(state => state.carts)
    const dispatch = useDispatch()

    const [isShowActionList, setIsShowActionList] = useState(false)
    const [isShowListCart, setIsShowListCart] = useState(false)

    const handleShowSetting = () => {
        setIsShowListCart(false)
        setIsShowActionList(!isShowActionList)
    }
    const handelShowListCart = () => {
        setIsShowActionList(false)
        setIsShowListCart(!isShowListCart)
    }

    const handelShowSibar = () => {
        dispatch(showSidebar())
    }


    const refHeader = useRef()
    const refCart = useRef()
    const refSetting = useRef()

    useEffect(() => {
        const heightEle = refHeader.current
        const heightHeight = heightEle.offsetHeight
        const addSticky = () => {
            if (window.pageYOffset >= heightHeight) {
                heightEle.classList.add("sticky")
            } else {
                heightEle.classList.remove("sticky");
            }
        }

        window.addEventListener("scroll", addSticky)
        return () => {
            window.removeEventListener("scroll", addSticky)
        }
    }, [])

    useEffect(() => {
        if (isShowListCart) {
            document.addEventListener('click', handleClick)
        }
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [isShowListCart])

    useEffect(() => {
        if (isShowActionList) {
            document.addEventListener('click', handleClick)
        }
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [isShowActionList])

    const handleClick = (event) => {
        const { target } = event
        if (refCart.current) {
            if (!refCart.current.contains(target)) {
                setIsShowListCart(false)
            }
        }
        if (refSetting.current) {
            if (!refSetting.current.contains(target)) {
                setIsShowActionList(false)
            }
        }
    }



    return (
        <header className="header" ref={refHeader}>
            <div className="grid wide">
                <div className="row header__row">
                    <div className="header__logo">
                        <NavLink to="/">
                            <img src="https://cdn.shopify.com/s/files/1/0328/1597/2488/files/logo_968f7331-5a5e-4d0a-b96c-66a7aad2c3b8_200x.png?v=1605667275" alt="logo-web" />
                        </NavLink>
                    </div>
                    {/* icon-menu-mobile */}
                    <div className="header__menu--icon" onClick={handelShowSibar}>
                        <i className="fas fa-bars"></i>
                    </div>
                    <ul className="header__navbar">
                        <li>
                            <NavLink exact activeClassName="active" to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active" to="/products">Product</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active" to="/carts">Cart</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active" to="/blogs">Blog</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active" to="/blogs">About</NavLink>
                        </li>
                    </ul>
                    <div className="header__action">
                        <span className="header__action--search" >
                            <SearchHeader />
                        </span>
                        <span className="header__action--setting" >
                            <ul ref={refSetting} className={!isShowActionList ? 'header__action--setting--list' : 'header__action--setting--list show'}>
                                <li className="header__action--setting--item">
                                    <i className="fas fa-sign-in-alt"></i>Login
                                </li>
                                <li className="header__action--setting--item"><i className="fas fa-registered"></i>Register Account</li>
                                <li className="header__action--setting--item"><i className="fas fa-check-circle"></i>Check Out</li>
                                <li className="header__action--setting--item"><i className="fas fa-heart"></i>My Wishlist</li>
                                <li className="header__action--setting--item theme">
                                    <span className="dark">Dark</span>
                                    <span className="light">Light</span>
                                </li>
                            </ul>
                            <img onClick={handleShowSetting} src="https://cdn.shopify.com/s/files/1/0328/1597/2488/t/22/assets/icon-account.png?v=14467188443966889471" alt="" />
                        </span>
                        <span className="header__action--cart">
                            <div onClick={handelShowListCart} className="header__action--cart--icon">
                                <img src="https://cdn.shopify.com/s/files/1/0328/1597/2488/t/22/assets/icon-cart-header.png?v=17649940948160480693" alt="" />
                                <span className="header__action--cart--total">{carts.length}</span>
                            </div>
                            <ul ref={refCart} className={!isShowListCart ? 'header__action--cart--list' : 'header__action--cart--list show'}>
                                <div className="header__action--cart--main">
                                    {
                                        carts.map((item, index) => {
                                            return (<li key={index} className="header__action--cart--item">
                                                <div className="header__action--cart--img">
                                                    <img src={item.product.image[0]} alt="" />
                                                </div>
                                                <div className="header__action--cart--content">
                                                    <p className="header__action--cart--name">{item.product.name}</p>
                                                    <div className="header__action--cart--price">
                                                        €{item.product.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                                        <span className="header__action--cart--qty">  x {item.qty}</span>
                                                    </div>
                                                </div>
                                                <span className="header__action--cart--remove" onClick={() => handelRemoveCart(dispatch, index)}>
                                                    <i className="far fa-trash-alt"></i>
                                                </span>
                                            </li>)
                                        })
                                    }

                                </div>

                                <div className="header__action--cart--footer">
                                    <div className="header__action--cart--total-price">
                                        <span>TOTAL:</span>
                                        <span>€{formatMonkey(countTotalCart(carts))}</span>
                                    </div>
                                    <div className="header__action--cart--ckeckout">
                                        <span>CHECK OUT</span>
                                    </div>
                                    <NavLink to="/carts" onClick={handelShowListCart}>
                                        <div className="header__action--cart--view-cart">
                                            VIEW CART
                                        </div>
                                    </NavLink>
                                </div>
                            </ul>
                        </span>
                    </div>
                </div>

            </div>

        </header>
    )
}

export default Header
