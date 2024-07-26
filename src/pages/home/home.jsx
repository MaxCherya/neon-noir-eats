// libraries
import React, { useEffect, useState } from 'react'
import { motion, useScroll } from "framer-motion"
import { db } from '../../firebase'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'

// css styles
import './home.css'

// imgs
import { Link } from 'react-router-dom'

// components
import ShimmeringLight from '../../components/shimmering-light/shimmeringLight'

// icons
import { GiLuckyFisherman } from "react-icons/gi";
import { GiFishBucket } from "react-icons/gi";
import { BiSolidSushi } from "react-icons/bi";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoLogoYoutube } from "react-icons/io";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

export default function Home() {

  const { scrollYProgress } = useScroll();

  const newsRef = collection(db, "news")
  const [latestNews, setLatestNews] = useState([]);

  const getNewsList = async () => {
    try {
      const newsQuery = query(newsRef, orderBy('date', 'desc'), limit(3));
      const data = await getDocs(newsQuery);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setLatestNews(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getNewsList();
  }, []);

  return (
    <div className='home-body'>
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
      <div className='home-header'>
        <div className='home-header-text'>
          <motion.p initial={{ opacity: 0, scale: 0, x: "35svw" }} whileInView={{ opacity: 1, scale: 1, x: 0, transition: { duration: 1, type: "spring", delay: 0.5 } }} exit={{ opacity: 0, scale: 0, x: "35svw" }} className='home-header-text-name'>Neon Noir Eats</motion.p>
          <motion.p initial={{ opacity: 0, scale: 0, y: -100, x: -100 }} whileInView={{ opacity: 1, scale: 1, y: 0, x: 0, transition: { duration: 1, type: "spring", delay: 1 } }} exit={{ opacity: 0, scale: 0, y: -100, x: -100 }} className='home-header-text-phrase'>Where Darkness<br />Meets Deliciousness</motion.p>
          <motion.p initial={{ opacity: 0, scale: 0, y: -100, x: -100 }} whileInView={{ opacity: 1, scale: 1, y: 0, x: 0, transition: { duration: 1, type: "spring", delay: 1.5 } }} exit={{ opacity: 0, scale: 0, y: -100, x: -100 }} className='home-header-text-description'>Dive into a world of darkness, where dazzling sushi ignites your taste buds.  Experience a culinary adventure unlike any other.</motion.p>
          <div className='home-header-btns'>
            <Link to='/menu'><motion.button whileHover={{ backgroundColor: '#56a6f7' }} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1, transition: { duration: 1, type: "spring", delay: 2 } }} exit={{ opacity: 0, scale: 0 }} className='home-header-btns-order'>Order Delivery</motion.button></Link>
            <Link to='/about'><motion.button whileHover={{ backgroundColor: '#5a5a5a' }} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1, transition: { duration: 1, type: "spring", delay: 2 } }} exit={{ opacity: 0, scale: 0 }} className='home-header-btns-about'>Learn More</motion.button></Link>
          </div>
        </div>
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 3, type: "spring" }} exit={{ opacity: 0 }} className='home-header-img'></motion.span>
      </div>
      <motion.div className='home-main-features' initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2, type: 'spring' }} className='home-main-features-pctr'></motion.section>
        <section className='home-main-features-txt'>
          <motion.p initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 2, type: 'spring' }} className='home-main-features-txt-header'>From Fjord to Plate</motion.p>
          <motion.span initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 2, type: 'spring' }}><GiLuckyFisherman className='home-main-features-icon' /></motion.span>
          <motion.p initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 2, type: 'spring' }} className='home-main-features-txt-description'>We take pride in the journey of our sushi. Our fish are caught fresh in the pristine waters of Norway and delivered directly to our chefs, ensuring the highest quality and ultimate taste.</motion.p>
        </section>
      </motion.div>
      <motion.div className='home-main-features1' initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
        <section className='home-main-features-txt'>
          <motion.p initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 2, type: 'spring' }} className='home-main-features-txt-header'>Selective Sourcing</motion.p>
          <motion.span initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 2, type: 'spring' }}><GiFishBucket className='home-main-features-icon' /></motion.span>
          <motion.p initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 2, type: 'spring' }} className='home-main-features-txt-description'>We meticulously select only the highest quality fish, ensuring freshness and avoiding any unwanted bycatch. This dedication allows us to offer a curated sushi experience that respects the ocean.</motion.p>
        </section>
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2, type: 'spring' }} className='home-main-features-pctr1'></motion.section>
      </motion.div>
      <motion.div className='home-main-features' initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2, type: 'spring' }} className='home-main-features-pctr2'></motion.section>
        <section className='home-main-features-txt'>
          <motion.p initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 2, type: 'spring' }} className='home-main-features-txt-header'>Artisanal Preparation</motion.p>
          <motion.span initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 2, type: 'spring' }}><BiSolidSushi className='home-main-features-icon' /></motion.span>
          <motion.p initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 2, type: 'spring' }} className='home-main-features-txt-description'>Each piece of sushi is handcrafted by our skilled chefs using traditional techniques. While this may take slightly longer, it guarantees a unique and delicious experience in every bite.</motion.p>
        </section>
      </motion.div>
      <div className='home-carousel-container'>
        <section className='home-carousel-wrapper'>
          <span>Ukraine</span>
          <span>Turkey</span>
          <span>Poland</span>
          <span>Estonia</span>
          <span>Spain</span>
          <span>Ukraine</span>
          <span>Turkey</span>
          <span>Poland</span>
          <span>Estonia</span>
          <span>Spain</span>
        </section>
      </div>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} className='home-news-container'>
        <p className='home-news-container-header'>Latest News</p>
        <section className='home-news-container-latest-container'>
          <div className='home-news-container-latest-wrapper'>
            {latestNews.map((news) => (
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 1 } }} whileHover={{ boxShadow: '0 0 20px 5px #007FFF', cursor: 'pointer' }} className='home-news-container-latest-news-wrapper'>
                <div className="home-news-container-latest-news-img" style={{ backgroundImage: `url(${news.img})` }}></div>
                <div className="home-news-container-latest-news-txt">
                  <Link to={`/news/${news.id}`}><p>{news.title}</p></Link>
                </div>
              </motion.div>
            ))}
          </div>
          <Link to='/news'><motion.button whileHover={{ backgroundColor: '#5a5a5a' }} initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 1, delay: 0.6, type: 'spring' } }} className='home-news-container-btn'>More News →</motion.button></Link>
        </section>
      </motion.div>
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
