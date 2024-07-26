// libraries
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { doc, getDoc } from 'firebase/firestore';
import { format } from 'date-fns';

// components
import Loader from '../../components/loader';

// styles
import "./NewsDetail.css"

const NewsDetail = () => {

    const { id } = useParams();
    const [newsDetail, setNewsDetail] = useState(null);

    const newsRef = collection(db, "news")
    const [latestNews, setLatestNews] = useState([]);

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
        const fetchNewsDetail = async () => {
            const newsDoc = doc(db, 'news', id);
            const newsData = await getDoc(newsDoc);
            if (newsData.exists()) {
                setNewsDetail({
                    ...newsData.data(),
                    date: format(newsData.data().date.toDate(), "do MMMM yyyy")
                });
            } else {
                console.log('No such document!');
            }
        };
        fetchNewsDetail();
    }, [id]);

    useEffect(() => {
        getNewsList();
    }, []);

    return (
        newsDetail ? (
            <section id='newsd-body'>
                <section className='newsd-left'>
                    <h1>{newsDetail.title}</h1>
                    <p>{newsDetail.date}</p>
                    <img src={newsDetail.img} alt={newsDetail.title} />
                    <p>{newsDetail.description}</p>
                    <div className='newsd-left-main-text' dangerouslySetInnerHTML={{ __html: newsDetail.text }} />
                </section>
                <section className='newsd-right'>
                    {latestNews.slice(0, 7).map((news) => 
                        news.id === id ? null : (
                            <div className='newsd-right-specific'>
                                <Link to={`/news/${news.id}`}><img src={news.img} alt={news.title} /></Link>
                                <Link to={`/news/${news.id}`}><p className='newsd-right-st'>{news.title}</p></Link>
                            </div>
                        )
                    )}
                </section>
            </section>
        ) : (
            <Loader />
        )
    );
};

export default NewsDetail;
