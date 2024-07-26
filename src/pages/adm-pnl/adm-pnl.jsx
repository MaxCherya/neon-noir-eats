// libraries
import React, { useState } from 'react'
import { useAuth } from '../../AuthContext';
import { db, storage } from '../../firebase'
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, Timestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { format } from 'date-fns';

// styles
import './adm-pnl.css'

// components
import NotFound from '../notFound/notFound';

// icons
import { ImExit } from "react-icons/im";
import { IoCaretForwardCircleSharp } from "react-icons/io5";
import { IoCaretBackCircle } from "react-icons/io5";
import { LuHeading1 } from "react-icons/lu";
import { FaParagraph } from "react-icons/fa";

export default function AdmPnl() {

    const { user, setUser } = useAuth();

    const [addItemMenu, toggleAddItemMenu] = useState(false);
    const [addNewsMenu, toggleAddNewsMenu] = useState(false);
    const [questionsMenu, toggleQuestionsMenu] = useState(false);
    const [ordersMenu, toggleOrdersMenu] = useState(false);

    // add Item
    const [newItemName, setNewItemName] = useState('');
    const [newItemCategory, setNewItemCategory] = useState('');
    const [newItemDescription, setNewItemDescription] = useState('');
    const [newItemPrice, setNewItemPrice] = useState(0);
    const [newItemImg, setNewItemImg] = useState(null);
    const [newItemGram, setNewItemGram] = useState(0);
    const addNewItemHandler = async () => {
        const menuRef = collection(db, 'menu');
        const imgId = v4();
        const storageRef = ref(storage, `menu/${imgId}`);
        try {
            if (newItemCategory === 'Drinks') {
                await uploadBytes(storageRef, newItemImg);
                const imgURL = await getDownloadURL(storageRef);
                await addDoc(menuRef, { name: newItemName, category: newItemCategory, description: newItemDescription, price: newItemPrice, img: imgURL });
            }
            else {
                await uploadBytes(storageRef, newItemImg);
                const imgURL = await getDownloadURL(storageRef);
                await addDoc(menuRef, { name: newItemName, category: newItemCategory, description: newItemDescription, price: newItemPrice, gram: newItemGram, img: imgURL });
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    // check Questions
    const [currentQuestions, setCurrentQuestions] = useState([]);
    const [numberOFCurrentQuestion, setNumberOFCurrentQuestion] = useState(0);
    const getQuestionsList = async () => {
        const questionsRef = collection(db, 'questions');
        try {
            const postsQuery = query(questionsRef, orderBy('date', 'desc'));
            const data = await getDocs(postsQuery);
            const questionsItems = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))
            setCurrentQuestions(questionsItems);
        }
        catch (err) {
            console.error(err);
        }
    }
    const openQuestionsMenuHandler = () => {
        getQuestionsList();
        toggleQuestionsMenu(!questionsMenu);
    }
    const moveQuestionForward = () => {
        if(numberOFCurrentQuestion === currentQuestions.length - 1) {
            setNumberOFCurrentQuestion(0);
        }
        else {
            setNumberOFCurrentQuestion(numberOFCurrentQuestion + 1);
        }
    }
    const moveQuestionBackward = () => {
        if(numberOFCurrentQuestion === 0)
        {
            setNumberOFCurrentQuestion(currentQuestions.length - 1)
        }
        else {
            setNumberOFCurrentQuestion(numberOFCurrentQuestion - 1);
        }
    }
    const handleDeleteQuestion = async (id) => {
        const questionRef = doc(db, 'questions', id);

        try{
            deleteDoc(questionRef);
            setCurrentQuestions(PrevQuestions => PrevQuestions.filter((question) => question.id !== id));
        }
        catch(err) {
            console.error(err);
        }
    }

    // adding News
    const [newsTitle, setNewsTitle] = useState('');
    const [newsSDescription, setNewsSDescription] = useState('');
    const [newsMainText, setNewsMainText] = useState('');
    const [newsDate, setNewsDate] = useState(null);
    const [newsImg, setNewsImg] = useState(null);
    const newsAddH1 = () => {
        setNewsMainText(newsMainText + '<h1></h1>');
    }
    const newsAddP = () => {
        setNewsMainText(newsMainText + '<p></p>');
    }
    const addNewsHandler = async () => {
        const newsRef = collection(db, 'news');
        const imgID = v4();
        try {
            const imgRef = ref(storage, `news/${imgID}`);
            await uploadBytes(imgRef, newsImg);
            const imgFinal = await getDownloadURL(imgRef);
            const dateObject = new Date(newsDate);
            await addDoc(newsRef, {title: newsTitle, sDescription: newsSDescription, text: newsMainText, date: Timestamp.fromDate(dateObject), img: imgFinal});
            setNewsDate(null);
            setNewsImg(null);
            setNewsMainText('');
            setNewsSDescription('');
            setNewsTitle('');
            toggleAddNewsMenu(!addNewsMenu);
        }
        catch(err){
            console.error(err);
        }
    }

    // pending Orders Menu
    const [currentOrders, setCurrentOrders] = useState([]);
    const [currentOrdersPage, setCurrentOrdersPage] = useState(0);
    const [currentMenuList, setCurrentMenuList] = useState([]);
    const getMenuList = async () => {
        const menuRef = collection(db, 'menu');
        try {
            const data = await getDocs(menuRef);
            const menuItems = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setCurrentMenuList(menuItems);
        } catch (err) {
            console.error('Error fetching menu items:', err);
        }
    };
    const getOrdersList = async () => {
        const ordersRef = collection(db, 'orders');
        try {
            const data = await getDocs(ordersRef);
            const ordersItems = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))
            setCurrentOrders(ordersItems);
        }
        catch(err) {
            console.error(err);
        }
    }
    const openOrdersMenuHandler = () => {
        getOrdersList();
        getMenuList();
        toggleOrdersMenu(!ordersMenu);
    }
    const moveOrdersForward = () => {
        if(currentOrdersPage === currentOrders.length - 1) {
            setCurrentOrdersPage(0);
        }
        else {
            setCurrentOrdersPage(currentOrdersPage + 1);
        }
    }
    const moveOrdersBackward = () => {
        if(currentOrdersPage === 0)
        {
            setCurrentOrdersPage(currentOrders.length - 1)
        }
        else {
            setCurrentOrdersPage(currentOrdersPage - 1);
        }
    }
    const pendingOrderDeleteHandler = async (id) => {
        const ordersRef = doc(db, 'orders', id);

        try{
            await deleteDoc(ordersRef);
            setCurrentOrders(PrevOrders => PrevOrders.filter((item) => item.id !== id));
        }
        catch(err) {
            console.error(err);
        }
    }

    return (
        user ? (user.uid === 'zRFicWTC5BTeeqw3nuXjN2nHrQc2' ? (
            <div id='adm-body'>
                <button className='adm-btn' onClick={() => toggleAddItemMenu(!addItemMenu)}>Add Item to Menu</button>
                <button className='adm-btn' onClick={() => toggleAddNewsMenu(!addNewsMenu)}>Add News</button>
                <button className='adm-btn' onClick={openQuestionsMenuHandler}>Questions/Contact requests</button>
                <button className='adm-btn' onClick={openOrdersMenuHandler}>Pending orders</button>

                {/* Add new Item Menu */}
                {addItemMenu ? (
                    <div className='adm-menu-wrapper'>
                        <ImExit onClick={() => toggleAddItemMenu(!addItemMenu)} style={{ fontSize: '3rem', color: 'white', position: 'absolute', right: '1rem', top: '1rem', cursor: 'pointer' }} />
                        <input type='text' value={newItemName} placeholder='Item Name' onChange={(e) => setNewItemName(e.target.value)} />
                        <select value={newItemCategory} onChange={(e) => setNewItemCategory(e.target.value)}>
                            <option value={''}>Choose Category</option>
                            <option value={'Classic Staples'}>Classic Staples</option>
                            <option value={'Neon Noir Creations'}>Neon Noir Creations</option>
                            <option value={'Neon Noir Starters & Sides'}>Neon Noir Starters & Sides</option>
                            <option value={'Drinks'}>Drinks</option>
                        </select>
                        <textarea value={newItemDescription} placeholder='Description of Item' onChange={(e) => setNewItemDescription(e.target.value)} />
                        <input type='number' placeholder='Price' min={0} onChange={(e) => setNewItemPrice(e.target.value)} />
                        {newItemCategory === 'Drinks' ? null : <input type='number' placeholder='Gram' min={0} onChange={(e) => setNewItemGram(e.target.value)} />}
                        <input className='adm-file' type='file' accept='image/png, image/jpeg' onChange={(e) => setNewItemImg(e.target.files[0])} />
                        {newItemCategory === 'Drinks' ? <button className='adm-btn' disabled={newItemName.length === 0 || newItemCategory.length === 0 || newItemDescription.length === 0 || newItemPrice <= 0 || newItemImg === null} onClick={addNewItemHandler}>Submit</button>
                            : <button className='adm-btn' disabled={newItemName.length === 0 || newItemCategory.length === 0 || newItemDescription.length === 0 || newItemPrice <= 0 || newItemImg === null || newItemGram === 0} onClick={addNewItemHandler}>Submit</button>}
                    </div>
                ) : null}

                {/* Add News */}
                {addNewsMenu ? (
                    <div className='adm-menu-wrapper'>
                        <ImExit onClick={() => toggleAddNewsMenu(!addNewsMenu)} style={{ fontSize: '3rem', color: 'white', position: 'absolute', right: '1rem', top: '1rem', cursor: 'pointer' }} />
                        <input type='text' onChange={(e) => setNewsTitle(e.target.value)} value={newsTitle} placeholder='Title' />
                        <textarea type='text' onChange={(e) => setNewsSDescription(e.target.value)} value={newsSDescription} placeholder='Short Description' />
                        <div style={{display:'flex', flexDirection:'column', color:'white', gap:'0.4rem'}}>
                            <div style={{display:'flex', flexDirection:'row', gap:'1rem'}}>
                                <LuHeading1 onClick={newsAddH1}/>
                                <FaParagraph onClick={newsAddP}/>
                            </div>
                            <textarea id='news-maintext' onChange={(e) => setNewsMainText(e.target.value)} value={newsMainText} type='text' placeholder='Main Text' />
                        </div>
                        <input type='date' onChange={(e) => setNewsDate(e.target.value)} value={newsDate}></input>
                        <input className='adm-file' type='file' accept='image/png, image/jpeg' onChange={(e) => setNewsImg(e.target.files[0])} />
                        <button onClick={addNewsHandler} className='adm-btn' disabled={newsTitle.length === 0 || newsSDescription.length === 0 || newsMainText.length === 0 || newsDate === null || newsImg === null}>Submit</button>
                    </div>
                ) : null}

                {/* Check Questions */}
                {questionsMenu ? (
                    <div className='adm-menu-wrapper'>
                        <ImExit onClick={() => toggleQuestionsMenu(!questionsMenu)} style={{ fontSize: '3rem', color: 'white', position: 'absolute', right: '1rem', top: '1rem', cursor: 'pointer' }} />
                        {currentQuestions.length > 0 ?
                            <>
                                <div className='adm-menu-questions-wrapper'>
                                    <p>{currentQuestions[numberOFCurrentQuestion].name} {currentQuestions[numberOFCurrentQuestion].surname}</p>
                                    <p>{currentQuestions[numberOFCurrentQuestion].email}</p>
                                    <p>{format(currentQuestions[numberOFCurrentQuestion].date.toDate(), 'dd/MM/yyyy')}</p>
                                    <h1>{currentQuestions[numberOFCurrentQuestion].message}</h1>
                                    <button className='adm-btn' onClick={() => handleDeleteQuestion(currentQuestions[numberOFCurrentQuestion].id)}>Done</button>
                                </div>
                                <div style={{display:'flex', flexDirection:'row', gap:'3rem', fontSize:'3rem', color:'white'}}>
                                    <IoCaretBackCircle className='adm-menu-questions-cntrl' onClick={moveQuestionBackward}/>
                                    <p>{numberOFCurrentQuestion + 1}/{currentQuestions.length}</p>
                                    <IoCaretForwardCircleSharp className='adm-menu-questions-cntrl' onClick={moveQuestionForward}/>
                                </div>
                            </>
                            : <div>No Questions yet...</div>}
                    </div>
                ) : null}

                {/* Check Orders */}
                {ordersMenu ? (
                    <div className='adm-menu-wrapper'>
                        <ImExit onClick={() => toggleOrdersMenu(!ordersMenu)} style={{ fontSize: '3rem', color: 'white', position: 'absolute', right: '1rem', top: '1rem', cursor: 'pointer' }} />
                        {currentOrders.length > 0 ? (
                            <>
                                <div className='adm-menu-questions-wrapper'>
                                    <p>{currentOrders[currentOrdersPage].name} {currentOrders[currentOrdersPage].surname}</p>
                                    <p>{currentOrders[currentOrdersPage].email}</p>
                                    <p>City:{currentOrders[currentOrdersPage].city} Street:{currentOrders[currentOrdersPage].street}</p>
                                    <p>House:{currentOrders[currentOrdersPage].house} Appartment:{currentOrders[currentOrdersPage].appartment}</p>
                                    <p>---------------</p>
                                    {currentOrders[currentOrdersPage].items.map((item) => (
                                        currentMenuList.map((dish) => (
                                            item.id === dish.id ? (
                                                <p>{dish.name} x{item.quantity}</p>
                                            ) : null
                                        ))
                                    ))}
                                    <button className='adm-btn' style={{marginTop:'1rem'}} onClick={() => pendingOrderDeleteHandler(currentOrders[currentOrdersPage].id)}>Done</button>
                                </div>
                                <div style={{display:'flex', flexDirection:'row', gap:'3rem', fontSize:'3rem', color:'white'}}>
                                    <IoCaretBackCircle onClick={moveOrdersBackward} className='adm-menu-questions-cntrl'/>
                                    <p>{currentOrdersPage + 1}/{currentOrders.length}</p>
                                    <IoCaretForwardCircleSharp onClick={moveOrdersForward} className='adm-menu-questions-cntrl'/>
                                </div>
                            </>
                        ) : <div>There's no orders yet...</div>}
                    </div>
                ) : null}
            </div>
        ) : <NotFound />) : <NotFound />
    )
}
