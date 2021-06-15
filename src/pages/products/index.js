import React, { useEffect, useState } from 'react'
import ProductItem from '../../components/productItem'
import Paginate from '../../components/paginate'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../../redux/slices/ProductSlice'

function Products() {
    const { products } = useSelector(state => state.products)
    const dispatch = useDispatch()

    const [isShowSort, setIsShowSort] = useState(false)
    const [titleSort, setTitleSort] = useState('SORT')

    const keyword = (tilte) => {
        let result = {}
        switch (tilte) {
            case 'Alphabetically, A-Z':
                result = {
                    _order: 'asc',
                    _sort: 'name'
                }
                break
            case 'Alphabetically, Z-A':
                result = {
                    _order: 'desc',
                    _sort: 'name'
                }
                break
            case 'Price, high to low':
                result = {
                    _order: 'asc',
                    _sort: 'price'
                }
                break
            default: result = {
                _order: 'desc',
                _sort: 'price'
            }
        }
        return result
    }
    const changePage = (page) => {
        dispatch(fetchAllProducts({
            _limit: 12,
            _page: page,
            ...keyword(titleSort)
        }))
    }


    const handleShowSort = () => {
        setIsShowSort(!isShowSort)
    }

    useEffect(() => {
        dispatch(fetchAllProducts({
            _page: 1,
            _limit: 12,
        }))
    }, [dispatch])

    const { _totalRows, _page, _limit } = products.pagination ? products.pagination : {}

    const totalPage = Math.ceil(_totalRows / _limit)

    const listSort = ['Alphabetically, A-Z', 'Alphabetically, Z-A', 'Price, high to low', 'Price, new to low']


    const handleClickSort = (e) => {
        setTitleSort(e.target.textContent)
        dispatch(fetchAllProducts({
            _page: 1,
            _limit: 12,
            ...keyword(e.target.textContent)
        }))
    }

    const listGrid = ['fa-th', 'fa-th-large']
    const [indexGrid, setIndexGrid] = useState(0)
    const handelChangeGrid = (index) => {
        setIndexGrid(index)
    }

    return (
        <div className="products">
            <div className="grid wide">
                <div className="product__heading">
                    <div className="products__count">
                        <span>FILTER</span>
                        <span>THERE ARE {_totalRows} PRODUCTS</span>
                    </div>
                    <div className="product__filters">
                        <span className="product__number--page">
                            SHOWING {_page === 1 ? 1 : (_page * _limit) - _limit} - {_page < totalPage ? _limit * _page : _totalRows} OF {_totalRows} ITEM(S)
                        </span>
                        <ul className="product__grid">
                            {
                                listGrid.map((item, index) => {
                                    return (<li onClick={() => handelChangeGrid(index)} className={index === indexGrid ? 'active' : ''} key={index}><i className={`fas ${item}`}></i></li>)
                                })
                            }
                        </ul>
                        <div className="product__sort" onClick={handleShowSort}>
                            <span>{titleSort}</span>
                            <span><i className="fas fa-caret-down"></i></span>
                            <ul className={!isShowSort ? 'peoduct__sort--list' : 'peoduct__sort--list active'}>
                                {
                                    listSort.map((item, index) => {
                                        return (
                                            <li key={index} onClick={handleClickSort}>{item}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="product__body">
                    <div className="row">
                        {
                            products.data ? products.data.map((item, index) => {
                                return (<div key={index} className={indexGrid === 0 ? 'col l-3' : 'col l-4'}>
                                    <ProductItem product={item} />
                                </div>)
                            })
                                : ''
                        }
                    </div>
                </div>
                <div><Paginate paginate={products.pagination ? products.pagination : {}} changePage={changePage} /></div>
            </div>
        </div>
    )
}

export default Products
