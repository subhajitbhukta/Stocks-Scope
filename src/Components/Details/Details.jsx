import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto"; // Import Chart.js library
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Details = () => {
    const { symbol } = useParams();
    const stockData = useSelector(state =>
        state.datas.find(stock => stock.Symbol === symbol)
    );

    const chartData = [
        stockData.Open,
        stockData["52Wk High"],
        stockData["52Wk High"],
        stockData["5Year High"],
        stockData["1M High"],
        stockData["3M High"],
        stockData["6M High"]
    ];

    useEffect(() => {
        // Bar chart
        const ctx = document.getElementById('chart');
        const mixedChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Open', '52Wk High', '5Year High', '1M High', '3M High', '6M High'],
                datasets: [{
                    label: 'Stock Data',
                    data: chartData,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)', // Change the border colors if needed
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 205, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(201, 203, 207, 1)'
                    ],
                    borderWidth: 1
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: 'white' // Set text color to white
                        },
                    },
                    x: {
                        ticks: {
                            color: 'white' // Set text color to white
                        },
                    },
                }
            }
        });


        return () => {
            mixedChart.destroy(); // Cleanup function to destroy the chart instance
        };
    }, [stockData]);

    const dateTimeStr = stockData["Date/Time"];
    const formattedDateTime = new Date(dateTimeStr).toLocaleString('en-GB', { timeZone: 'UTC' }).replace(',', '');

    return (
        <div className="w-full h-screen bg-slate-700 p-4 flex flex-col items-center">
            <h1 className="text-green-500 text-3xl p-6 font-bold">{stockData.Symbol}</h1>

            <div className="md:h-96 h-auto relative w-full">
                <canvas id="chart" width="400" height="200"></canvas>
            </div>
            <h1 className="text-yellow-500 text-sm p-6  ">Last Update: {formattedDateTime}</h1>
            <div className="flex justify-around gap-8  p-4  flex-wrap">
                <p className="text-white text-md"><span className="text-yellow-400 font-semibold">Open:</span> {stockData.Open}</p>
                <p className="text-white text-md"><span className="text-yellow-400 font-semibold">Close:</span> {stockData["P Close"]}</p>
                <p className="text-white text-md"><span className="text-yellow-400 font-semibold">High:</span> {stockData.High}</p>
                <p className="text-white text-md"><span className="text-yellow-400 font-semibold">Low:</span> {stockData.Low}</p>
                <p className="text-white text-md "><span className="text-yellow-400 font-semibold">Current Volume:</span> {stockData.Volume}</p>
                <p className="text-white text-md "><span className="text-yellow-400 font-semibold">Total Volume:</span> {stockData["Total Volume"]}</p>
                <p className="text-white text-md "><span className="text-yellow-400 font-semibold">Current Change:</span> {stockData["%Chng"]}%</p>
                <p className="text-white text-md"><span className="text-yellow-400 font-semibold">Net Change:</span> {stockData["Net Change"]}%</p>
                <p className="text-white text-md "><span className="text-yellow-400 font-semibold">LTP:</span> {stockData.LTP}</p>
                
            </div>

            
        </div>
    );
};

export default Details;
