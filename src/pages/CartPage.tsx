// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   ChevronLeft, Minus, Plus, Trash2, CheckCircle, Clock, Check, Truck
// } from 'lucide-react';
// import { useCart } from '../context/CartContext';
// import Navbar from '../components/Navbar';
// import OtpVerification from './OtpVerification';

// const CartPage = () => {
//   const navigate = useNavigate();
//   const {
//     cartItems,
//     orders,
//     removeFromCart,
//     updateCartItem,
//     clearCart,
//     cartTotal,
//     addOrder,
//   } = useCart();

//   const [isCheckingOut, setIsCheckingOut] = useState(false);
//   const [orderSuccess, setOrderSuccess] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Delivery options state
//   const [showDeliveryPopup, setShowDeliveryPopup] = useState(false);
//   const [deliveryOptionSelected, setDeliveryOptionSelected] = useState<'tapAndCollect' | 'delivery' | null>(null);
//   const [showOtpVerification, setShowOtpVerification] = useState(false);
//   const [customerEmail, setCustomerEmail] = useState('');
  
//   // Form states
//   const [name, setName] = useState('');
//   const [address, setAddress] = useState('');

//   // Modify the handleCheckout function in CartPage.jsx
// const handleCheckout = async () => {
//   if (!deliveryOptionSelected) {
//       setShowDeliveryPopup(true);
//       return;
//   }

//   setIsCheckingOut(true);
//   setError(null);

//   try {
//       const orderData = {
//           dishes: cartItems.map(item => ({
//               id: item.id,
//               name: item.name,
//               price: item.price.toString(),
//               quantity: item.quantity,
//               image: item.image,
//           })),
//           email: customerEmail,
//           name: deliveryOptionSelected === 'delivery' ? name : undefined,
//           address: deliveryOptionSelected === 'delivery' ? address : undefined,
//           total: cartTotal.toFixed(2),
//           deliveryOption: deliveryOptionSelected,
//       };

//       const response = await fetch('https://5fz8cdygvi.execute-api.eu-west-3.amazonaws.com/createOrder', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(orderData),
//       });

//       const result = await response.json();
//       if (!response.ok || !result.success) {
//           throw new Error(result.error || 'Failed to place order');
//       }

//       // Add to local orders state
//       addOrder({
//           id: result.orderId,
//           dishes: [...cartItems],
//           total: cartTotal.toFixed(2),
//           orderTime: new Date().toISOString(),
//           status: 'preparing',
//           deliveryOption: deliveryOptionSelected,
//       });

//       clearCart();
//       setOrderSuccess(true);
//       setTimeout(() => setOrderSuccess(false), 3000);
//       setDeliveryOptionSelected(null);
//       setShowDeliveryPopup(false);
//       setShowOtpVerification(false);
//   } catch (err) {
//       setError(err instanceof Error ? err.message : 'Order failed. Try again.');
//   } finally {
//       setIsCheckingOut(false);
//   }
// };

//   const handleImageClick = (itemId: number) => navigate(`/item/${itemId}`);

//   const handleQuantityChange = (itemId: number, newQuantity: number) => {
//     if (newQuantity < 1) return;
//     updateCartItem(itemId, newQuantity);
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case 'completed': return <Check className="w-4 h-4 text-green-500" />;
//       case 'preparing': return <Clock className="w-4 h-4 text-yellow-500" />;
//       case 'delivered': return <Truck className="w-4 h-4 text-blue-500" />;
//       default: return null;
//     }
//   };

//   const renderDeliveryForm = () => {
//     if (deliveryOptionSelected === 'tapAndCollect') {
//       return (
//         <div className="space-y-4">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={customerEmail}
//               onChange={(e) => setCustomerEmail(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg"
//               placeholder="Enter your email"
//               required
//             />
//           </div>
//           <button
//             onClick={() => {
//               if (!customerEmail) {
//                 setError('Email is required');
//                 return;
//               }
//               setShowOtpVerification(true);
//             }}
//             className={`w-full ${isCheckingOut ? 'bg-indigo-600/70' : 'bg-indigo-600'} text-white py-3 rounded-lg font-medium`}
//           >
//             Verify Email
//           </button>
//         </div>
//       );
//     } else if (deliveryOptionSelected === 'delivery') {
//       return (
//         <div className="space-y-4">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//               Full Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg"
//               placeholder="Enter your full name"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
//               Delivery Address
//             </label>
//             <textarea
//               id="address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg"
//               placeholder="Enter your full address"
//               rows={3}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="delivery-email" className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               id="delivery-email"
//               value={customerEmail}
//               onChange={(e) => setCustomerEmail(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg"
//               placeholder="Enter your email"
//               required
//             />
//           </div>
//           <button
//             onClick={() => {
//               if (!customerEmail || !name || !address) {
//                 setError('All fields are required');
//                 return;
//               }
//               setShowOtpVerification(true);
//             }}
//             className={`w-full ${isCheckingOut ? 'bg-indigo-600/70' : 'bg-indigo-600'} text-white py-3 rounded-lg font-medium`}
//           >
//             Verify Email
//           </button>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 pb-32">
//       <Navbar />
//       <div className="sticky top-16 z-40 bg-white shadow-sm">
//         <div className="p-4 max-w-2xl mx-auto flex items-center">
//           <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-gray-100 mr-4">
//             <ChevronLeft className="w-6 h-6" />
//           </button>
//           <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
//         </div>
//       </div>

//       <div className="p-4 max-w-2xl mx-auto space-y-10">
//         {/* Current Order */}
//         <div>
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Order</h2>
//           {cartItems.length === 0 ? (
//             <div className="text-center py-8">
//               {orderSuccess ? (
//                 <>
//                   <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
//                   <p className="text-lg font-medium text-gray-900">Order sent successfully!</p>
//                   <p className="text-gray-500">Thank you for your purchase</p>
//                 </>
//               ) : (
//                 <p className="text-gray-500">Your cart is empty</p>
//               )}
//               <button
//                 onClick={() => navigate('/')}
//                 className="mt-4 text-indigo-600 font-medium"
//               >
//                 Continue Shopping
//               </button>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {error && (
//                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
//                   {error}
//                   <button
//                     onClick={() => setError(null)}
//                     className="absolute top-1 right-1 text-red-700"
//                   >
//                     ×
//                   </button>
//                 </div>
//               )}
//               {cartItems.map(item => (
//                 <div key={item.id} className="bg-white rounded-xl p-4 flex items-center gap-4">
//                   <div className="cursor-pointer" onClick={() => handleImageClick(item.id)}>
//                     <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
//                   </div>
//                   <div className="flex-1 min-w-0 cursor-pointer" onClick={() => handleImageClick(item.id)}>
//                     <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
//                     <p className="text-indigo-600 font-bold">
//                       €{(parseFloat(item.price) * item.quantity).toFixed(2)}
//                     </p>
//                     <p className="text-sm text-gray-500">€{parseFloat(item.price).toFixed(2)} each</p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleQuantityChange(item.id, item.quantity - 1);
//                       }}
//                       className="p-1 rounded-full bg-gray-100"
//                       disabled={item.quantity <= 1}
//                     >
//                       <Minus className="w-4 h-4" />
//                     </button>
//                     <span className="w-8 text-center">{item.quantity}</span>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleQuantityChange(item.id, item.quantity + 1);
//                       }}
//                       className="p-1 rounded-full bg-gray-100"
//                     >
//                       <Plus className="w-4 h-4" />
//                     </button>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         removeFromCart(item.id);
//                       }}
//                       className="p-1 rounded-full bg-gray-100 ml-2"
//                     >
//                       <Trash2 className="w-4 h-4 text-red-500" />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Order History */}
//         <div>
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Order History</h2>
//           {orders.length === 0 ? (
//             <div className="text-center py-8">
//               <p className="text-gray-500">No order history yet</p>
              
//             </div>
//           ) : (
//             orders.map(order => (
//               <div key={order.id} className="bg-white rounded-xl p-4 mb-4">
//                 <div className="flex justify-between items-center mb-2">
//                   <div className="flex items-center gap-2">
//                     <span className="font-medium text-gray-900">
//                       {new Date(order.orderTime).toLocaleDateString()}
//                     </span>
//                     {getStatusIcon(order.status)}
//                   </div>
//                   <span className="text-indigo-600 font-bold">€{order.total}</span>
//                 </div>
//                 <div className="space-y-3 mt-3">
//                   {order.dishes.map(item => (
//                     <div key={`${order.id}-${item.id}`} className="flex items-center gap-3">
//                       <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
//                       <div className="flex-1 min-w-0">
//                         <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
//                         <p className="text-sm text-gray-500">
//                           {item.quantity} × €{parseFloat(item.price).toFixed(2)}
//                         </p>
//                       </div>
//                       <span className="text-gray-700">
//                         €{(parseFloat(item.price) * item.quantity).toFixed(2)}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Checkout Bar */}
//       {cartItems.length > 0 && (
//         <div className="fixed bottom-20 left-0 right-0 bg-white p-4 border-t">
//           <div className="max-w-2xl mx-auto">
//             <div className="flex justify-between mb-4">
//               <span className="text-gray-600">Total</span>
//               <span className="text-xl font-bold text-gray-900">€{cartTotal.toFixed(2)}</span>
//             </div>
//             <button
//               onClick={() => setShowDeliveryPopup(true)}
//               disabled={isCheckingOut}
//               className={`w-full ${isCheckingOut ? 'bg-indigo-600/70' : 'bg-indigo-600'} text-white py-3 rounded-lg font-medium flex items-center justify-center`}
//             >
//               {isCheckingOut ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                   </svg>
//                   Processing...
//                 </>
//               ) : (
//                 'Checkout'
//               )}
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Delivery Option Popup */}
//       {showDeliveryPopup && !showOtpVerification && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-sm w-full">
//             {!deliveryOptionSelected ? (
//               <>
//                 <h3 className="text-xl font-bold text-center mb-6">How would you like to receive your order?</h3>
//                 <div className="space-y-4">
//                   <button
//                     onClick={() => setDeliveryOptionSelected('tapAndCollect')}
//                     className="w-full p-4 border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors"
//                   >
//                     <div className="font-bold mb-1">Tap & Collect</div>
//                     <div className="text-gray-600 text-sm">Pick up your order from our restaurant</div>
//                   </button>
//                   <button
//                     onClick={() => setDeliveryOptionSelected('delivery')}
//                     className="w-full p-4 border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors"
//                   >
//                     <div className="font-bold mb-1">Delivery</div>
//                     <div className="text-gray-600 text-sm">Get your order delivered to your address</div>
//                   </button>
//                 </div>
//                 <button
//                   onClick={() => setShowDeliveryPopup(false)}
//                   className="mt-6 w-full py-2 text-gray-700 font-medium hover:text-gray-900 transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </>
//             ) : (
//               <>
//                 <div className="flex items-center mb-4">
//                   <button
//                     onClick={() => setDeliveryOptionSelected(null)}
//                     className="p-1 rounded-full hover:bg-gray-100 mr-2"
//                   >
//                     <ChevronLeft className="w-5 h-5" />
//                   </button>
//                   <h3 className="text-xl font-bold">
//                     {deliveryOptionSelected === 'tapAndCollect' ? 'Tap & Collect' : 'Delivery Details'}
//                   </h3>
//                 </div>
//                 {renderDeliveryForm()}
//               </>
//             )}
//           </div>
//         </div>
//       )}

//       {/* OTP Verification Popup */}
//       {showOtpVerification && (
//         <OtpVerification
//           onVerify={handleCheckout}
//           onCancel={() => setShowOtpVerification(false)}
//           onEmailUpdate={(email) => setCustomerEmail(email)}
//           initialEmail={customerEmail}
//         />
//       )}
//     </div>
//   );
// };

// export default CartPage;
























import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft, Minus, Plus, Trash2, CheckCircle, Clock, Check, Truck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import OtpVerification from './OtpVerification';

interface Coordinates {
  latitude: number;
  longitude: number;
}

const CartPage = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    orders,
    removeFromCart,
    updateCartItem,
    clearCart,
    cartTotal,
    addOrder,
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deliveryMessage, setDeliveryMessage] = useState<string | null>(null);
  const [isDeliveryAvailable, setIsDeliveryAvailable] = useState<boolean>(false);
  const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);
  const [deliveryMessageColor, setDeliveryMessageColor] = useState<string>("green");
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [isDeliveryChecked, setIsDeliveryChecked] = useState<boolean>(false);

  // Delivery options state
  const [showDeliveryPopup, setShowDeliveryPopup] = useState(false);
  const [deliveryOptionSelected, setDeliveryOptionSelected] = useState<'tapAndCollect' | 'delivery' | null>(null);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  
  // Form states
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  // Fixed location for your restaurant
  const restaurantLocation = {
    latitude: 17.4704259,  // Replace with your restaurant's latitude
    longitude: 78.3405989  // Replace with your restaurant's longitude
  };

  // Haversine formula to calculate distance between two coordinates in kilometers
  const haversineDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const toRad = (deg: number) => deg * (Math.PI / 180);

    const R = 6371; // Earth's radius in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in kilometers
  };

  const checkDeliveryAvailability = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ latitude, longitude });

          // Calculate the distance to the restaurant
          const distance = haversineDistance(
            latitude,
            longitude,
            restaurantLocation.latitude,
            restaurantLocation.longitude
          );

          if (distance <= 6) { // 5km radius
            setDeliveryMessage("Delivery is available to your location!");
            setDeliveryMessageColor("green");
            setIsDeliveryAvailable(true);
          } else {
            setDeliveryMessage("Delivery is not available to your location (max 5km radius)");
            setDeliveryMessageColor("red");
            setIsDeliveryAvailable(false);
          }
          setIsMessageVisible(true);
          setIsDeliveryChecked(true);

          setTimeout(() => {
            setIsMessageVisible(false);
          }, 4000);
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setDeliveryMessage("Please enable location access to check delivery availability");
            setDeliveryMessageColor("red");
            setIsMessageVisible(true);
            setTimeout(() => setIsMessageVisible(false), 4000);
          } else {
            setDeliveryMessage("Error fetching your location");
            setDeliveryMessageColor("red");
            setIsMessageVisible(true);
            setTimeout(() => setIsMessageVisible(false), 4000);
          }
        }
      );
    } else {
      setDeliveryMessage("Geolocation is not supported by your browser");
      setDeliveryMessageColor("red");
      setIsMessageVisible(true);
      setTimeout(() => setIsMessageVisible(false), 4000);
    }
  };

  const handleCheckout = async () => {
    if (!deliveryOptionSelected) {
      setShowDeliveryPopup(true);
      return;
    }

    if (deliveryOptionSelected === 'delivery' && !isDeliveryChecked) {
      setError('Please check delivery availability before proceeding');
      return;
    }

    if (deliveryOptionSelected === 'delivery' && !isDeliveryAvailable) {
      setError('Delivery is not available to your location');
      return;
    }

    setIsCheckingOut(true);
    setError(null);

    try {
      const orderData = {
        dishes: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price.toString(),
          quantity: item.quantity,
          image: item.image,
        })),
        email: customerEmail,
        name: deliveryOptionSelected === 'delivery' ? name : undefined,
        address: deliveryOptionSelected === 'delivery' ? address : undefined,
        total: cartTotal.toFixed(2),
        deliveryOption: deliveryOptionSelected,
        coordinates: deliveryOptionSelected === 'delivery' ? coordinates : undefined,
      };

      const response = await fetch('https://5fz8cdygvi.execute-api.eu-west-3.amazonaws.com/createOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to place order');
      }

      // Add to local orders state
      addOrder({
        id: result.orderId,
        dishes: [...cartItems],
        total: cartTotal.toFixed(2),
        orderTime: new Date().toISOString(),
        status: 'preparing',
        deliveryOption: deliveryOptionSelected,
      });

      clearCart();
      setOrderSuccess(true);
      setTimeout(() => setOrderSuccess(false), 3000);
      setDeliveryOptionSelected(null);
      setShowDeliveryPopup(false);
      setShowOtpVerification(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Order failed. Try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleImageClick = (itemId: number) => navigate(`/item/${itemId}`);

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCartItem(itemId, newQuantity);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <Check className="w-4 h-4 text-green-500" />;
      case 'preparing': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'delivered': return <Truck className="w-4 h-4 text-blue-500" />;
      default: return null;
    }
  };

  const renderDeliveryForm = () => {
    if (deliveryOptionSelected === 'tapAndCollect') {
      return (
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
              required
            />
          </div>
          <button
            onClick={() => {
              if (!customerEmail) {
                setError('Email is required');
                return;
              }
              setShowOtpVerification(true);
            }}
            className={`w-full ${isCheckingOut ? 'bg-indigo-600/70' : 'bg-indigo-600'} text-white py-3 rounded-lg font-medium`}
          >
            Verify Email
          </button>
        </div>
      );
    } else if (deliveryOptionSelected === 'delivery') {
      return (
        <div className="space-y-4">
          {/* Check Delivery Availability Button - Moved to top */}
          <div>
          <p className="text-xs text-red-500 mt-1 mb-4">
              Please check delivery availability before filling out the form
            </p>
            <button
              onClick={checkDeliveryAvailability}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-medium"
            >
              Check Delivery Availability
            </button>
            
          </div>

          {/* Form fields - disabled until delivery is checked */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your full name"
              required
              disabled={!isDeliveryChecked}
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Address
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your full address"
              rows={3}
              required
              disabled={!isDeliveryChecked}
            />
          </div>
          <div>
            <label htmlFor="delivery-email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="delivery-email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
              required
              disabled={!isDeliveryChecked}
            />
          </div>
          
          <button
            onClick={() => {
              if (!customerEmail || !name || !address) {
                setError('All fields are required');
                return;
              }
              if (!isDeliveryChecked) {
                setError('Please check delivery availability first');
                return;
              }
              if (!isDeliveryAvailable) {
                setError('Delivery is not available to your location');
                return;
              }
              setShowOtpVerification(true);
            }}
            className={`w-full ${isCheckingOut ? 'bg-indigo-600/70' : 'bg-indigo-600'} text-white py-3 rounded-lg font-medium`}
            disabled={!isDeliveryAvailable}
          >
            Verify Email
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <Navbar />
      <div className="sticky top-16 z-40 bg-white shadow-sm">
        <div className="p-4 max-w-2xl mx-auto flex items-center">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-gray-100 mr-4">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
        </div>
      </div>

      {deliveryMessage && isMessageVisible && (
        <div
          style={{
            position: "fixed",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: deliveryMessageColor,
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            fontWeight: "bold",
            zIndex: 1000,
          }}
        >
          {deliveryMessage}
        </div>
      )}

      <div className="p-4 max-w-2xl mx-auto space-y-10">
        {/* Current Order */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Order</h2>
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              {orderSuccess ? (
                <>
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                  <p className="text-lg font-medium text-gray-900">Order sent successfully!</p>
                  <p className="text-gray-500">Thank you for your purchase</p>
                </>
              ) : (
                <p className="text-gray-500">Your cart is empty</p>
              )}
              <button
                onClick={() => navigate('/')}
                className="mt-4 text-indigo-600 font-medium"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                  {error}
                  <button
                    onClick={() => setError(null)}
                    className="absolute top-1 right-1 text-red-700"
                  >
                    ×
                  </button>
                </div>
              )}
              {cartItems.map(item => (
                <div key={item.id} className="bg-white rounded-xl p-4 flex items-center gap-4">
                  <div className="cursor-pointer" onClick={() => handleImageClick(item.id)}>
                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 cursor-pointer" onClick={() => handleImageClick(item.id)}>
                    <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                    <p className="text-indigo-600 font-bold">
                      €{(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">€{parseFloat(item.price).toFixed(2)} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(item.id, item.quantity - 1);
                      }}
                      className="p-1 rounded-full bg-gray-100"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuantityChange(item.id, item.quantity + 1);
                      }}
                      className="p-1 rounded-full bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromCart(item.id);
                      }}
                      className="p-1 rounded-full bg-gray-100 ml-2"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order History */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Order History</h2>
          {orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No order history yet</p>
              
            </div>
          ) : (
            orders.map(order => (
              <div key={order.id} className="bg-white rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      {new Date(order.orderTime).toLocaleDateString()}
                    </span>
                    {getStatusIcon(order.status)}
                  </div>
                  <span className="text-indigo-600 font-bold">€{order.total}</span>
                </div>
                <div className="space-y-3 mt-3">
                  {order.dishes.map(item => (
                    <div key={`${order.id}-${item.id}`} className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                        <p className="text-sm text-gray-500">
                          {item.quantity} × €{parseFloat(item.price).toFixed(2)}
                        </p>
                      </div>
                      <span className="text-gray-700">
                        €{(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Checkout Bar */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-20 left-0 right-0 bg-white p-4 border-t">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Total</span>
              <span className="text-xl font-bold text-gray-900">€{cartTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => setShowDeliveryPopup(true)}
              disabled={isCheckingOut}
              className={`w-full ${isCheckingOut ? 'bg-indigo-600/70' : 'bg-indigo-600'} text-white py-3 rounded-lg font-medium flex items-center justify-center`}
            >
              {isCheckingOut ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Processing...
                </>
              ) : (
                'Checkout'
              )}
            </button>
          </div>
        </div>
      )}

      {/* Delivery Option Popup */}
      {showDeliveryPopup && !showOtpVerification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            {!deliveryOptionSelected ? (
              <>
                <h3 className="text-xl font-bold text-center mb-6">How would you like to receive your order?</h3>
                <div className="space-y-4">
                  <button
                    onClick={() => setDeliveryOptionSelected('tapAndCollect')}
                    className="w-full p-4 border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="font-bold mb-1">Tap & Collect</div>
                    <div className="text-gray-600 text-sm">Pick up your order from our restaurant</div>
                  </button>
                  <button
                    onClick={() => setDeliveryOptionSelected('delivery')}
                    className="w-full p-4 border border-gray-200 rounded-lg text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="font-bold mb-1">Delivery</div>
                    <div className="text-gray-600 text-sm">Get your order delivered to your address</div>
                  </button>
                </div>
                <button
                  onClick={() => setShowDeliveryPopup(false)}
                  className="mt-6 w-full py-2 text-gray-700 font-medium hover:text-gray-900 transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center mb-4">
                  <button
                    onClick={() => setDeliveryOptionSelected(null)}
                    className="p-1 rounded-full hover:bg-gray-100 mr-2"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h3 className="text-xl font-bold">
                    {deliveryOptionSelected === 'tapAndCollect' ? 'Tap & Collect' : 'Delivery Details'}
                  </h3>
                </div>
                {renderDeliveryForm()}
              </>
            )}
          </div>
        </div>
      )}

      {/* OTP Verification Popup */}
      {showOtpVerification && (
        <OtpVerification
          onVerify={handleCheckout}
          onCancel={() => setShowOtpVerification(false)}
          onEmailUpdate={(email) => setCustomerEmail(email)}
          initialEmail={customerEmail}
        />
      )}
    </div>
  );
};

export default CartPage;