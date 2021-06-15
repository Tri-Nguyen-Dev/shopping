import React from 'react'
import './style.scss'

function Paginate({ paginate, changePage }) {
    const { _page, _totalRows, _limit } = paginate

    const handlePrev = () => {
        changePage(_page - 1)
    }
    const handleNext = () => {
        changePage(_page + 1)
    }

    const totalPage = Math.ceil(_totalRows / _limit)

    const countPageView = () => {
        let result = [];
        for (let i = 1; i <= totalPage; i++) {
            result.push(i)
        }
        return result
    }

    const handleChangePage = (index) => {
        changePage(index + 1)
    }

    return (
        <div className="paginate">
            <button onClick={handlePrev} className="pn__prev" disabled={_page <= 1}>PREV</button>
            <div className="paginate__number">
                {
                    countPageView().map((item, index) => {
                        return <span onClick={() => handleChangePage(index)} className={index === _page - 1 ? 'active' : ''} key={index} >{item}</span>
                    })
                }
            </div>
            <button onClick={handleNext} disabled={_page >= totalPage} className="pn__next">NEXT</button>
        </div>
    )
}

export default Paginate
