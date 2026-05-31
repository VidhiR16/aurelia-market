import React from 'react';
import { Gift } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export default function GiftCards() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-gradient-to-br from-slate-50 via-white to-purple-50 p-8 shadow-xl dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
        <div className="flex flex-col gap-6 rounded-[1.75rem] bg-white p-8 shadow-2xl dark:bg-dark-card">
          <div className="flex items-center gap-3 text-primary-600">
            <Gift className="h-6 w-6" />
            <h1 className="text-3xl font-bold">Gift Cards</h1>
          </div>
          <p className="max-w-2xl text-gray-600 dark:text-gray-300">
            Purchase instant digital gift cards for friends and family. Choose a value, add a personalized note, and send it directly with one click.
          </p>
          <div className="space-y-4 rounded-3xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
              <span>Gift card value</span>
              <strong>₹500</strong>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
              <span>Delivery</span>
              <strong>Instant email delivery</strong>
            </div>
          </div>
          <Link to="/cart">
            <Button size="lg">Shop gift cards</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
