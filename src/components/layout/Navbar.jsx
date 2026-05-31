import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Search,
  Menu,
  User,
  Heart,
  LogOut,
  ChevronDown,
  Package,
  Gift,
  Bell,
  LifeBuoy,
  Star,
  Sparkles,
  Briefcase
} from 'lucide-react';

import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

import { Button } from '../ui/Button';

export default function Navbar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const { user, logout } = useAuth();

  const toggleAccountMenu = () => setAccountMenuOpen((prev) => !prev);
  const closeAccountMenu = () => setAccountMenuOpen(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      navigate(`/products?search=${encodeURIComponent(trimmedQuery)}`);
      return;
    }
    navigate('/products');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-dark-bg/80">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 text-gray-600 dark:text-gray-300">
            <Menu className="h-6 w-6" />
          </button>

          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white font-bold">
              AM
            </div>

            <span className="hidden text-xl font-bold tracking-tight sm:inline-block">
              Aurelia Market
            </span>
          </Link>
        </div>

        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="hidden flex-1 items-center justify-center px-8 md:flex">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-500 dark:text-gray-400" />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="h-10 w-full rounded-full border border-gray-300 bg-gray-50 pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-dark-card dark:text-gray-100"
            />
          </div>
        </form>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* Wishlist */}
          <Link to="/wishlist">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-gray-600 dark:text-gray-300"
            >
              <Heart className="h-5 w-5" />

              {wishlistCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Button>
          </Link>

          {/* User Account */}
          {user ? (
            <div className="relative hidden sm:flex items-center gap-3">
              <button
                type="button"
                onClick={toggleAccountMenu}
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              >
                <User className="h-4 w-4" />
                <span>{user.name || user.email}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${accountMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {accountMenuOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl shadow-slate-900/5 dark:border-gray-800 dark:bg-dark-card">
                  <div className="border-b border-gray-200 px-4 py-3 dark:border-gray-800">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Welcome back</p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Manage your account, orders, rewards and support.</p>
                  </div>

                  <div className="space-y-1 px-2 py-2">
                    <Link to="/profile" onClick={closeAccountMenu} className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-gray-700 transition hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800">
                      <User className="h-4 w-4 text-primary-600" />
                      <div>
                        <p className="font-medium">My Profile</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Account details and saved information</p>
                      </div>
                    </Link>
                    <Link to="/profile?tab=orders" onClick={closeAccountMenu} className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-gray-700 transition hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800">
                      <Package className="h-4 w-4 text-primary-600" />
                      <div>
                        <p className="font-medium">Orders</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Track your purchases</p>
                      </div>
                    </Link>
                    <Link to="/wishlist" onClick={closeAccountMenu} className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-gray-700 transition hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800">
                      <Heart className="h-4 w-4 text-primary-600" />
                      <div>
                        <p className="font-medium">Wishlist</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Your saved favorites</p>
                      </div>
                    </Link>
                    <Link to="/signup?ref=seller" onClick={closeAccountMenu} className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-gray-700 transition hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800">
                      <Briefcase className="h-4 w-4 text-primary-600" />
                      <div>
                        <p className="font-medium">Become a Seller</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Start selling on Aurelia Market</p>
                      </div>
                    </Link>
                    <Link to="/rewards" onClick={closeAccountMenu} className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-gray-700 transition hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800">
                      <Sparkles className="h-4 w-4 text-primary-600" />
                      <div>
                        <p className="font-medium">Aurelia Plus Zone</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Exclusive member perks</p>
                      </div>
                    </Link>
                    <Link to="/gift-cards" onClick={closeAccountMenu} className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-gray-700 transition hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800">
                      <Gift className="h-4 w-4 text-primary-600" />
                      <div>
                        <p className="font-medium">Gift Cards</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Buy and send instant gifts</p>
                      </div>
                    </Link>
                    <Link to="/profile?tab=settings" onClick={closeAccountMenu} className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-gray-700 transition hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800">
                      <Bell className="h-4 w-4 text-primary-600" />
                      <div>
                        <p className="font-medium">Notification Preferences</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Customize alerts and updates</p>
                      </div>
                    </Link>
                    <Link to="/support" onClick={closeAccountMenu} className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-gray-700 transition hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800">
                      <LifeBuoy className="h-4 w-4 text-primary-600" />
                      <div>
                        <p className="font-medium">24x7 Customer Care</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Help with orders and support</p>
                      </div>
                    </Link>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-3 dark:border-gray-800">
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        closeAccountMenu();
                      }}
                      className="flex w-full items-center justify-center rounded-2xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex text-gray-600 dark:text-gray-300"
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}

          {/* Cart */}
          <Link to="/cart">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-gray-600 dark:text-gray-300"
            >
              <ShoppingCart className="h-5 w-5" />

              {cartCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}

            </Button>
          </Link>

        </div>

      </div>

    </nav>
  );
}