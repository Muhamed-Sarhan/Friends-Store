import React, { useState, createContext, useEffect } from "react";
import { popularProducts } from "./data";
import { auth } from "./firebase/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export const MainContext = createContext();

export const ContextState = ({ children }) => {
  const [products, setProducts] = useState(popularProducts);

  const [cart, setCart] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [total, setTotal] = useState(0);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const addCart = (id) => {
    const check = cart.every((item) => {
      return item.id !== id;
    });
    if (check) {
      const data = products.filter((product) => {
        return product.id === id;
      });
      setCart([...cart, ...data]);
      toast.success("This Item Added successfully to your cart", {
        autoClose: 3000,
      });
    } else {
      toast.error("This Item has Already added to your cart", {
        autoClose: 3000,
      });
    }
  };
  const addWishlist = (id) => {
    const checkWishList = wishList.every((item) => {
      return item.id !== id;
    });
    if (checkWishList) {
      const data = products.filter((product) => {
        return product.id === id;
      });
      setWishList([...wishList, ...data]);
      toast.success("This Item Added successfully to your wishlist", {
        autoClose: 3000,
      });
    } else {
      toast.error("This Item has Already added to your wishlist", {
        autoClose: 3000,
      });
    }
  };
  const decrease = (id) => {
    cart.forEach((item) => {
      if (item.id === id) {
        item.count === 1 ? (item.count = 1) : (item.count -= 1);
      }
    });
    setCart([...cart]);
    getTotal();
  };

  const increase = (id) => {
    cart.forEach((item) => {
      if (item.id === id) {
        item.count += 1;
      }
    });
    setCart([...cart]);
    getTotal();
  };

  const remove = (id) => {
    cart.forEach((item, index) => {
      if (item.id === id) {
        cart.splice(index, 1);
        item.count = 1;
      }
    });
    setCart([...cart]);
    getTotal();
    toast.success("This Item Removed successfully from your cart", {
      autoClose: 3000,
    });
  };

  const removeFromWishList = (id) => {
    wishList.forEach((item, index) => {
      if (item.id === id) {
        wishList.splice(index, 1);
      }
    });
    setWishList([...wishList]);
  };

  const getTotal = () => {
    const res = cart.reduce((prev, item) => {
      return prev + item.productPrice * item.count;
    }, 0);
    setTotal(res);
  };

  const register = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };
  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };
  const signOut = () => {
    return auth.signOut();
  };
  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };
  const updateEmail = (email) => {
    return user.updateEmail(email);
  };
  const updatePassword = (password) => {
    return user.updatePassword(password);
  };

  useEffect(() => {
    const dataCart = JSON.parse(localStorage.getItem("dataCart"));
    if (dataCart) setCart(dataCart);
  }, []);
  useEffect(() => {
    localStorage.setItem("dataCart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const dataWishList = JSON.parse(localStorage.getItem("dataWishList"));
    if (dataWishList) setWishList(dataWishList);
  }, []);
  useEffect(() => {
    localStorage.setItem("dataWishList", JSON.stringify(wishList));
  }, [wishList]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    unsubscribe();
  }, []);

  if (loading) return <span className="loader"></span>;

  const value = {
    products: [products, setProducts],
    cart: [cart, setCart],
    total: [total, setTotal],
    user: [user, setUser],
    loading: [loading, setLoading],
    wishList: [wishList, setWishList],
    addCart: addCart,
    increase: increase,
    decrease: decrease,
    remove: remove,
    getTotal: getTotal,
    register: register,
    login: login,
    signOut: signOut,
    resetPassword: resetPassword,
    updateEmail: updateEmail,
    updatePassword: updatePassword,
    addWishlist: addWishlist,
    removeFromWishList: removeFromWishList,
  };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};
