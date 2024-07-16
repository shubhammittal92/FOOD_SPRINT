import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import './MyOrder.css'; // Importing the CSS file for MyOrder component

export default function MyOrder() {
    const [orderData, setOrderData] = useState({});

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'));
        await fetch("https://go-food2-4.onrender.com/api/auth/myOrderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json();
            setOrderData(response);
        });
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container my-order-container">
                <div className="row">
                    {orderData && orderData.orderData ? orderData.orderData.order_data.slice(0).reverse().map((item, index) => (
                        <div key={index} className="col-12 order-date-block">
                            <div className="order-date-header">
                                <span className="badge date-badge">{new Date(item[0].Order_date).toDateString()}</span>
                            </div>
                            <div className="row">
                                {item.map((arrayData, idx) => (
                                    !arrayData.Order_date && (
                                        <div key={idx} className="col-12 col-md-6 col-lg-4">
                                            <div className="card mt-3">
                                                <div className="card-body">
                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                    <div className="card-text">
                                                        <span className="badge bg-primary">{arrayData.qty}</span>
                                                        <span className="badge bg-secondary">{arrayData.size}</span>
                                                        <span className="badge price-badge">₹{arrayData.price}/-</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    )) : <p>No orders found.</p>}
                </div>
            </div>
            <Footer />
        </div>
    );
}
