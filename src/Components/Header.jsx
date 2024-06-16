import React, { useState } from 'react';
import { CryptoState } from '../Context';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const { currency, setCurrency } = CryptoState();
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsAccountOpen(false);
  };

  const toggleAccountDropdown = () => {
    setIsAccountOpen(!isAccountOpen);
    setIsOpen(false);
  };

  const history = useNavigate();

  const buttonClasses = "inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-bg text-sm font-medium text-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

  return (
    <div className='static w-full bg-black h-14 py-2 px-4 text-2xl rounded-lg shadow-slate-500 shadow-2xl flex justify-between z-10'>
      <h1 className='text-orange-500 font-require font-bold hover:text-orange-400 p-2' onClick={() => history(`/`)}>CRYPTOBASE</h1>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            type="button"
            onClick={toggleDropdown}
            className={buttonClasses}
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
          >
            {currency}
          </button>

          {isOpen && (
            <div
              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5 z-20"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div className="py-1" role="none">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-orange-700 hover:bg-bg"
                  role="menuitem"
                  onClick={() => { setCurrency("USD"); setIsOpen(false);  }}
                >
                  USD
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-orange-700 hover:bg-bg"
                  role="menuitem"
                  onClick={() => { setCurrency("INR"); setIsOpen(false); }}
                >
                  INR
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={toggleAccountDropdown}
            className={buttonClasses}
            id="account-menu"
            aria-haspopup="true"
            aria-expanded="true"
          >
            <FontAwesomeIcon icon={faUser} className=' text-xl' />
          </button>

          {isAccountOpen && (
            <div
              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5 z-20"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="account-menu"
            >
              <div className="py-1" role="none">
                <Link
                  to={"/signin"}
                  className="block px-4 py-2 text-sm text-orange-700 hover:bg-bg"
                  role="menuitem"
                  onClick={() => { /* Handle Login action */ setIsAccountOpen(false); }}
                >
                  Login
                </Link>
                <Link
                  to={"/signup"}
                  className="block px-4 py-2 text-sm text-orange-700 hover:bg-bg"
                  role="menuitem"
                  onClick={() => { /* Handle Signup action */ setIsAccountOpen(false); }}
                >
                  Signup
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
