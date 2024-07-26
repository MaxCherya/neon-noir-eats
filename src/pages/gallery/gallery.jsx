// libraries
import React, { useEffect, useState } from 'react'
import { db, storage } from '../../firebase'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, Timestamp } from 'firebase/firestore';
import { format } from 'date-fns';
import { auth, googleProvider } from '../../firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../../AuthContext';
import { motion, useScroll } from "framer-motion"
import { v4 } from "uuid";
import { deleteObject, getDownloadURL, ref, ref as sRef, uploadBytes } from 'firebase/storage';

// styles
import './gallery.css'

// icons
import { MdDeleteForever } from "react-icons/md";
import { Link } from 'react-router-dom';

export default function Gallery() {

    const [postsList, setPostsList] = useState([]);
    const postsRef = collection(db, 'posts');

    const { user, setUser } = useAuth();

    const { scrollYProgress } = useScroll();

    const [addPost, toggleAddPost] = useState(false);
    const [newImg, setNewImg] = useState(null);
    const [newDescription, setNewDescription] = useState('');

    const signInGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            loggedInSuc();
        }
        catch (err) {
            console.error(err)
            toast.error(`'${err}'`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            loggedOutSuc();
        }
        catch (err) {
            console.error(err)
        }
    }

    const loggedInSuc = () => toast.success('You have logged in!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const loggedOutSuc = () => toast.success('You have logged out from your account', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const added = () => toast.success('Post was added on timeline!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const getPostsList = async () => {
        try {
            const postsQuery = query(postsRef, orderBy('date', 'desc'));
            const data = await getDocs(postsQuery);
            const postsItems = data.docs.map((doc) => {
                const postData = doc.data();
                const formattedDate = postData.date ? format(postData.date.toDate(), "do MMMM yyyy") : null;
                return {
                    ...postData,
                    id: doc.id,
                    date: formattedDate,
                };
            });
            setPostsList(postsItems);
        } catch (err) {
            console.error('Error fetching posts items:', err);
        }
    };

    const submitNewPostHandler = async () => {
        const imageId = v4();
        const imagesProductsRef = sRef(storage, `posts/${imageId}`);
        try {
            await uploadBytes(imagesProductsRef, newImg);
            const downloadURL = await getDownloadURL(imagesProductsRef);
            const getCurrentTime = Timestamp.now();
            await addDoc(postsRef, { description: newDescription, img: downloadURL, postedby: user.displayName, date: getCurrentTime });
            added();
            setNewDescription('');
            setNewImg(null);
            toggleAddPost(false);
            getPostsList();
        }
        catch (err) {
            console.log(err);
        }
    };

    const postDeleteHandler = async (id) => {
        const postRef = doc(db, 'posts', id);

        try {
            const postDoc = await getDoc(postRef);

            if (postDoc.exists()) {
                const postData = postDoc.data();
                const imgURL = postData.img;
                const imgRef = ref(storage, imgURL);
                await deleteObject(imgRef);
                await deleteDoc(postRef);
                setPostsList(prevPosts => prevPosts.filter(post => post.id !== id));
                getPostsList();
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getPostsList();
    }, []);

    return (
        <div id='gallery-body'>
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
            <ToastContainer />
            <section id='gallery-reg-sec'>
                {user ? (
                    <div className='gallery-logged-in'>
                        <img src={user.photoURL} alt={user.displayName} />
                        <div className='gallery-btns-reg-wrp'>
                            <button className='gallery-btn-reg' onClick={() => toggleAddPost(!addPost)}>Add Post</button>
                            {user.uid === 'zRFicWTC5BTeeqw3nuXjN2nHrQc2' ? <Link to='/adm-pnl'><button className='gallery-btn-reg'>Admin Panel</button></Link> : null}
                            <button className='gallery-btn-reg' onClick={logout}>Log Out</button>
                        </div>
                    </div>
                ) : <button className='gallery-btn-reg' onClick={signInGoogle}>Add Post</button>}
            </section>
            {addPost ? (
                <motion.section initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1, transition: { duration: 1, type: "spring" } }} exit={{ opacity: 0, scale: 0 }} className='gallery-add-post'>
                    <input type='file' accept='image/png, image/jpeg' onChange={(e) => setNewImg(e.target.files[0])} />
                    <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder='Your thoughts here' />
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                        <button className='gallery-btn-reg' disabled={newImg === null || newDescription.length === 0} onClick={submitNewPostHandler}>Submit</button>
                        <button className='gallery-btn-reg' onClick={() => toggleAddPost(!addPost)}>Cancel</button>
                    </div>
                </motion.section>
            ) : null}
            <section id='gallery-posts-sec'>
                {postsList.length === 0 ? <h1>No posts yet...</h1> : null}
                {postsList.map((item) => (
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1, transition: { duration: 1, type: "spring" } }} exit={{ opacity: 0, scale: 0 }} className='gallery-posts-specific'>
                        {user.uid === 'zRFicWTC5BTeeqw3nuXjN2nHrQc2' ? <MdDeleteForever style={{ position: 'absolute', right: '1rem', top: '0.5rem', fontSize: '3rem', cursor: 'pointer' }} onClick={() => postDeleteHandler(item.id)} /> : null}
                        <img src={item.img} alt='memory' style={{ width: '50%', height: '50%' }} />
                        <div className='gallery-post-description'>
                            {item.description}
                        </div>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '3rem' }}>
                            <p className='gallery-dp'>{item.date}</p>
                            <p className='gallery-dp'>Posted by: {item.postedby}</p>
                        </div>
                    </motion.div>
                ))}
            </section>
        </div>
    )
}
