import { createContext, useContext, useEffect, useState } from "react";

const ContextAPI = createContext();

// eslint-disable-next-line react/prop-types
export const OrderProvider = ({ children }) => {

    // danh sách các sản phẩm

    useEffect(() => {
        fetch("https://apishoes-gtje.onrender.com/products")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Dữ liệu API products:", data);
                localStorage.setItem("productsData", JSON.stringify(data));
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
    }, []);
    // Danh sach tai khoan
    useEffect(() => {
        fetch("https://apishoes-gtje.onrender.com/accounts")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Dữ liệu API account:", data);
                localStorage.setItem("accounts", JSON.stringify(data));
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
    }, []);
    // Danh sach blogs
    useEffect(() => {
        fetch("https://apishoes-gtje.onrender.com/blogs")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Dữ liệu API blog:", data);
                localStorage.setItem("blogs", JSON.stringify(data));
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
    }, []);
    // Quản lý sản phẩm
    const [orderList, setOrderList] = useState([]);

    const addToOrder = (dish) => {
        const existingItemIndex = orderList.findIndex(item =>
            item.id === dish.id && item.size === dish.size
        );

        if (existingItemIndex !== -1) {
            const updatedOrderList = [...orderList];
            updatedOrderList[existingItemIndex].quantity += dish.quantity;

            setOrderList(updatedOrderList);
        } else {
            setOrderList([...orderList, dish]);
        }
    };

    const removeFromOrder = (id, size) => {
        setOrderList(orderList.filter(item => !(item.id === id && item.size === size)));
    };

    const updateQuantity = (id, quantity) => {
        const updatedOrder = orderList.map(item =>
            item.id === id ? { ...item, quantity: parseInt(quantity) } : item
        );
        setOrderList(updatedOrder);
    };
    // Quản lý account
    const [user, setUser] = useState(null);

    const login = (userData) => {
        updateUser(userData);
    };

    const logout = () => {
        updateUser(null);
    };

    const register = (newUser) => {
        updateUser(newUser);
    };
    const updateUser = (updatedInfo) => {
        console.log("Cập nhật user với:", updatedInfo);
        setUser(prev => ({
            ...prev,
            ...updatedInfo
        }));
    };
    return (
        <ContextAPI.Provider value={{ user, updateUser, login, logout, register, orderList, setOrderList, addToOrder, removeFromOrder, updateQuantity }}>
            {children}
        </ContextAPI.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useOrder = () => {
    return useContext(ContextAPI);
};