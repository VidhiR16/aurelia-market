import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-32 sm:px-6 lg:px-8">
        <div className="mb-6 rounded-full bg-gray-100 p-6 dark:bg-gray-800">
          <ShoppingBag className="h-12 w-12 text-gray-400" />
        </div>
        <h2 className="mb-2 text-2xl font-bold dark:text-white">Your cart is empty</h2>
        <p className="mb-8 text-gray-500 dark:text-gray-400">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products">
          <Button size="lg">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold dark:text-white">Shopping Cart</h1>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="space-y-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex gap-6 rounded-2xl bg-white p-4 premium-shadow dark:bg-dark-card sm:p-6">
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 sm:h-32 sm:w-32">
                  <img src={item.images[0]} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold dark:text-white sm:text-lg">{item.name}</h3>
                      <p className="mt-1 text-sm text-gray-500 capitalize">{item.category}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center rounded-md border border-gray-300 bg-white dark:border-gray-700 dark:bg-dark-bg">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="font-bold dark:text-white sm:text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-24 rounded-2xl bg-white p-6 premium-shadow dark:bg-dark-card">
            <h2 className="mb-6 text-lg font-bold dark:text-white">Order Summary</h2>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900 dark:text-white">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium text-gray-900 dark:text-white">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (Estimated)</span>
                <span className="font-medium text-gray-900 dark:text-white">${(cartTotal * 0.08).toFixed(2)}</span>
              </div>
              <div className="my-4 border-t border-gray-200 dark:border-gray-800"></div>
              <div className="flex justify-between text-base font-bold text-gray-900 dark:text-white">
                <span>Total</span>
                <span>${(cartTotal * 1.08).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mt-6 flex gap-2">
              <input type="text" placeholder="Coupon Code" className="w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm dark:border-gray-700 dark:text-white focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
              <Button variant="outline">Apply</Button>
            </div>

            <Button size="lg" className="mt-6 w-full" onClick={() => navigate('/checkout')}>
              Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
