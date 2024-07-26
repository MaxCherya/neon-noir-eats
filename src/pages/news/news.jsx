// libraries
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { motion, useScroll } from "framer-motion"

//components
import Loader from '../../components/loader';

// styles
import './news.css'

// icons
import { FaPhoneVolume } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoLogoYoutube } from "react-icons/io";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

export default function News() {

    const newsRef = collection(db, "news")
    const [latestNews, setLatestNews] = useState([]);

    const { scrollYProgress } = useScroll();

    const getNewsList = async () => {
        try {
            const newsQuery = query(newsRef, orderBy('date', 'desc'));
            const data = await getDocs(newsQuery);
            const filteredData = data.docs.map((doc) => {
                const newsData = doc.data();
                return {
                    ...newsData,
                    id: doc.id,
                    date: format(newsData.date.toDate(), "do MMMM yyyy"), // Format Firestore Timestamp to readable date
                };
            });
            setLatestNews(filteredData);
        } catch (err) {
            console.error('Error fetching news:', err);
        }
    };

    useEffect(() => {
        getNewsList();
    }, []);

    return (
        <div className='news-body'>
            {latestNews.length > 0 ? null : <Loader />}
            <motion.div style={{
                scaleX: scrollYProgress,
                transformOrigin: "left",
                background: '#007FFF',
                position: 'fixed',
                top: '0',
                width: '100%',
                height: '10px',
                zIndex: 1000,
                boxShadow: '0 0 20px 5px #007FFF'
            }} />
            {latestNews.length > 0 ?
                <>
                    <motion.section initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1, transition: { duration: 1, type: "spring" } }} exit={{ opacity: 0, scale: 0 }} className='news-latest-container'>
                        <div className='news-latest-container-txt'>
                            <p className='news-latest-container-txt-date'>{latestNews[0].date}</p>
                            <p className='news-latest-container-txt-title'>{latestNews[0].title}</p>
                            <p className='news-latest-container-txt-sDescription'>{latestNews[0].sDescription}</p>
                            <Link to={`/news/${latestNews[0].id}`}><motion.button whileHover={{ backgroundColor: '#5a5a5a' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 1, type: "spring" } }} exit={{ opacity: 0, scale: 0 }}>Read more</motion.button></Link>
                        </div>
                        <div>
                            <img src={latestNews[0].img} alt={latestNews[0].title} />
                        </div>
                    </motion.section>
                    <motion.section initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1, transition: { duration: 1, type: "spring" } }} exit={{ opacity: 0, scale: 0 }} className='news-latest-container-mobile'>
                        <p className='news-latest-container-txt-date'>{latestNews[0].date}</p>
                        <p className='news-latest-container-txt-title'>{latestNews[0].title}</p>
                        <img src={latestNews[0].img} alt={latestNews[0].title} />
                        <p className='news-latest-container-txt-sDescription'>{latestNews[0].sDescription}</p>
                        <Link to={`/news/${latestNews[0].id}`}><motion.button whileHover={{ backgroundColor: '#5a5a5a' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 1, type: "spring" } }} exit={{ opacity: 0, scale: 0 }}>Read more</motion.button></Link>
                    </motion.section>
                </>
                : <Loader />}

            {latestNews.length > 0 ?
                <motion.section initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1, transition: { duration: 1, type: "spring" } }} exit={{ opacity: 0, scale: 0 }} className='news-secondest-container'>
                    <div className='news-secondest-wrapper'>
                        <div className='news-secondest-wrapper-img' style={{ backgroundImage: `url(${latestNews[1].img})` }}></div>
                        <div className='news-secondest-wrapper-txt'>
                            <p className='news-secondest-wrapper-txt-date'>{latestNews[1].date}</p>
                            <p className='news-secondest-wrapper-txt-title'>{latestNews[1].title}</p>
                            <p className='news-secondest-wrapper-txt-sDescription'>{latestNews[1].sDescription}</p>
                            <Link to={`/news/${latestNews[1].id}`}><motion.button className='btns-news-read-more' whileHover={{ backgroundColor: '#5a5a5a' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 1, type: "spring" } }} exit={{ opacity: 0, scale: 0 }}>Read more</motion.button></Link>
                        </div>
                    </div>
                    <div className='news-secondest-wrapper'>
                        <div className='news-secondest-wrapper-img' style={{ backgroundImage: `url(${latestNews[2].img})` }}></div>
                        <div className='news-secondest-wrapper-txt'>
                            <p className='news-secondest-wrapper-txt-date'>{latestNews[2].date}</p>
                            <p className='news-secondest-wrapper-txt-title'>{latestNews[2].title}</p>
                            <p className='news-secondest-wrapper-txt-sDescription'>{latestNews[2].sDescription}</p>
                            <Link to={`/news/${latestNews[2].id}`}><motion.button className='btns-news-read-more' whileHover={{ backgroundColor: '#5a5a5a' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 1, type: "spring" } }} exit={{ opacity: 0, scale: 0 }}>Read more</motion.button></Link>
                        </div>
                    </div>
                </motion.section>
                : <Loader />}
            <div className='news-regular-container'>
                {latestNews.length > 0 ?
                    latestNews
                        .filter((_, index) => index >= 3) // Exclude the first three items
                        .map((news) => (
                            <motion.div whileHover={{ cursor: 'pointer', boxShadow: '0 0 10px 1px #ffffff' }} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1, transition: { duration: 1, type: "spring" } }} exit={{ opacity: 0, scale: 0 }} key={news.id} className='news-regular-wrapper'>
                                <div className='news-regular-wrapper-img' style={{ backgroundImage: `url(${news.img})` }}></div>
                                <div className='news-regular-wrapper-txt'>
                                    <p className='news-regular-wrapper-txt-date'>{news.date}</p>
                                    <p className='news-regular-wrapper-txt-title'>{news.title}</p>
                                    <p className='news-regular-wrapper-txt-sDescription'>{news.sDescription}</p>
                                    <Link to={`/news/${news.id}`}><motion.button className='btns-news-read-more' whileHover={{ backgroundColor: '#5a5a5a' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 1, type: "spring" } }} exit={{ opacity: 0, scale: 0 }}>Read more</motion.button></Link>
                                </div>
                            </motion.div>
                        ))
                    : null
                }
            </div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} className='home-footer'>
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

        </div>
    )
}
