// libraries
import React, { useState } from 'react'
import { motion } from "framer-motion"
import { db } from '../../firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// styles
import './contacts.css'

// icons
import { FaPhoneVolume } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoLogoYoutube } from "react-icons/io";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

export default function Contacts() {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleAddQuestion = async (name, surname, email, message) => {

        const questionRef = collection(db, 'questions');

        try {
            await addDoc(questionRef, {
                name: name,
                surname: surname,
                email: email,
                message: message,
                date: serverTimestamp(), // Add timestamp
            });
            setName('');
            setSurname('');
            setEmail('');
            setMessage('');
            toast.success('Message sent!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        } catch (err) {
            console.error('Error adding question:', err);
            alert('Failed to add question. Please try again.');
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 1, type: "spring" } }} exit={{ opacity: 0, scale: 0 }} className='contacts-body'>
            <ToastContainer />
            <div className='contacts-txt-container'>
                <p className='contacts-txt-container-qs'>Got a question?</p>
                <p className='contacts-txt-container-cta'>Contact Us</p>
                <p className='contacts-txt-container-addition'>We are always happy to answer whatever you have for us</p>
            </div>
            <div className='contacts-form'>
                <div className='contacts-form-name'>
                    <input type='text' placeholder='name' value={name} onChange={(e) => setName(e.target.value)}></input>
                    <input type='text' placeholder='surname' value={surname} onChange={(e) => setSurname(e.target.value)}></input>
                </div>
                <input type='email' placeholder='email' className='contacts-form-email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <textarea placeholder='your message (at least 30 characters)' value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                {
                    name.length > 0 && surname.length > 0 && email.length > 0 && email.includes('@') && email.includes('.') && message.length > 0 && message.length > 30 ? <motion.button className='contacts-send' whileHover={{ backgroundColor: '#56a6f7', cursor: 'pointer' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 1, type: "spring" } }} exit={{ opacity: 0, scale: 0 }} onClick={() => handleAddQuestion(name, surname, email, message)}>Submit</motion.button> : <motion.p style={{ color: 'red', fontFamily: 'OpenSans, sans-serif', fontSize: '1rem' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 1, type: "spring" } }} exit={{ opacity: 0, scale: 0 }}>* All fields are required</motion.p>
                }
            </div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} className='contacts-footer'>
                <section className='home-footer-section-1'>
                    <div className='home-footer-section-1-top'>
                        <p><FaPhoneVolume />&#160; +1-800-NEON-NOIR</p>
                        <p><MdEmail />&#160;neonsushi@noir.com</p>
                    </div>
                    <div className='home-footer-section-1-bottom'>
                        <IoLogoYoutube />
                        <FaFacebookSquare />
                        <FaSquareInstagram />
                    </div>
                </section>
                <section className='home-footer-section-2'>
                    <iframe
                        title='address'
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158.81373480465516!2d30.549403121115898!3d50.44073265804548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cfa5dcedfa09%3A0x7917f650bed97c67!2sInstitute%20of%20Social%20and%20Economic%20Development!5e0!3m2!1sen!2sua!4v1719643684356!5m2!1sen!2sua"
                        width="100%"
                        height="100%"
                        style={{ border: '0' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </section>
            </motion.div>
        </motion.div>
    )
}
