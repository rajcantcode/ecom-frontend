import React, { useEffect } from "react";
import Navbar from "../features/Navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../features/auth/authSlice";
import { fetchItemsByUserIdAsync } from "../features/cart/cartSlice";
import { fetchLoggedInUserAsync } from "../features/user/userSlice";

const Home = () => {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id));
    }
  }, []);

  return (
    <Navbar>
      <ProductList></ProductList>
    </Navbar>
  );
};

export default Home;
