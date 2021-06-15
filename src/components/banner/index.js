import React from 'react'
import Slider from "react-slick";
import { NavLink } from 'react-router-dom';
import './style.scss'

function Banner() {
    const settings = {
        infinite: true,
        speed: 1000,
        arrows: false,
        autoplay: true,
        fade: true,
        draggable: false,
        cssEase: 'linear',
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true
    };

    const sliders = [
        {
            img: 'https://cdn.shopify.com/s/files/1/0265/5728/4445/files/s-1-1_1920x.jpg?v=1599100064',
            title: 'COLLECTIONS',
            description: 'This small basket is easy to hanging on wall or door in living room, kitchen, bedroom, storage basket for anything small, never messy, great idea as a decoration to hanging flowers....'
        },
        {
            img: 'https://cdn.shopify.com/s/files/1/0265/5728/4445/files/s-1-2_1920x.jpg?v=1599100619',
            title: 'COLLECTIONS',
            description: 'This small basket is easy to hanging on wall or door in living room, kitchen, bedroom, storage basket for anything small, never messy, great idea as a decoration to hanging flowers....'
        },
        {
            img: 'https://cdn.shopify.com/s/files/1/0265/5728/4445/files/s-1-3_1920x.jpg?v=1599100632',
            title: 'COLLECTIONS',
            description: 'This small basket is easy to hanging on wall or door in living room, kitchen, bedroom, storage basket for anything small, never messy, great idea as a decoration to hanging flowers....'
        }
    ]
    return (
        <div className="banner">
            <Slider {...settings}>
                {
                    sliders.map((item, index) => {
                        return (<div className="slider__item" key={index}>
                            <img src={item.img} alt="" width="100%" height="100%" />
                            <div className="banner__description">
                                <p className="banner__description--title">{item.title}</p>
                                <p className="banner__description--content">{item.description}</p>
                                <NavLink to="/products"><button className="banner__description--btn">SHOW NOW</button></NavLink>
                            </div>
                        </div>)
                    })
                }
            </Slider>
        </div>
    )
}

export default Banner
