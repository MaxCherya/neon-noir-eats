// libraries
import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'

// styles
import "./navbar.css"

// components
import { CartContext } from '../cart-context/cartContext'

// images
import logo from '../../imgs/branding/logo.jpeg'

//icons
import { IoIosCart } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { MdRestaurantMenu } from "react-icons/md";
import { BiNews } from "react-icons/bi";
import { RiGalleryFill } from "react-icons/ri";
import { IoIosInformationCircle } from "react-icons/io";
import { MdContacts } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";

export default function Navbar() {

    const { cartList } = useContext(CartContext);

    return (
        <>
            <div className='navbar-container'>
                <ul className='navbar-list-container'>
                    <li id='navbar-logo-container'><Link to='/'><img src={logo} alt='Neon Noir Eats' id='main-logo-navbar' /></Link><span id='navbar-wall'>|</span></li>
                    <ul className='navbar-list-container navbar-maintext-container'>
                        <li><NavLink to='/'><p>Home</p></NavLink></li>
                        <li><NavLink to='/menu'><p>Menu</p></NavLink></li>
                        <li><NavLink to='/news'><p>News</p></NavLink></li>
                        <li><NavLink to='/gallery'><p>Gallery</p></NavLink></li>
                        <li><NavLink to='/about'><p>About</p></NavLink></li>
                        <li><NavLink to='/contacts'><p>Contacts</p></NavLink></li>
                    </ul>
                    {cartList.length > 0 ? <li><NavLink to='/cart' className='cart-navbar-active'><FaCartArrowDown id='cart-logo-navbar1' /></NavLink></li> : <li><NavLink to='/cart' className='cart-navbar-active'><IoIosCart id='cart-logo-navbar' /></NavLink></li>}
                </ul>
            </div>
            <div className='navbar-container-mobile'>
                <ul className='navbar-list-container-mobile'>
                    <li><NavLink to='/'><IoHome /></NavLink></li>
                    <li><NavLink to='/menu'><MdRestaurantMenu /></NavLink></li>
                    <li><NavLink to='/news'><BiNews /></NavLink></li>
                    <li><NavLink to='/gallery'><RiGalleryFill /></NavLink></li>
                    <li><NavLink to='/about'><IoIosInformationCircle /></NavLink></li>
                    <li><NavLink to='/contacts'><MdContacts /></NavLink></li>
                    {cartList.length > 0 ? <li><NavLink to='/cart'><FaCartArrowDown id='cart-logo-navbar1-mobile'/></NavLink></li> : <li><NavLink to='/cart'><IoIosCart /></NavLink></li>}
                    
                </ul>
            </div>
        </>
    )
}
