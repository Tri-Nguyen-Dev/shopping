import React, { useEffect, useRef, useState } from 'react'
import './style.scss'
import ProductInfo from '../../components/product-info'
import { useParams } from 'react-router'
import productApi from '../../api/productApi'
import ProductSlider from '../../components/productSlider'
function ProductDetail() {
    const { productId } = useParams()
    const [product, setProduct] = useState([])
    const [productCategory, setProductCategory] = useState([])
    const refProductDetail = useRef()
    useEffect(() => {
        const getProductById = async () => {
            try {
                const response = await productApi.getProductById(productId)
                const productByCategory = await productApi.getProductCategory(response.categoryId)
                setProduct(response)
                setProductCategory(productByCategory)
            } catch (error) {
                console.log(error)
            }
        }
        getProductById()


        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }, [productId])

    const settingsProduct = {
        buy: true
    }

    return (
        <div className="product-detail" ref={refProductDetail}>
            <div className="grid wide">
                <ProductInfo {...settingsProduct} product={product} />
                <ProductSlider title="RELATED PRODUCT" products={productCategory} />
            </div>
        </div>
    )
}

export default ProductDetail
