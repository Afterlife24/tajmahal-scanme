import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Clock, Star, Heart, Minus, Plus, ShoppingCart, X } from 'lucide-react';
import { loadMenuData } from '../pictures';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [menuData, setMenuData] = useState([]);
  const [comboItems, setComboItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const { cartItems, addToCart, updateCartItem } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  const [existingItem, setExistingItem] = useState(null);
  const [selectedCombo, setSelectedCombo] = useState(null);
  const [comboQuantity, setComboQuantity] = useState(1);

  const [touchStartX, setTouchStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [showEdgeIndicator, setShowEdgeIndicator] = useState(true);
  const touchAreaRef = useRef(null);
  const inactivityTimer = useRef(null);
  const swipeThreshold = 100;

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadMenuData();
      setMenuData(data);
      const foundItem = data.find(i => i.id === parseInt(id));
      setItem(foundItem);

      if (foundItem?.combinations?.length > 0) {
        const combos = foundItem.combinations
          .map(name => data.find(d => d.name.trim().toLowerCase() === name.trim().toLowerCase()))
          .filter(Boolean);
        setComboItems(combos);
      }

      // Check if this item exists in cart
      const cartItem = cartItems.find(item => item.id === parseInt(id));
      if (cartItem) {
        setExistingItem(cartItem);
        setQuantity(cartItem.quantity);
      } else {
        setExistingItem(null);
        setQuantity(1);
      }
    };
    fetchData();

    inactivityTimer.current = setTimeout(() => setShowEdgeIndicator(false), 4000);
    return () => clearTimeout(inactivityTimer.current);
  }, [id, cartItems]);

  const resetInactivityTimer = () => {
    setShowEdgeIndicator(true);
    clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      setShowEdgeIndicator(false);
    }, 2000);
  };

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
    resetInactivityTimer();
  };

  const handleAddToCart = () => {
    if (!item) return;
    
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: quantity
    };

    if (existingItem) {
      updateCartItem(cartItem.id, cartItem.quantity);
    } else {
      addToCart(cartItem);
    }
    
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
    resetInactivityTimer();
  };

  const navigateToItem = (direction) => {
    if (!menuData.length) return;
    const currentIndex = menuData.findIndex(i => i.id === parseInt(id));
    const newIndex = direction === 'next'
      ? (currentIndex + 1) % menuData.length
      : (currentIndex - 1 + menuData.length) % menuData.length;

    navigate(`/item/${menuData[newIndex].id}`);
    // Reset states for the new item
    setQuantity(1);
    setExistingItem(null);
    setIsSwiping(false);
    setCurrentX(0);
    resetInactivityTimer();
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setIsSwiping(true);
    resetInactivityTimer();
  };

  const handleTouchMove = (e) => {
    if (!isSwiping) return;
    setCurrentX(e.touches[0].clientX - touchStartX);
  };

  const handleTouchEnd = () => {
    if (!isSwiping) return;
    if (Math.abs(currentX) > swipeThreshold) {
      navigateToItem(currentX > 0 ? 'prev' : 'next');
    } else {
      setIsSwiping(false);
      setCurrentX(0);
    }
  };

  const openComboPopup = (combo) => {
    setSelectedCombo(combo);
    setComboQuantity(1);
  };

  const addComboToCart = () => {
    if (!selectedCombo) return;
    
    addToCart({
      id: selectedCombo.id,
      name: selectedCombo.name,
      price: selectedCombo.price,
      image: selectedCombo.image,
      quantity: comboQuantity
    });
    setSelectedCombo(null);
  };

  const totalPrice = (Number(item?.price || 0) * quantity).toFixed(2);
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div
      className="min-h-screen bg-[#f5f6fa] flex flex-col"
      onClick={resetInactivityTimer}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={touchAreaRef}
    >
      <Navbar />

      {/* Hero Image */}
      <div className="relative h-[35vh] overflow-hidden">
        <img src={item?.image} alt={item?.name} className="w-full h-full object-cover" />
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 bg-white/80 p-2 rounded-full shadow">
          <ChevronLeft className="text-gray-700 w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="bg-white -mt-6 rounded-t-3xl p-6 shadow-md">
        {showEdgeIndicator && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-sm px-3 py-1 rounded-full animate-pulse">
            Swipe to browse
          </div>
        )}

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mt-4 text-gray-900">{item?.name}</h1>
            <div className="flex items-center mt-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-600 ml-1">{item?.rating || '4.5'}</span>
              <Clock className="w-4 h-4 text-gray-400 ml-3" />
              <span className="text-sm text-gray-600 ml-1">{item?.time || '15-20 min'}</span>
            </div>
          </div>
          <button className="p-2 rounded-full border border-gray-200">
            <Heart className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <p className="mt-4 text-gray-600">{item?.desc}</p>

        <div className="flex items-center justify-center gap-4 my-6">
          <button onClick={() => handleQuantityChange(-1)} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
            <Minus className="text-indigo-600" />
          </button>
          <span className="text-xl font-semibold">{quantity}</span>
          <button onClick={() => handleQuantityChange(1)} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
            <Plus className="text-indigo-600" />
          </button>
        </div>

        {/* Combos */}
        {comboItems.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Best Combinations</h2>
            <div className="grid grid-cols-2 gap-4">
              {comboItems.map((combo, index) => (
                <div
                  key={index}
                  onClick={() => openComboPopup(combo)}
                  className="bg-white border rounded-xl shadow-sm hover:shadow-md cursor-pointer overflow-hidden"
                >
                  <img src={combo.image} alt={combo.name} className="h-28 w-full object-cover" />
                  <div className="p-2 text-sm font-medium text-gray-800">{combo.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50 shadow">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <div>
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-xl font-bold text-gray-800">€{totalPrice}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className={`px-6 py-3 rounded-lg text-white font-medium ${addedToCart ? 'bg-green-500' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              {addedToCart ? 'Added!' : existingItem ? 'Update Cart' : 'Add to Cart'}
            </button>
            <button onClick={() => navigate('/cart')} className="relative px-4 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Combo Popup */}
      {selectedCombo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md relative">
            <button onClick={() => setSelectedCombo(null)} className="absolute top-3 right-3">
              <X className="w-5 h-5 text-gray-500" />
            </button>
            <img src={selectedCombo.image} alt={selectedCombo.name} className="w-full h-40 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-bold">{selectedCombo.name}</h3>
            <p className="text-gray-600 mb-4">Price: €{selectedCombo.price}</p>
            <div className="flex justify-center items-center mb-4">
              <button onClick={() => setComboQuantity(prev => Math.max(1, prev - 1))} className="p-2 bg-gray-200 rounded-full">
                <Minus className="text-indigo-600" />
              </button>
              <span className="mx-4 text-lg">{comboQuantity}</span>
              <button onClick={() => setComboQuantity(prev => prev + 1)} className="p-2 bg-gray-200 rounded-full">
                <Plus className="text-indigo-600" />
              </button>
            </div>
            <button
              onClick={addComboToCart}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetails;