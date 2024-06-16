import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../Context';
import {SingleCoin} from "../config/api"
import axios from 'axios';
import CoinInfo from '../Components/Coininfo';


const CoinPage = () => {
  const {id}=useParams();
  const [coin,setcoin]=useState();

  const {currency,symbol}=CryptoState();

  const fetchCoin= async()=>
  {
    const {data}= await axios.get(SingleCoin(id))
    setcoin(data);
  }
  console.log(id);
  console.log(coin);

  useEffect(()=>{
    fetchCoin();
  },[currency])

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  if (!coin) return <div className="bg-gold p-4"><div className="bg-white h-2"></div>Loading....</div>;
  return (
    <div className="flex  ">
    <div className="w-full sm:w-1/3 border-r border-amber-200 shadow-amber-100 pr-4 mb-4 mt-6 sm:mb-0 lg:mt-8">
      <img
        src={coin?.image.large}
        alt={coin?.name}
        className="mb-4 mx-auto h-36 mt-7 lg:h-44"
        
      />
      <h3 className="text-3xl font-bold mb-4 text-center text-amber-500 lg:text-5xl" >{coin?.name}</h3>
      <p className="text-base mb-4 text-white ml-3 text-center lg:text-xl">{coin?.description.en.split('. ')[0]}.</p>
      <div className="flex-row mx-8 space-y-4 sm:space-y-0 sm:flex-row sm:justify-around">
        <div className="flex items-center space-x-2">
          <h5 className="text-lg font-bold text-amber-500 lg:text-xl">Rank:</h5>
          <span className="text-lg text-white">{coin?.market_cap_rank}</span>
        </div>
        <div className="flex items-center space-x-2">
          <h5 className="text-lg font-bold text-amber-500 lg:text-xl">Current Price:</h5>
          <span className="text-lg text-white">
            {symbol} {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <h5 className="text-lg font-bold text-amber-500 lg:text-xl">Market Cap:</h5>
          <span className="text-lg text-white">
            {symbol} {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))} M
          </span>
        </div>
      </div>
    </div>
    <div className="w-full sm:w-2/3 pl-4 overflow-hidden">
      <CoinInfo coin={coin} />
    </div>
  </div>
  )
}

export default CoinPage