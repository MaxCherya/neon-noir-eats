// libraries
import React from 'react'
import { motion, useScroll } from "framer-motion"
import { Link } from 'react-router-dom';

// styles
import './about.css'

// components
import ShimmeringLight from '../../components/shimmering-light/shimmeringLight'

// icons
import { FaPhoneVolume } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoLogoYoutube } from "react-icons/io";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

export default function About() {

    const { scrollYProgress } = useScroll();

    return (
        <div className='about-body'>
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
            <motion.section initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1, transition: { duration: 1, type: "spring" } }} exit={{ opacity: 0, scale: 0 }} className='about-sec'>
                <div className='about-sec-bg'></div>
                <p>Welcome</p>
            </motion.section>
            <motion.section initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1, transition: { duration: 1, type: "spring" } }} exit={{ opacity: 0, scale: 0 }} className='about-sec1'>
                <ShimmeringLight />
                <div className='about-sec1-txt'>
                    <p className='about-sec1-txt-header'>Neon Noir Eats: Where Darkness Meets Deliciousness</p>
                    <p className='about-sec1-txt-description'>Welcome to Neon Noir Eats, a portal to a world where electrifying flavors collide with the captivating atmosphere of a synthwave dreamscape. We're more than just a sushi restaurant; we're an experience that ignites your senses and leaves you wanting more.</p>
                </div>
                <div className='about-sec1-img'>
                    <img src='https://ideogram.ai/assets/image/lossless/response/VFnoRUHrSUqwjSNS47tB4w' alt='welcoming' />
                </div>
            </motion.section>
            <motion.section initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1, transition: { duration: 1, type: "spring" } }} exit={{ opacity: 0, scale: 0 }} className='about-sec1'>
                <ShimmeringLight />
                <div className='about-sec1-img'>
                    <img src='https://ideogram.ai/assets/progressive-image/balanced/response/yF2I-HufRCa1Lq371PDT9w' alt='cuisine' />
                </div>
                <div className='about-sec1-txt'>
                    <p className='about-sec1-txt-header'>A Fusion of Flavor and Style:</p>
                    <p className='about-sec1-txt-description'>Our culinary philosophy is a bold fusion of Japanese tradition and modern innovation. We use the freshest, high-quality ingredients to create delectable sushi dishes that are both visually stunning and bursting with flavor.  Imagine classic nigiri and maki alongside innovative creations that tantalize your eyes and palate.  Think vibrant presentations, unexpected flavor combinations, and a touch of artistic flair in every dish.</p>
                </div>
            </motion.section>
            <motion.section initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1, transition: { duration: 1, type: "spring" } }} exit={{ opacity: 0, scale: 0 }} className='about-sec1'>
                <ShimmeringLight />
                <div className='about-sec1-txt'>
                    <p className='about-sec1-txt-header'>A Synthwave Oasis:</p>
                    <p className='about-sec1-txt-description'>Step into Neon Noir Eats and prepare to be transported. Bathed in the cool glow of neon lights, our restaurant features pixelated art and sleek design elements that create a captivating atmosphere. Pulsating beats set the mood for a truly unique dining experience that blends the best of Japanese cuisine with a dash of futuristic flair.</p>
                </div>
                <div className='about-sec1-img'>
                    <img src='https://ideogram.ai/assets/image/lossless/response/5_g8hF9bQ4W05EUc-GTs3w' alt='style' />
                </div>
            </motion.section>
            <motion.section initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1, transition: { duration: 1, type: "spring" } }} exit={{ opacity: 0, scale: 0 }} className='about-sec1'>
                <ShimmeringLight />
                <div className='about-sec1-img'>
                    <img src='https://ideogram.ai/assets/progressive-image/balanced/response/N6U3hIxnSdiMHO3Uu3a1AQ' alt='culture' />
                </div>
                <div className='about-sec1-txt'>
                    <p className='about-sec1-txt-header'>Beyond the Plate:</p>
                    <p className='about-sec1-txt-description'>Neon Noir Eats is a place where good vibes and delicious food come together. We regularly host themed nights with live music and entertainment that perfectly complement the restaurant's atmosphere. Whether you're a seasoned sushi aficionado or simply looking for an unforgettable night out, we offer an experience unlike any other.</p>
                </div>
            </motion.section>
            <motion.section initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1, transition: { duration: 1, type: "spring" } }} exit={{ opacity: 0, scale: 0 }} className='about-sec1'>
                <ShimmeringLight />
                <div className='about-sec1-txt'>
                    <p className='about-sec1-txt-header'>Commitment to Sustainability:</p>
                    <p className='about-sec1-txt-description'>We believe in deliciousness with a conscience. We source our ingredients from responsible fisheries and partners who prioritize the health of our oceans.  Sustainability is at the heart of everything we do, ensuring a bright future for our planet and the incredible flavors you've come to expect at Neon Noir Eats.</p>
                </div>
                <div className='about-sec1-img'>
                    <img src='https://ideogram.ai/assets/progressive-image/balanced/response/vssFPB6iTVi1R3WuCgHZNw' alt='delivery' />
                </div>
            </motion.section>
            <motion.section initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1, transition: { duration: 1, type: "spring" } }} exit={{ opacity: 0, scale: 0 }} className='about-sec1'>
                <ShimmeringLight />
                <div className='about-sec1-img'>
                    <img src='https://ideogram.ai/assets/image/lossless/response/2IzaKec5QC-LA8rF83DDBg' alt='join us' />
                </div>
                <div className='about-sec1-txt'>
                    <p className='about-sec1-txt-header'>Join the Neon Noir Revolution:</p>
                    <p className='about-sec1-txt-description'>We invite you to embark on a culinary adventure with us. Explore our menu, immerse yourself in the atmosphere, and discover why Neon Noir Eats is the ultimate destination for a truly electrifying dining experience.</p>
                </div>
            </motion.section>
            <section className='about-sec2'>
                <Link to='/menu'><motion.button whileHover={{ backgroundColor: '#56a6f7' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 1, type: "spring" } }} exit={{ opacity: 0, scale: 0 }} className='about-sec2-btn-order'>Order food</motion.button></Link>
                <Link to='/news'><motion.button whileHover={{ backgroundColor: '#5a5a5a' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 1, type: "spring" } }} exit={{ opacity: 0, scale: 0 }} className='about-sec2-btn-news'>Latest news</motion.button></Link>
            </section>
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
