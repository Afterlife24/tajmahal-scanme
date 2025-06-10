// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Clock, Star, Search, Home, ShoppingBag, User } from 'lucide-react';
// import { loadMenuData } from '../pictures';
// import Navbar from '../components/Navbar';

// const MenuPage = () => {
//   const [menuItems, setMenuItems] = useState([]);
//   const [categories, setCategories] = useState(['All']);
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const data = await loadMenuData();
        
//         if (data && data.length > 0) {
//           setMenuItems(data);
          
//           // Extract unique categories from menu items
//           const uniqueCategories = ['All', ...new Set(data.map(item => item.category))];
//           setCategories(uniqueCategories);
//         } else {
//           setError('No menu items found');
//         }
//       } catch (err) {
//         console.error('Failed to load menu:', err);
//         setError('Failed to load menu data');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchData();
//   }, []);

//   const filteredItems = menuItems.filter(item => {
//     const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
//     const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#E8F3F1] flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2A9D8F] mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading menu...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-[#E8F3F1] flex items-center justify-center">
//         <div className="text-center p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
//           <h3 className="text-lg font-medium text-red-500">Error loading menu</h3>
//           <p className="mt-2 text-gray-600">{error}</p>
//           <button 
//             onClick={() => window.location.reload()}
//             className="mt-4 px-4 py-2 bg-[#2A9D8F] text-white rounded-md hover:bg-[#22867a]"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#E8F3F1] pb-20">
//       <Navbar />

//       <div className="sticky top-16 z-40 bg-[#E8F3F1] p-4 shadow-sm">
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <input
//             type="text"
//             placeholder="Search menu items..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] shadow-sm"
//           />
//         </div>
//       </div>
      
//       <div className="p-4">
//         <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => setSelectedCategory(category)}
//               className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
//                 selectedCategory === category
//                   ? 'bg-[#2A9D8F] text-white'
//                   : 'bg-white text-gray-600 hover:bg-gray-100'
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>

//         {filteredItems.length === 0 ? (
//           <div className="text-center py-10">
//             <p className="text-gray-500">No items found matching your criteria</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
//             {filteredItems.map((item) => (
//               <Link
//                 to={`/item/${item.id}`}
//                 key={item.id}
//                 className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
//               >
//                 <div className="relative pb-[75%]">
//                   {item.image ? (
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="absolute inset-0 w-full h-full object-cover"
//                       onError={(e) => {
//                         e.currentTarget.src = 'https://via.placeholder.com/150';
//                       }}
//                     />
//                   ) : (
//                     <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
//                       <span className="text-gray-400">No image</span>
//                     </div>
//                   )}
//                 </div>
//                 <div className="p-3">
//                   <h3 className="font-medium text-gray-800 truncate">{item.name}</h3>
//                   <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
//                     <Clock className="w-4 h-4" />
//                     <span>20 min</span>
//                     <Star className="w-4 h-4 ml-2" />
//                     <span>4.8</span>
//                   </div>
//                   <p className="text-[#2A9D8F] font-bold mt-2">
//                     ${item.price.toFixed(2)}
//                   </p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>

      
//     </div>
//   );
// };

// export default MenuPage;










import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, Search, Home, ShoppingBag, User, Calendar, Users, Phone, Mail } from 'lucide-react';
import { loadMenuData } from '../pictures';
import Navbar from '../components/Navbar';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [reservationLoading, setReservationLoading] = useState(false);
  const [reservationError, setReservationError] = useState(null);
  const [reservationForm, setReservationForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    specialRequests: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await loadMenuData();
        
        if (data && data.length > 0) {
          setMenuItems(data);
          
          // Extract unique categories from menu items
          const uniqueCategories = ['All', ...new Set(data.map(item => item.category))];
          setCategories(uniqueCategories);
        } else {
          setError('No menu items found');
        }
      } catch (err) {
        console.error('Failed to load menu:', err);
        setError('Failed to load menu data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleReservationChange = (e) => {
    const { name, value } = e.target;
    setReservationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submitReservation = async (reservationData) => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('https://tajmahal-server.gofastapi.com/createReservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit reservation');
      }

      return await response.json();
    } catch (error) {
      console.error('Reservation error:', error);
      throw error;
    }
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    try {
      setReservationLoading(true);
      setReservationError(null);
      
      // Validate form data
      if (!reservationForm.name || !reservationForm.email || !reservationForm.phone || !reservationForm.date || !reservationForm.time) {
        throw new Error('Please fill in all required fields');
      }

      // Format the data before sending
      const formattedData = {
        ...reservationForm,
        date: new Date(reservationForm.date).toISOString(),
        guests: parseInt(reservationForm.guests, 10)
      };

      await submitReservation(formattedData);
      
      // On success
      setReservationSuccess(true);
      setShowReservationForm(false);
      setReservationForm({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: 2,
        specialRequests: ''
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => setReservationSuccess(false), 5000);
    } catch (error) {
      console.error('Reservation failed:', error);
      setReservationError(error.message || 'Failed to submit reservation. Please try again.');
    } finally {
      setReservationLoading(false);
    }
  };

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading menu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-xl shadow-lg max-w-md mx-auto border border-gray-200">
          <h3 className="text-lg font-medium text-red-600">Error loading menu</h3>
          <p className="mt-2 text-gray-700">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-20">
      <Navbar />

      {/* Reservation Success Message */}
      {reservationSuccess && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded-lg shadow-lg flex items-center">
            <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Reservation successful! We'll contact you shortly.</span>
          </div>
        </div>
      )}

      {/* Reservation Form */}
      {showReservationForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => !reservationLoading && setShowReservationForm(false)}
          ></div>
          
          {/* Form Container */}
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* This element is to trick the browser into centering the modal contents */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            {/* Actual Form - Wider version */}
            <div className="inline-block align-bottom bg-white rounded-t-2xl rounded-b-lg shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl w-full overflow-hidden">
              {/* Header */}
              <div className="bg-white sticky top-0 z-10 px-6 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl leading-6 font-medium text-gray-900">Make a Reservation</h3>
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => !reservationLoading && setShowReservationForm(false)}
                    disabled={reservationLoading}
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Form Content */}
              <div className="px-6 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-auto max-h-[60vh]">
                {reservationError && (
                  <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{reservationError}</p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleReservationSubmit}>
                  <div className="space-y-5">
                    {/* First Row - Name and Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Name Field */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={reservationForm.name}
                            onChange={handleReservationChange}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border"
                            placeholder="John Doe"
                            required
                            disabled={reservationLoading}
                          />
                        </div>
                      </div>
                      
                      {/* Email Field */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            value={reservationForm.email}
                            onChange={handleReservationChange}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border"
                            placeholder="john@example.com"
                            required
                            disabled={reservationLoading}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Second Row - Phone and Guests */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Phone Field */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            id="phone"
                            value={reservationForm.phone}
                            onChange={handleReservationChange}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border"
                            placeholder="+1 (555) 123-4567"
                            required
                            disabled={reservationLoading}
                          />
                        </div>
                      </div>
                      
                      {/* Guests Field */}
                      <div>
                        <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">Number of Guests *</label>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Users className="h-5 w-5 text-gray-400" />
                          </div>
                          <select
                            name="guests"
                            id="guests"
                            value={reservationForm.guests}
                            onChange={handleReservationChange}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border appearance-none bg-white"
                            disabled={reservationLoading}
                            required
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                              <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    {/* Third Row - Date and Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Date Field */}
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="date"
                            name="date"
                            id="date"
                            value={reservationForm.date}
                            onChange={handleReservationChange}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border"
                            required
                            min={new Date().toISOString().split('T')[0]}
                            disabled={reservationLoading}
                          />
                        </div>
                      </div>
                      
                      {/* Time Field */}
                      <div>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Clock className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="time"
                            name="time"
                            id="time"
                            value={reservationForm.time}
                            onChange={handleReservationChange}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border"
                            required
                            disabled={reservationLoading}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Special Requests - Full Width */}
                    <div>
                      <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">Special Requests (optional)</label>
                      <textarea
                        name="specialRequests"
                        id="specialRequests"
                        rows={3}
                        value={reservationForm.specialRequests}
                        onChange={handleReservationChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-3"
                        placeholder="Any special requirements or notes..."
                        disabled={reservationLoading}
                      />
                    </div>
                  </div>
                  
                  {/* Form Footer */}
                  <div className="mt-8">
                    <button
                      type="submit"
                      disabled={reservationLoading}
                      className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                        reservationLoading ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {reservationLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        'Confirm Reservation'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Reservation Button */}
      <div className="sticky top-16 z-30 bg-white/80 backdrop-blur-sm p-4 shadow-sm border-b border-gray-200">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            />
          </div>
          
          <button
            onClick={() => setShowReservationForm(true)}
            className="px-4 py-3 rounded-lg flex items-center justify-center gap-2 bg-gradient-to-br from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 shadow-md hover:shadow-lg transition-all font-medium text-sm whitespace-nowrap"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            Reserve Table
          </button>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex overflow-x-auto gap-3 pb-4 no-scrollbar px-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              } font-medium text-sm`}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-700">No items found</h3>
            <p className="text-gray-500 mt-2">Try changing your search or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
            {filteredItems.map((item) => (
              <Link
                to={`/item/${item.id}`}
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-100"
              >
                <div className="relative pb-[75%]">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/150';
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 text-lg truncate">{item.name}</h3>
                  
                  <p className="text-indigo-600 font-bold mt-3 text-lg">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;