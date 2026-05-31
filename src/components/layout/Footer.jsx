import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-dark-bg">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white font-bold">
                E
              </div>
              <span className="text-xl font-bold tracking-tight">Commerce</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your one-stop destination for all your shopping needs. Premium quality, guaranteed.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><Link to="/products?category=electronics" className="hover:text-primary-600">Electronics</Link></li>
              <li><Link to="/products?category=clothing" className="hover:text-primary-600">Clothing</Link></li>
              <li><Link to="/products?category=shoes" className="hover:text-primary-600">Shoes</Link></li>
              <li><Link to="/products?category=beauty" className="hover:text-primary-600">Beauty</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><Link to="/contact" className="hover:text-primary-600">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-primary-600">FAQs</Link></li>
              <li><Link to="/shipping" className="hover:text-primary-600">Shipping Returns</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Subscribe to get special offers and updates.
            </p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-dark-card focus:outline-none focus:ring-1 focus:ring-primary-500" />
              <button className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; 2026 E-Commerce Inc. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/admin" className="hover:text-primary-600">Admin Dashboard</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
