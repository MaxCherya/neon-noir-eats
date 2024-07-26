// libraries
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../components/cart-context/cartContext'
import { db } from '../../firebase'
import { addDoc, collection, getDocs } from 'firebase/firestore';
import GooglePayButton from '@google-pay/button-react';
import { ToastContainer, toast } from 'react-toastify';

// styles
import './cart.css'

// icons
import { MdOutlineRemoveCircle } from "react-icons/md";
import { FaAnglesDown } from "react-icons/fa6";
import { FaAngleDoubleUp } from "react-icons/fa";

// components
import Loader from '../../components/loader';

export default function Cart() {

    const menuRef = collection(db, 'menu');
    const [currentMenu, setCurrentMenu] = useState([]);
    const [currentTotalSum, setCurrentTotalSum] = useState(0);

    const { cartList } = useContext(CartContext);
    const { handleDelete } = useContext(CartContext);
    const { changeQuantity } = useContext(CartContext);
    const { handleClear } = useContext(CartContext);

    const [cName, setCName] = useState('');
    const [cSurname, setCSurname] = useState('');
    const [cEmail, setCEmail] = useState('');
    const [cCity, setCCity] = useState('');
    const [cStreet, setCStreet] = useState('');
    const [cHouse, setCHouse] = useState('');
    const [cAppartment, setCAppartment] = useState('');
    const ordersRef = collection(db, 'orders');

    const [totalMobile, toggleTotalMobile] = useState(false);

    const getMenuList = async () => {
        try {
            const data = await getDocs(menuRef);
            const menuItems = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setCurrentMenu(menuItems);
        } catch (err) {
            console.error('Error fetching menu items:', err);
        }
    };

    const getTotalSum = () => {
        let totalSum = 0;

        cartList.forEach(cartItem => {
            const menuItem = currentMenu.find(item => item.id === cartItem.id);
            if (menuItem) {
                totalSum += menuItem.price * cartItem.quantity;
            }
        });

        setCurrentTotalSum(totalSum);
    }

    const setDeliveryHandler = async () => {
        await addDoc(ordersRef, {
            name: cName, surname: cSurname, email: cEmail, city: cCity, street: cStreet, house: cHouse, appartment: cAppartment, items: cartList
        })
        setCName('');
        setCSurname('');
        setCEmail('');
        setCCity('');
        setCStreet('');
        setCHouse('');
        setCAppartment('');
        toast.success('The order is placed', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        });
        handleClear();
        toggleTotalMobile(false);
    }

    useEffect(() => {
        getMenuList();
    }, []);

    useEffect(() => {
        getTotalSum();
    }, [currentMenu, cartList]);

    return (
        <div className='cart-body'>
            <ToastContainer />
            <section className='cart-main'>
                <div className='cart-main-list'>
                    {cartList.length === 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h1 style={{ fontSize: '3rem', fontFamily: 'Open Sans, sans-serif', color: 'black' }}>Your cart is empty</h1>
                            <p style={{ fontSize: '5rem' }}>🤷🏼</p>
                        </div>
                    ) : null}
                    {currentMenu.length > 0 ? null : <Loader />}
                    {currentMenu.map((item) =>
                        cartList.map((cItem) =>
                            item.id === cItem.id ? (
                                <div className='cart-main-list-wrapper'>
                                    <MdOutlineRemoveCircle id='exit-btn' onClick={() => handleDelete(cItem.id)} />
                                    <div className='cart-main-list-wrapper-name' style={{ backgroundImage: `url(${item.img})` }}>
                                        <p id='cart-main-list-wrapper-name-header'>{item.name}</p>
                                        <p id='cart-main-list-wrapper-name-price'>${item.price * cItem.quantity}</p>
                                    </div>
                                    <div className='cart-main-list-wrapper-quantity'>
                                        <input
                                            type="number"
                                            placeholder={cItem.quantity}
                                            onChange={(e) => changeQuantity(cItem.id, e.target.value)}
                                            min="1"
                                            step="1"
                                            onInput={(e) => e.target.value.length > 0 ? null : e.target.value.replace(1)}
                                        />
                                    </div>
                                </div>
                            ) : null
                        )
                    )}
                </div>
                <div className='cart-main-sum'>
                    {cartList.length > 0 ? (
                        <div className='cart-main-sum-wrapper'>
                            <p className='cart-main-sum-wrapper-header'>Delivery Information:</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div className='cart-main-sum-wrapper-ns'>
                                    <input type='text' value={cName} onChange={(e) => setCName(e.target.value)} placeholder='name' className='cart-main-sum-wrapper-n'></input>
                                    <input type='text' value={cSurname} onChange={(e) => setCSurname(e.target.value)} placeholder='surname' className='cart-main-sum-wrapper-s'></input>
                                </div>
                                <div className='cart-main-sum-wrapper-ns'>
                                    <input type='email' value={cEmail} onChange={(e) => setCEmail(e.target.value)} placeholder='email' className='cart-main-sum-wrapper-e'></input>
                                </div>
                                <div className='cart-main-sum-wrapper-ns'>
                                    <input type='text' value={cCity} onChange={(e) => setCCity(e.target.value)} placeholder='city/town/village' className='cart-main-sum-wrapper-n'></input>
                                    <input type='text' value={cStreet} onChange={(e) => setCStreet(e.target.value)} placeholder='street' className='cart-main-sum-wrapper-s'></input>
                                </div>
                                <div className='cart-main-sum-wrapper-ns'>
                                    <input type='number' value={cHouse} onChange={(e) => setCHouse(e.target.value)} placeholder='house' className='cart-main-sum-wrapper-n'></input>
                                    <input type='number' value={cAppartment} onChange={(e) => setCAppartment(e.target.value)} placeholder='appartment' className='cart-main-sum-wrapper-s'></input>
                                </div>
                                {cName.length === 0 || cSurname.length === 0 || cEmail.length === 0 || cEmail.includes('@') === false || cEmail.includes('.') === false || cCity.length === 0 || cStreet.length === 0 ? <p className='cart-main-sum-wrapper-warning'>Fill all the fields to pay in cash*</p> : null}
                            </div>
                            <p className='cart-main-sum-total-sum'>${currentTotalSum}</p>
                            <div className='cart-main-sum-wrapper-ns-h'>
                                <button disabled={cName.length === 0 || cSurname.length === 0 || cEmail.length === 0 || cEmail.includes('@') === false || cEmail.includes('.') === false || cCity.length === 0 || cStreet.length === 0} className='cart-main-sum-wrapper-ns-btn' onClick={setDeliveryHandler}>Order & Pay Cash</button>
                                <p className='cart-main-sum-wrapper-ns-btn' style={{ fontWeight: '800' }}>Or</p>
                                <GooglePayButton
                                    environment="TEST" // or "PRODUCTION"
                                    buttonColor="black"
                                    buttonType="long"
                                    paymentRequest={{
                                        apiVersion: 2,
                                        apiVersionMinor: 0,
                                        allowedPaymentMethods: [{
                                            type: 'CARD',
                                            parameters: {
                                                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                                allowedCardNetworks: ['MASTERCARD', 'VISA']
                                            },
                                            tokenizationSpecification: {
                                                type: 'PAYMENT_GATEWAY',
                                                parameters: {
                                                    gateway: 'example',
                                                    gatewayMerchantId: 'exampleGatewayMerchantId'
                                                }
                                            }
                                        }],
                                        merchantInfo: {
                                            merchantId: '01234567890123456789',
                                            merchantName: 'Example Merchant'
                                        },
                                        transactionInfo: {
                                            totalPriceStatus: 'FINAL',
                                            totalPriceLabel: 'Total',
                                            totalPrice: `${currentTotalSum}`,
                                            currencyCode: 'USD',
                                            countryCode: 'US'
                                        },
                                        shippingAddressRequired: true,
                                        shippingAddressParameters: {
                                            allowedCountryCodes: ['US'], // Add the allowed country codes here
                                            phoneNumberRequired: true // Set to true if you need the phone number
                                        }
                                    }}
                                    onLoadPaymentData={paymentRequest => {
                                        console.log('load payment data', paymentRequest);
                                    }}
                                />
                            </div>
                        </div>
                    ) : null}
                </div>
                {cartList.length > 0 ? (
                    <div className='cart-main-sum-mobile'>
                        <p className='cart-main-sum-mobile-sum'>${currentTotalSum}</p>
                        {totalMobile ? <FaAngleDoubleUp style={{ fontSize: '2rem' }} onClick={() => toggleTotalMobile(!totalMobile)} /> : <FaAnglesDown style={{ fontSize: '2rem' }} onClick={() => toggleTotalMobile(!totalMobile)} />}
                    </div>
                ) : null}
                {totalMobile ? (
                    <div className='toggle-mobile-sum'>
                        <div className='toggle-mobile-sum-wrapper'>
                            <p className='toggle-mobile-sum-header'>Delivery information</p>
                            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <div className='cart-main-sum-wrapper-ns'>
                                    <input type='text' value={cName} onChange={(e) => setCName(e.target.value)} placeholder='name' className='cart-main-sum-wrapper-n'></input>
                                    <input type='text' value={cSurname} onChange={(e) => setCSurname(e.target.value)} placeholder='surname' className='cart-main-sum-wrapper-s'></input>
                                </div>
                                <div className='cart-main-sum-wrapper-ns'>
                                    <input type='email' value={cEmail} onChange={(e) => setCEmail(e.target.value)} placeholder='email' className='cart-main-sum-wrapper-e'></input>
                                </div>
                                <div className='cart-main-sum-wrapper-ns'>
                                    <input type='text' value={cCity} onChange={(e) => setCCity(e.target.value)} placeholder='city/town/village' className='cart-main-sum-wrapper-n'></input>
                                    <input type='text' value={cStreet} onChange={(e) => setCStreet(e.target.value)} placeholder='street' className='cart-main-sum-wrapper-s'></input>
                                </div>
                                <div className='cart-main-sum-wrapper-ns'>
                                    <input type='number' value={cHouse} onChange={(e) => setCHouse(e.target.value)} placeholder='house' className='cart-main-sum-wrapper-n'></input>
                                    <input type='number' value={cAppartment} onChange={(e) => setCAppartment(e.target.value)} placeholder='appartment' className='cart-main-sum-wrapper-s'></input>
                                </div>
                                {cName.length === 0 || cSurname.length === 0 || cEmail.length === 0 || cEmail.includes('@') === false || cEmail.includes('.') === false || cCity.length === 0 || cStreet.length === 0 ? <p className='cart-main-sum-wrapper-warning' style={{ color: 'red' }}>Fill all the fields to pay in cash*</p> : null}
                            </div>
                            <div className='cart-main-sum-wrapper-ns-h'>
                                <button disabled={cName.length === 0 || cSurname.length === 0 || cEmail.length === 0 || cEmail.includes('@') === false || cEmail.includes('.') === false || cCity.length === 0 || cStreet.length === 0} className='cart-main-sum-wrapper-ns-btn' onClick={setDeliveryHandler}>Order & Pay Cash</button>
                                <p className='cart-main-sum-wrapper-ns-btn' style={{ fontWeight: '800', color:'white' }}>Or</p>
                                <GooglePayButton
                                    environment="TEST" // or "PRODUCTION"
                                    buttonColor="black"
                                    buttonType="long"
                                    paymentRequest={{
                                        apiVersion: 2,
                                        apiVersionMinor: 0,
                                        allowedPaymentMethods: [{
                                            type: 'CARD',
                                            parameters: {
                                                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                                allowedCardNetworks: ['MASTERCARD', 'VISA']
                                            },
                                            tokenizationSpecification: {
                                                type: 'PAYMENT_GATEWAY',
                                                parameters: {
                                                    gateway: 'example',
                                                    gatewayMerchantId: 'exampleGatewayMerchantId'
                                                }
                                            }
                                        }],
                                        merchantInfo: {
                                            merchantId: '01234567890123456789',
                                            merchantName: 'Example Merchant'
                                        },
                                        transactionInfo: {
                                            totalPriceStatus: 'FINAL',
                                            totalPriceLabel: 'Total',
                                            totalPrice: `${currentTotalSum}`,
                                            currencyCode: 'USD',
                                            countryCode: 'US'
                                        },
                                        shippingAddressRequired: true,
                                        shippingAddressParameters: {
                                            allowedCountryCodes: ['US'], // Add the allowed country codes here
                                            phoneNumberRequired: true // Set to true if you need the phone number
                                        }
                                    }}
                                    onLoadPaymentData={paymentRequest => {
                                        console.log('load payment data', paymentRequest);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ) : null}
            </section>
        </div>
    )
}
