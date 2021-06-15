import React, { useEffect } from 'react'
import './style.scss'
import ProductItem from '../../components/productItem'
import Paginate from '../../components/paginate'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../../redux/slices/ProductSlice'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

function Search() {
    const { search } = useLocation()
    const query = queryString.parse(search).q
    const { products } = useSelector(state => state.products)
    const dispatch = useDispatch()
    const changePage = (page) => {
        dispatch(fetchAllProducts({
            _limit: 8,
            _page: page,
            q: query
        }))
    }
    useEffect(() => {
        dispatch(fetchAllProducts({
            _limit: 8,
            _page: 1,
            q: query
        }))
    }, [dispatch, query])
    return (
        <div className="search">
            <div className="grid wide">
                <div className="search__title">
                    <h1>Kết quả tìm kiếm cho "{query}", có {products.pagination._totalRows} item ...</h1>
                </div>
                <div className="row">
                    {
                        products.data ? products.data.map((item, index) => {
                            return (<div key={index} className="col l-3">
                                <ProductItem product={item} />
                            </div>)
                        })
                            : ''

                    }
                </div>
                <div className="pagination">
                    <Paginate paginate={products.pagination ? products.pagination : {}} changePage={changePage} />
                </div>
            </div>
        </div>
    )
}

export default Search
