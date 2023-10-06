import Protected from "./features/auth/components/Protected";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import Cart from "./features/cart/Cart";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import PageNotFound from "./pages/PageNotFound";
import ProductDetail from "./pages/ProductDetail";
import Register from "./pages/Register";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfile from "./features/user/components/userProfile";
import Logout from "./features/auth/components/Logout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminHome from "./pages/AdminHome";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import ProductForm from "./features/admin/components/ProductForm";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        ></Route>
        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <AdminHome />
            </ProtectedAdmin>
          }
        ></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/checkout"
          element={
            <Protected>
              <Checkout />
            </Protected>
          }
        ></Route>
        <Route path="/order-success/:id" element={<OrderSuccessPage />}></Route>
        <Route path="/orders" element={<UserOrdersPage />}></Route>
        <Route path="/profile" element={<UserProfile />}></Route>
        <Route path="/product-detail/:id" element={<ProductDetail />}></Route>
        <Route
          path="/admin/product-detail/:id"
          element={
            <ProtectedAdmin>
              <AdminProductDetailPage />
            </ProtectedAdmin>
          }
        ></Route>
        <Route
          path="/admin/product-form"
          element={
            <ProtectedAdmin>
              <AdminProductFormPage />
            </ProtectedAdmin>
          }
        ></Route>
        <Route
          path="/admin/orders"
          element={
            <ProtectedAdmin>
              <AdminOrdersPage />
            </ProtectedAdmin>
          }
        ></Route>
        <Route
          path="/admin/product-form/edit/:id"
          element={
            <ProtectedAdmin>
              <AdminProductFormPage></AdminProductFormPage>
            </ProtectedAdmin>
          }
        ></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/forgot-password" element={<ForgotPasswordPage />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
