import React, { useEffect, useState } from 'react'
import categoryApi from '../../../api/categoryApi'
import productApi from '../../../api/productApi'
import ProductItem from '../../../components/productItem'
import './tabProduct.scss'

function TabProduct() {
    const [categories, setCategories] = useState([])
    const [productCategory, setProductCategory] = useState([])
    const [indexTagActive, setIndexTagActive] = useState(0)

    useEffect(() => {
        const getListCategory = async () => {
            try {
                const params = { _limit: 4 }
                const categoriApi = await categoryApi.getAll(params)
                const categoryId = categoriApi.data[indexTagActive].id

                const productCategoryApi = await productApi.getProductCategory(categoryId, { _limit: 8 })
                setProductCategory(productCategoryApi.data)
                setCategories(categoriApi.data)

            } catch (error) {
                console.log(error)
            }
        }
        getListCategory()

    }, [indexTagActive])

    const handleChangeActiveTab = (index) => {
        setIndexTagActive(index)
        const getProductCategory = async () => {
            try {
                const productCategoryApi = await productApi.getProductCategory(categories[index].id, { _limit: 8 })
                setProductCategory(productCategoryApi.data)
            } catch (error) {
                console.log(error)
            }
        }
        getProductCategory()
    }

    return (
        <section className="tab-product">
            <div className="tabs">
                {
                    categories.map((item, index) => {
                        return (
                            <div onClick={() => handleChangeActiveTab(index)} className={index === indexTagActive ? 'tab-item active' : 'tab-item'} key={item.id}>
                                {item.name}
                            </div>
                        )
                    })
                }
            </div>
            <div className="tab-content">
                <div className="row">
                    {
                        productCategory.map((item, index) => {
                            return (
                                <div className="col l-3" key={index}>
                                    <ProductItem product={item} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default TabProduct

