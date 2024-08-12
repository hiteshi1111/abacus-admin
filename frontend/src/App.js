import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createContext, useEffect, useState, lazy } from 'react';
import './App.css';

// import Dashboard from './pages/customer/dashboard';
// import Referral from './pages/customer/referral';
// import Products from './pages/customer/products';
// import Personal from './pages/settings/personal';
// import Security from './pages/settings/security';
// import CustomerRoute from './components/shared/customerRoute';
import AdminRoute from './components/shared/adminRoute';
import AdminDashboard from './pages/admin/dashboard';
import Register from './pages/register';

import Home from "./pages/home";
import Customers from './pages/admin/customers';
import AdminProducts from './pages/admin/products';
import Taxes from './pages/admin/taxes';
import Blogs from './pages/admin/blogs';
import AdminSettings from './pages/admin/settings';
import Settings from './pages/customer/settings';
import Dashboard from './pages/customer/dashboard';
import CustomerRoute from './components/shared/customerRoute';
import Referral from './pages/customer/referral';
import Products from './pages/customer/products';
import Payment from './pages/admin/payment';
import Contacts from './pages/admin/contacts';

const NotFound = lazy(() => import("./pages/404"));

export const AccountContext = createContext({
  role: "",
  login: false,
  setLogin: () => {},
  userData: null,
  setUserData: () => {},
  modalOpen: false,
  setModalOpen: () => {}
});

function App() {
  const [login, setLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const cookieData = sessionStorage.getItem("xios") || "";
  const role = cookieData ? JSON.parse(cookieData)?.role : "";

  const data = {
    login,
    setLogin,
    userData,
    setUserData,
    modalOpen,
    setModalOpen,
    role
  }

  useEffect(() => {
    if (cookieData) {
      setLogin(true);
      setUserData(JSON.parse(cookieData));
    } else {
      setLogin(false);
      setUserData(null);
    }
  }, [cookieData])

  return (
    <AccountContext.Provider value={data}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/register" element={<Register />} />
          {/* <Route path="/settings/profile" element={<Personal />} />
          <Route path="/settings/security" element={<Security />} />  */}

          {/* admin routes */}
          <Route path="" element={<AdminRoute />}>
            <Route path="/admin/customers" element={<Customers />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/taxes" element={<Taxes />} />
            <Route path="/admin/blogs" element={<Blogs />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/payment"  element={<Payment/>} />
            <Route path="/admin/contacts"  element={<Contacts/>} />
          </Route>

          {/* customer routes */}
          <Route path="" element={<CustomerRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/referral" element={<Referral />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/products" element={<Products />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AccountContext.Provider>
  );
}

export default App;