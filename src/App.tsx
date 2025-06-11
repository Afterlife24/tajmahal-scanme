import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuPage from './pages/MenuPage';
import About from './pages/About';
import ItemDetails from './pages/ItemDetails';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-[#E8F3F1]">
          <Routes>
            <Route path="/" element={<MenuPage />} />
            <Route path="/about" element={<About />} />

            <Route path="/item/:id" element={<ItemDetails />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;











