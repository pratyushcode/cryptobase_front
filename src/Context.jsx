import React, { Children, createContext, useContext, useEffect, useState } from 'react'

const crypto=createContext();

const Context = ({children}) => {

  const [currency,setCurrency]=useState("INR")
  const [symbol,setsymbol]=useState("₹")
  useEffect(()=>
  {
    if(currency=="INR")setsymbol("₹")
    else if (currency=="USD")setsymbol("$")

  },[currency])
  return (
    <crypto.Provider value={{currency,symbol,setCurrency}}>
        {children}
    </crypto.Provider>
  )
}

export default Context

export const CryptoState=()=>
{
  return  useContext(crypto);

}