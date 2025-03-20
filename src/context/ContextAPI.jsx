import { createContext, useContext, useState } from "react";

const ContextAPI = createContext();

// eslint-disable-next-line react/prop-types
export const OrderProvider = ({ children }) => {
    const [orderList, setOrderList] = useState([]);

    const addToOrder = (dish) => {
        setOrderList([...orderList, dish]);
    };
    const removeFromOrder = (id) => {
        setOrderList(orderList.filter(item => item.id !== id));
    };
    const updateQuantity = (id, quantity) => {
        const updatedOrder = orderList.map(item =>
            item.id === id ? { ...item, quantity: parseInt(quantity) } : item
        );
        setOrderList(updatedOrder);
    };

    return (
        <ContextAPI.Provider value={{ orderList, addToOrder, removeFromOrder, updateQuantity }}>
            {children}
        </ContextAPI.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useOrder = () => {
    return useContext(ContextAPI);
};