import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { CartProvider } from './context/CartContext'

// Layouts
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'

// Pages
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Wishlist from './pages/Wishlist'
import OrderSuccess from './pages/OrderSuccess'
import Rewards from './pages/Rewards'
import GiftCards from './pages/GiftCards'
import Support from './pages/Support'
import Logout from './pages/logout'

// Admin Pages
import Dashboard from './pages/admin/Dashboard'
import ProductManager from './pages/admin/ProductManager'
import OrderManager from './pages/admin/OrderManager'
import CustomerManager from './pages/admin/CustomerManager'

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Routes>

          {/* Customer Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<ProductList />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
            <Route path="signup" element={<Signup />} />
            <Route path="profile" element={<Profile />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="rewards" element={<Rewards />} />
            <Route path="gift-cards" element={<GiftCards />} />
            <Route path="support" element={<Support />} />
            <Route path="order-success" element={<OrderSuccess />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductManager />} />
            <Route path="orders" element={<OrderManager />} />
            <Route path="customers" element={<CustomerManager />} />
          </Route>

        </Routes>
      </CartProvider>
    </ThemeProvider>
  )
}

export default App