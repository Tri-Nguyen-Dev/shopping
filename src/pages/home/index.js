import React, { useEffect, useRef } from 'react'
import Banner from '../../components/banner'
import './style.scss'
import ProductSlider from '../../components/productSlider'
import TabProduct from './productTag/TabProduct'

import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../../redux/slices/ProductSlice'
import { isInViewport } from '../../Handle'

function Home() {
    const { products } = useSelector(state => state.products)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAllProducts({
            _limit: 10,
            _page: 1
        }))
    }, [dispatch])

    const refHello = useRef()

    useEffect(() => {
        const lazyLoad = () => {
            if (refHello.current) {
                if (isInViewport(refHello.current)) {
                    refHello.current.classList.add('scrolled')
                }
                else {
                    refHello.current.classList.remove('scrolled')
                }
            }
        }
        window.addEventListener("scroll", lazyLoad)
        return () => {
            window.removeEventListener("scroll", lazyLoad)
        }
    })

    return (
        <div className="home">
            <Banner />
            <div className="grid wide">
                <ProductSlider title="WEEKLY TOP PICKS" products={products.data ? products.data : []} />
            </div>
            <div className="grid wide">
                <TabProduct />
            </div>
            <div className="img__test">
                <div ref={refHello} className="content">
                    TRI DEP TRAI
                </div>
            </div>
        </div>
    )
}

export default Home
