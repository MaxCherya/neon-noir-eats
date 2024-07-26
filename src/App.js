// normalize css
import './App.css'

// includes libraries
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

//components
import Navbar from './components/nav-bar/navbar';
import Loader from './components/loader';
import { CartProvider } from './components/cart-context/cartContext';
import { AuthProvider } from './AuthContext';

//pages
import Home from './pages/home/home';
import NotFound from './pages/notFound/notFound';
import News from './pages/news/news';
import About from './pages/about/about';
import Contacts from './pages/contacts/contacts';
import Menu from './pages/menu/menu';
import Cart from './pages/cart/cart';
import Gallery from './pages/gallery/gallery';
import NewsDetail from './pages/news-detail/NewsDetail';
import AdmPnl from './pages/adm-pnl/adm-pnl';

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleLoad = () => setLoading(false);

    // Simulate a network delay (for demonstration purposes)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Listen for when the page fully loads
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(timer);
    };
  }, [location]);

  useEffect(() => {
    setLoading(true);
  }, [location]);

  return (
    <div>
      {loading && <Loader />}
      <CartProvider>
      <AuthProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/news' element={<News />} />
        <Route path='/news/:id' element={<NewsDetail />} />
        <Route path='/about' element={<About />} />
        <Route path='/contacts' element={<Contacts />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/adm-pnl' element={<AdmPnl />} />
        <Route path='*' element={<NotFound /> } />
      </Routes>
      </AuthProvider>
      </CartProvider>
    </div>
  );
}

export default App;
