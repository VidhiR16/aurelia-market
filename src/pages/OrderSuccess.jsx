import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function OrderSuccess() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
        <CheckCircle2 className="h-12 w-12" />
      </div>
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight dark:text-white">
        Order Confirmed!
      </h1>
      <p className="mb-8 text-lg text-gray-500 dark:text-gray-400">
        Thank you for your purchase. Your order #ORD-{Math.floor(Math.random() * 100000)} has been placed successfully.
        We'll send you an email with the tracking information once your items ship.
      </p>
      
      <div className="mb-12 w-full max-w-md rounded-2xl bg-white p-6 premium-shadow dark:bg-dark-card text-left flex items-start gap-4">
        <div className="mt-1 rounded-full bg-primary-100 p-2 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
          <Package className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-semibold dark:text-white">Estimated Delivery</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Oct 28 - Oct 31, 2026</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link to="/products">
          <Button size="lg" className="w-full sm:w-auto">
            Continue Shopping <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Link to="/profile">
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            View Order History
          </Button>
        </Link>
      </div>
    </div>
  );
}
