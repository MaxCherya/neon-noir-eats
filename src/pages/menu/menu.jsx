// libraries
import React, { useContext, useEffect, useState } from 'react'
import { db, storage } from '../../firebase'
import { collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { motion } from "framer-motion"
import { CartContext } from '../../components/cart-context/cartContext'
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../../AuthContext';
import { deleteObject, ref } from 'firebase/storage';

// styles
import './menu.css'
import 'react-toastify/dist/ReactToastify.css';
import '../adm-pnl/adm-pnl.css'

// components
import Loader from '../../components/loader'
import ShimmeringLight from '../../components/shimmering-light/shimmeringLight'

// icons
import { GiWeightScale } from "react-icons/gi";
import { ImPriceTags } from "react-icons/im";
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { ImExit } from "react-icons/im";

export default function Menu() {

    const [selectedCategory, setSelectedCategory] = useState('');
    const { addItem } = useContext(CartContext);

    const [editMenu, toggleEditMenu] = useState(false);

    const [currentMenu, setCurrentMenu] = useState([]);
    const menuRef = collection(db, 'menu');
    const { user, setUser } = useAuth();

    // Editing
    const [changedName, setChangedName] = useState('');
    const [changedDescription, setChangedDescription] = useState('');
    const [changedPrice, setChangedPrice] = useState(0);
    const [changedId, setChangedId] = useState('');

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

    const handleAddToCart = (item) => {
        addItem(item);
        toast.success('The item is added to cart', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    };

    const deleteItemHandler = async (id) => {
        const itemRef = doc(db, 'menu', id);
        try {
            const menuDoc = await getDoc(itemRef);

            if (menuDoc.exists()) {
                const itemData = menuDoc.data();
                const imgURL = itemData.img;
                const imgReff = ref(storage, imgURL);
                await deleteObject(imgReff);
                await deleteDoc(itemRef);
                setCurrentMenu(previousMenu => previousMenu.filter(item => item.id !== id));
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    const editItemHandler = async (id, name, description, price) => {
        setChangedName(name);
        setChangedDescription(description);
        setChangedPrice(price);
        setChangedId(id);
        toggleEditMenu(!editMenu);
    }

    const exitEditMode = () => {
        setChangedName('');
        setChangedDescription('');
        setChangedPrice(0);
        setChangedId('');
        toggleEditMenu(!editMenu);
    }

    const updateEditedItem = async () => {
        const itemRef = doc(db, 'menu', changedId);
        try {
            await updateDoc(itemRef, { name: changedName, description: changedDescription, price: changedPrice });
            setChangedName('');
            setChangedDescription('');
            setChangedPrice(0);
            setChangedId('');
            toggleEditMenu(!editMenu);
            getMenuList();
        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getMenuList();
    }, []);

    return (
        <div className='menu-body'>
            <ToastContainer />
            <ShimmeringLight />
            <ShimmeringLight />
            <ShimmeringLight />
            <ShimmeringLight />
            <ShimmeringLight />
            <ShimmeringLight />
            <ShimmeringLight />
            <ShimmeringLight />
            <ShimmeringLight />
            <ShimmeringLight />
            {user ?
                user.uid === 'zRFicWTC5BTeeqw3nuXjN2nHrQc2' ?
                    editMenu ?
                        (
                            <div style={{ position: 'fixed', width: '100%', height: '92.6svh', backgroundColor: 'black', zIndex: '100', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                <ImExit onClick={() => toggleEditMenu(exitEditMode)} style={{ fontSize: '3rem', color: 'white', position: 'absolute', right: '1rem', top: '1rem', cursor: 'pointer' }} />
                                <input type='text' onChange={(e) => setChangedName(e.target.value)} value={changedName} />
                                <textarea onChange={(e) => setChangedDescription(e.target.value)} style={{ minWidth: '15rem', minHeight: '5rem', maxWidth: '15rem', maxHeight: '5rem' }} value={changedDescription} />
                                <input type='number' onChange={(e) => setChangedPrice(e.target.value)} value={changedPrice} />
                                <button className='adm-btn' onClick={updateEditedItem}>Submit</button>
                            </div>
                        ) : null : null
                : null}
            <section className='menu-categories-container'>
                <p className='menu-categories-container-header'>Categories:</p>
                <div className='menu-categories-wrapper'>
                    <div className={selectedCategory === 'Classic Staples' ? 'menu-categories-wrapper-individual menu-categories-wrapper-individual-active' : 'menu-categories-wrapper-individual'} onClick={() => setSelectedCategory('Classic Staples')}>
                        <p>Classic Staples</p>
                        <span className={selectedCategory === 'Classic Staples' ? 'menu-categories-wrapper-individual-bg menu-categories-wrapper-individual-bg-active' : 'menu-categories-wrapper-individual-bg'} style={{ backgroundImage: `url(https://ideogram.ai/assets/image/lossless/response/-mRVlpdzTZixrIfEDmU5qw)` }}></span>
                    </div>
                    <div className={selectedCategory === 'Neon Noir Creations' ? 'menu-categories-wrapper-individual menu-categories-wrapper-individual-active' : 'menu-categories-wrapper-individual'} onClick={() => setSelectedCategory('Neon Noir Creations')}>
                        <p>Neon Noir Creations</p>
                        <span className={selectedCategory === 'Neon Noir Creations' ? 'menu-categories-wrapper-individual-bg menu-categories-wrapper-individual-bg-active' : 'menu-categories-wrapper-individual-bg'} style={{ backgroundImage: `url(https://ideogram.ai/assets/image/lossless/response/hjnfs318SdeRn9kFusqIJA)` }}></span>
                    </div>
                    <div className={selectedCategory === 'Neon Noir Starters & Sides' ? 'menu-categories-wrapper-individual menu-categories-wrapper-individual-active' : 'menu-categories-wrapper-individual'} onClick={() => setSelectedCategory('Neon Noir Starters & Sides')}>
                        <p>Neon Noir Starters & Sides</p>
                        <span className={selectedCategory === 'Neon Noir Starters & Sides' ? 'menu-categories-wrapper-individual-bg menu-categories-wrapper-individual-bg-active' : 'menu-categories-wrapper-individual-bg'} style={{ backgroundImage: `url(https://ideogram.ai/assets/image/lossless/response/zfB-DLvjQJ-8lnWDPJQ4sg)` }}></span>
                    </div>
                    <div className={selectedCategory === 'Drinks' ? 'menu-categories-wrapper-individual menu-categories-wrapper-individual-active' : 'menu-categories-wrapper-individual'} onClick={() => setSelectedCategory('Drinks')}>
                        <p>Drinks</p>
                        <span className={selectedCategory === 'Drinks' ? 'menu-categories-wrapper-individual-bg menu-categories-wrapper-individual-bg-active' : 'menu-categories-wrapper-individual-bg'} style={{ backgroundImage: `url(https://ideogram.ai/assets/image/lossless/response/AYJFUsaBSwSWYHbtDXSmMQ)` }}></span>
                    </div>
                </div>
            </section>
            <section className='menu-main'>
                <h1 className='menu-main-header'>{selectedCategory}</h1>
                <div className='menu-items-wrapper'>
                    {currentMenu.length > 0 ? (
                        currentMenu.map((item) => (
                            selectedCategory === item.category ? (
                                <>
                                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 1, type: "spring" } }} exit={{ opacity: 0, scale: 0 }} key={item.id} className='menu-item-wrapper'>
                                        <span className='menu-item-image' style={{ backgroundImage: `url(${item.img})` }}>
                                            {user ?
                                                user.uid === 'zRFicWTC5BTeeqw3nuXjN2nHrQc2' ? (
                                                    <>
                                                        <MdDeleteForever onClick={() => deleteItemHandler(item.id)} style={{ position: 'absolute', right: '1rem', top: '1rem', fontSize: '3rem', color: 'black', backgroundColor: 'white', borderRadius: '1.5rem', cursor: 'pointer' }} />
                                                        <MdEdit onClick={() => editItemHandler(item.id, item.name, item.description, item.price)} style={{ position: 'absolute', left: '1rem', top: '1rem', fontSize: '3rem', color: 'black', backgroundColor: 'white', borderRadius: '1.5rem', cursor: 'pointer' }} />
                                                    </>
                                                ) : null
                                                : null}
                                        </span>
                                        <div className='menu-item-info'>
                                            <div className='menu-item-info-wrapper'>
                                                <div className='menu-item-info-nd'>
                                                    <p className='menu-item-info-header'>{item.name}</p>
                                                    <p className='menu-item-info-description'>{item.description}</p>
                                                </div>
                                                {item.gram !== undefined ? (
                                                    <div className='menu-item-info-pg'>
                                                        <p><GiWeightScale />&nbsp;{item.gram}g</p>
                                                        <p><ImPriceTags />&nbsp;{item.price}$</p>
                                                    </div>
                                                ) : <p className='menu-item-info-pg2'><ImPriceTags />&nbsp;{item.price}$</p>}
                                                <button className='menu-item-btn' onClick={() => handleAddToCart(item.id)}>Add To Cart</button>
                                            </div>
                                        </div>
                                    </motion.div>
                                </>
                            ) : null
                        ))
                    ) : (
                        <Loader />
                    )}
                </div>
            </section>
        </div>
    )
}
