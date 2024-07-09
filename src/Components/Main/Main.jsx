import React, { useState } from 'react';
import image from '../../img/main.jpg';
import { NavLink,Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from '../../img/logo.png'
import Card from '../StockCard/Card';
const Main = () => {
    const { symbol } = useParams();
    const [searchValue, setSearchValue] = useState('');

    const stockDataSearch = useSelector(state => {
        const datas = state.datas || [];
        if (!Array.isArray(datas)) return [];
        return datas.filter(stock => stock.Symbol?.toLowerCase().includes(searchValue.toLowerCase()));
    });


    const handleChange = (e) => {    
        e.preventDefault();
        setSearchValue(e.target.value); 
    }

    return (
        <>
            <div
                className='bg-slate-800 min-h-full 2xl:h-screen p-6 md:p-9'
                style={{
                    backgroundImage: !searchValue? `url(${image})`:'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: "brightness(1)",
                    transition:"2s ease"
                }}
            >
                <ul className='flex  md:flex-row justify-between items-center md:pl-32 md:pr-28 text-white '>
                    <li className='text-xl md:text-2xl font-bold'><img src={logo} alt="" className='h-14 w-14 md:h-20 md:w-20 brightness-90'/></li>
                    <div className='flex'>
                        <li>
                            <input
                                type="text"
                                placeholder='Search....'
                                className='px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100 w-full md:w-auto'
                                onChange={handleChange}
                                value={searchValue}
                            />
                        </li>
                        {/* <li className='text-lg md:text-xl'>Home</li>
                        <li className='text-lg md:text-xl'>About</li>
                        <li className='text-lg md:text-xl'>Activity</li> */}
                    </div>
                </ul>

                <div className='p-20 pb-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6'>
                    {searchValue ? (
                        stockDataSearch.length > 0 ? (
                            stockDataSearch.map(stock => (
                                <div key={stock.id} className='bg-gray-700 text-white p-4 rounded-lg mb-4'>
                                    <h2 className='text-xl font-bold'>{stock.Symbol}</h2>
                                    <p>High: {stock.High}</p>
                                    <p>Low: {stock.Low}</p>
                                    <NavLink
                                        to={`/details/${stock.Symbol}`}
                                        className="text-yellow-400 text-sm"
                                    >
                                        Show more...
                                    </NavLink>
                                </div>
                            ))
                        ) : (
                                
                                <p className='text-white text-center '>No results found acrroding your searching.</p>
                               
                        )
                    ) : (
                        <p className='text-gray-400 '></p>
                    )}
                </div>

                <div className={``}>
                    
                    <div className={`text-white ${searchValue?' hidden':'block'} text-2xl md:text-4xl flex-col flex justify-center  text-center  `}>
                        <p className='font-bold'>Stock Market is the Best Way to Invest Your Money</p> 
                        <p className='text-xs md:text-xl w-full text-white-200 lg:w-1/2 mx-auto pt-6 md:pt-9 brightness-125'>
                            At NSE Stock Insights, to providing you with comprehensive analysis and insights into the National Stock Exchange of India (NSE). Whether you are a seasoned investor or just starting your journey in the stock market, this platform offers the tools and information you need to make informed decisions
                            <span className='text-yellow-300 shadow-lg'>&nbsp; Scroll Below</span>
                        </p>
                     
                    </div>
                    
                </div>
            </div>
        </>
    );
};

export default Main;
