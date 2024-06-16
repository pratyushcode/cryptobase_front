import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {TrendingCoins} from "../../config/api"
import { CryptoState } from '../../Context'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'

const Carousel = () => {
  const {currency,symbol}=CryptoState();
  const [trending,settrending]=useState([]);
    const fetchTrending= async()=>
    {
        const {data}=await axios.get(TrendingCoins(currency))
        settrending(data);

    };
    console.log(trending);

    useEffect(()=>
    {
        fetchTrending();
    },[currency])

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      console.log(currency)

    const responsive={
        0:{
            items:2,
        },
        512:{
            items:4
        }
    }

    const items=trending.map((coin)=>{
        let profit = coin?.price_change_percentage_24h >= 0;
        return(
            <Link to ={`/coinPage/${coin.id}`} className=' flex-col items-center cursor-pointer text-amber-600 text-3xl  '>
                <img className=' h-20 mb-2 mt-8  ml-[155px]'
          src={coin?.image}
          alt={coin.name}
          
          
        />
        <span className='flex-col items-center justify-center  font-require' >
        <span className='text-3xl text-center ml-4 font-bold'> {coin?.symbol}</span> 
          &nbsp;
          <br></br>
          <span style={{ fontSize: 22, fontWeight: 500 }} className=' mr-5 text-amber-500'>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
        
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
            className=' text-xl text-center mr-2'
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        
            </Link>
        );
    })
  return (
    <div className=' py-10 flex  items-center h-[50%]'>
        <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        autoPlay
        items={items}
        />
    </div>
  )
}

export default Carousel