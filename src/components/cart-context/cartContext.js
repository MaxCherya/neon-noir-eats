import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartList, setCartList] = useState(() => {
        const savedCartList = localStorage.getItem('cartList');
        return savedCartList ? JSON.parse(savedCartList) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartList', JSON.stringify(cartList));
    }, [cartList]);

    const handleDelete = (id) => {
        setCartList(prevCartList => prevCartList.filter(item => item.id !== id));
    };

    const handleClear = () => {
        localStorage.clear();
        setCartList([]);
    }

    const addItem = (id) => {
        setCartList(prevCartList => {
            const existingItem = prevCartList.find(cartItem => cartItem.id === id);
            if (existingItem) {
                // If item already exists, update the quantity
                return prevCartList.map(cartItem =>
                    cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                );
            }
            // If item does not exist, add it with the specified quantity
            return [...prevCartList, { id, quantity: 1 }];
        });
    };

    const changeQuantity = (id, quantity) => {
        if (quantity === 0 || quantity.length === 0) {
            setCartList(prevCartList =>
                prevCartList.map(item =>
                    item.id === id ? { ...item, quantity: parseInt(1, 10) } : item
                )
            );
        }
        else {
            setCartList(prevCartList =>
                prevCartList.map(item =>
                    item.id === id ? { ...item, quantity: parseInt(quantity, 10) } : item
                )
            );
        }
    };

    return (
        <CartContext.Provider value={{ cartList, setCartList, handleDelete, handleClear, addItem, changeQuantity }}>
            {children}
        </CartContext.Provider>
    );
};