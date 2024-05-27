import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { allstocks } from "../Features/Datas";
import Pagination from "../Pagination/Pagination";
import { NavLink, useNavigate } from "react-router-dom";
import Main from "../Main/Main";

const Card = () => {
    const dispatch = useDispatch();
    const [stocks, setStocks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);
    const postPerPage = 54;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const url = "https://latest-stock-price.p.rapidapi.com/equities";
            const options = {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": "8f844960c0mshfb154fdd8ed8c24p14baf7jsnd2edfe9b0c86",
                    "X-RapidAPI-Host": "latest-stock-price.p.rapidapi.com",
                },
            };

            try {
                const response = await fetch(url, options);
                if(response===429){
                    throw new Error("Too many requests. Please try again later.");
                }
                const result = await response.json();
                if (!Array.isArray(result)) {
                    throw new Error("Unexpected response format.");
                }
                dispatch(allstocks(result));
                setStocks(result); 
                console.log(result);
            } catch (error) {
                console.error(error);
                setError(error.message)
            }
        };

        fetchData();
    }, [dispatch]); 


    if (error) {
        return (
            <div className="min-h-screen bg-slate-800 p-6 flex justify-center items-center">
                <div className="bg-red-500 text-white p-4 rounded-lg">
                    <p>Error: {error}</p>
                </div>
            </div>
        );
    }


    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentStocksData =Array.isArray? stocks.slice(firstPostIndex, lastPostIndex):[];




    

    return (
        <>
            <Main/>
        <div className="min-h-screen bg-slate-800 p-6">
            <h1 className="text-xl flex justify-center p-3 text-white">
                Shares In The Market
            </h1>
            <p className="text-sm flex justify-center pb-8 text-green-400">
                View market activity
            </p>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {currentStocksData.map((card, index) => (
                    <div
                        key={index}
                        className="w-full bg-slate-700 p-4 rounded-lg flex flex-col items-center"
                    >
                        <p className={`text-white ${card.Symbol.length > 17 ? 'text-xs' : ''}`}>
                            {card.Symbol}
                        </p>
                        <span className="text-green-400">High: {card.High}</span>
                        <p className="text-red-400">Low: {card.Low}</p>
                        <NavLink
                            to={`/details/${card.Symbol}`} 
                            className="text-yellow-400 text-sm"
                        >
                            Show more...
                        </NavLink>
                    </div>
                ))}
            </section>

            {/* bottom pagination */}
            <div className="flex justify-center p-5">
                <Pagination
                    totalPost={stocks.length}
                    postPerPage={postPerPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
        </>
    );
};

export default Card;
