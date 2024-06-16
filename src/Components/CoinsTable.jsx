import React, { useEffect, useState } from 'react'
import {CoinList} from "../config/api"
import { CryptoState } from '../Context';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import SimplePagination from './Pagination';


const CoinsTable = () => {
    const [coins,setcoins]=useState([]);
    const [loading,setloading]=useState(false);
    const [data,setdata]=useState("");
    const [page,setpage]=useState(1);
   
    const {currency,symbol}=CryptoState();

    const fetchCoins=async ()=>{
        setloading(true);
        const {data}=await axios.get(CoinList(currency))
        setcoins(data);
        setloading(false);
    }

    console.log(coins);

    useEffect(()=>{
       fetchCoins();
    },[currency])
    console.log(data);

    const handleSearch=()=>{
      return coins.filter(
        (coin)=>
        coin.name.toLowerCase().includes(data)||
        coin.symbol.toLowerCase().includes(data)
        
      )
       
    }

    
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const history = useNavigate   ();

  return (
    <div className='h-screen w-screen bg-black text-white absolute top-[70vh] '>
    <div className=' text-center'>
      <h4 className=' font-require m-5 text-xl text-amber-700 font-bold'>Cryptocurrency Prices by Market Cap </h4>
      <div>
  <label htmlForfor="price" class=" font-require leading-6 text-yellow-500  text-2xl">Search</label>
  <div className=" mt-2 rounded-md shadow-sm  flex items-center justify-center">
   
    <input onChange={(e)=>setdata(e.target.value)} type="text" name="price" id="price" class="block w-[70vh] rounded-md border-red-400 py-1.5 pl-2 bg-yellow-400 text-black shadow-amber-700  shadow-md font-bold" placeholder="Search Coin.." />
   
  </div>
</div>
    </div>
    {
      loading?(<div className='flex justify-center  items-center py-10'>
      <ClipLoader
    color="amber"
    loading={loading}
    height={10}
    width={100}
    size={80}

    
    
    aria-label="Loading Spinner"
    data-testid="loader"
    
  /></div>)
      
      :
      
    <div className="overflow-x-auto flex items-center justify-center py-7">
      <table className="w-[70vw] border-collapse border-0 flex-col items-center justify-center">
            <thead className="bg-yellow-400">
              <tr>
                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                  <th
                    key={head}
                    className="py-2 px-4 font-semibold text-black"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {handleSearch()
              .slice((page - 1) * 10, (page - 1) * 10 + 10)                
                .map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  return (
                   
                      <tr
                      key={row.name}
                      className="cursor-pointer hover:bg-gray-800 border-y-2 border-amber-200"
                      onClick={() => history(`/coinPage/${row.id}`)}
                    >
                      <td className="flex items-center justify-center gap-4">
                        <img
                          src={row?.image}
                          alt={row.name}
                          
                          className=" h-12 mt-2"
                        />
                        <div className="flex flex-col">
                          <span className="text-2xl uppercase">
                            {row.symbol}
                          </span>
                          <span className="text-white text-sm font-light">{row.name}</span>
                        </div>
                      </td>
                      <td className="text-center text-white">
                        {symbol}{" "}
                        {numberWithCommas(row.current_price.toFixed(2))}
                      </td>
                      <td className={` text-center ${profit ? 'text-green-500' : 'text-red-500'}`}>
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </td>
                      <td className="text-center text-white">
                        {symbol}{" "}
                        {numberWithCommas(row.market_cap.toString().slice(0, -6))}
                        M
                      </td>
                    </tr>
                 
                    
                  );
                })}
            </tbody>
          </table>
    </div>
    }
    <SimplePagination onPageChange={setpage}/>
    

    
    </div>
  )
}

export default CoinsTable