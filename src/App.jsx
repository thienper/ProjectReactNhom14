import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Layout from './components/Layout'; // mới thêm
import AccountPage from './pages/Account';
import CartPage from './pages/Cart';
import Home from './pages/Home';
import MensLeather from './pages/MensLeather';
import MensSandals from './pages/MensSandals';
import MensSports from './pages/MensSports';
import WomensHeels from './pages/WomensHeels';
import WomensSandals from './pages/WomensSandals';
import WomensSports from './pages/WomensSports';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route cha */}
        <Route path="/" element={<Layout />}>
          {/* Các route con */}
          <Route index element={<Home />} />
          <Route path="mens-sports" element={<MensSports />} />
          <Route path="mens-sandals" element={<MensSandals />} />
          <Route path="mens-leather" element={<MensLeather />} />
          <Route path="womens-sports" element={<WomensSports />} />
          <Route path="womens-sandals" element={<WomensSandals />} />
          <Route path="womens-heels" element={<WomensHeels />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
