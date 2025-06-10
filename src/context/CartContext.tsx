// import React, { createContext, useContext, useState, useEffect } from 'react';

// interface CartItem {
//   id: number;
//   name: string;
//   price: string;
//   quantity: number;
//   image: string;
// }

// interface CartContextType {
//   cartItems: CartItem[];
//   addToCart: (item: CartItem) => void;
//   removeFromCart: (id: number) => void;
//   updateCartItem: (id: number, quantity: number) => void;
//   clearCart: () => void;
//   totalItems: number;
//   cartTotal: number;
// }

// const CartContext = createContext<CartContextType>({
//   cartItems: [],
//   addToCart: () => {},
//   removeFromCart: () => {},
//   updateCartItem: () => {},
//   clearCart: () => {},
//   totalItems: 0,
//   cartTotal: 0,
// });

// export const useCart = () => useContext(CartContext);

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [totalItems, setTotalItems] = useState(0);
//   const [cartTotal, setCartTotal] = useState(0);
//   const [isInitialized, setIsInitialized] = useState(false);

//   // Initialize cart from localStorage with session check
//   useEffect(() => {
//     if (typeof window !== 'undefined' && !isInitialized) {
//       // Check if this is a new session (no sessionStorage flag)
//       const sessionCartFlag = sessionStorage.getItem('cartInitialized');
      
//       if (!sessionCartFlag) {
//         // New session - clear any existing cart
//         localStorage.removeItem('cart');
//         sessionStorage.setItem('cartInitialized', 'true');
//       } else {
//         // Existing session - load from localStorage
//         const savedCart = localStorage.getItem('cart');
//         if (savedCart) {
//           setCartItems(JSON.parse(savedCart));
//         }
//       }
      
//       setIsInitialized(true);
//     }
//   }, [isInitialized]);

//   // Calculate totals whenever cartItems change
//   useEffect(() => {
//     if (!isInitialized) return;
    
//     const newTotalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
//     const newCartTotal = cartItems.reduce(
//       (sum, item) => sum + parseFloat(item.price) * item.quantity,
//       0
//     );
//     setTotalItems(newTotalItems);
//     setCartTotal(newCartTotal);

//     // Save to localStorage
//     if (typeof window !== 'undefined') {
//       localStorage.setItem('cart', JSON.stringify(cartItems));
//     }
//   }, [cartItems, isInitialized]);

//   const addToCart = (item: CartItem) => {
//     setCartItems((prev) => {
//       const existingItem = prev.find((i) => i.id === item.id);
//       if (existingItem) {
//         return prev.map((i) =>
//           i.id === item.id 
//             ? { ...i, quantity: i.quantity + item.quantity } 
//             : i
//         );
//       }
//       return [...prev, item];
//     });
//   };

//   const removeFromCart = (id: number) => {
//     setCartItems((prev) => prev.filter((item) => item.id !== id));
//   };

//   const updateCartItem = (id: number, quantity: number) => {
//     if (quantity <= 0) {
//       removeFromCart(id);
//       return;
//     }
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, quantity } : item
//       )
//     );
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         updateCartItem,
//         clearCart,
//         totalItems,
//         cartTotal,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };



// cartcontext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  dishes: CartItem[];
  total: string;
  orderTime: string;
  status: 'completed' | 'preparing' | 'delivered';
}

interface CartContextType {
  cartItems: CartItem[];
  orders: Order[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateCartItem: (id: number, quantity: number) => void;
  clearCart: () => void;
  addOrder: (order: Omit<Order, 'id' | 'status'>) => void;
  totalItems: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  orders: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItem: () => {},
  clearCart: () => {},
  addOrder: () => {},
  totalItems: 0,
  cartTotal: 0,
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize cart and orders from sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && !isInitialized) {
      const savedCart = sessionStorage.getItem('cart');
      const savedOrders = sessionStorage.getItem('orders');
      
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
      
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
      
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Calculate totals whenever cartItems change
  useEffect(() => {
    if (!isInitialized) return;
    
    const newTotalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const newCartTotal = cartItems.reduce(
      (sum, item) => sum + parseFloat(item.price) * item.quantity,
      0
    );
    setTotalItems(newTotalItems);
    setCartTotal(newCartTotal);

    // Save to sessionStorage
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized]);

  // Save orders to sessionStorage when they change
  useEffect(() => {
    if (!isInitialized) return;
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('orders', JSON.stringify(orders));
    }
  }, [orders, isInitialized]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id 
            ? { ...i, quantity: i.quantity + item.quantity } 
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateCartItem = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addOrder = (order: Omit<Order, 'id' | 'status'>) => {
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
      status: 'completed',
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        orders,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        addOrder,
        totalItems,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};