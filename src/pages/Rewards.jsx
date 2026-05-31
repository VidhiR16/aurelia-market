import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function Rewards() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-gradient-to-br from-pink-50 via-white to-slate-50 p-8 shadow-xl dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
        <div className="flex flex-col gap-6 rounded-[1.75rem] bg-white p-8 shadow-2xl dark:bg-dark-card">
          <div className="flex items-center gap-3 text-primary-600">
            <Sparkles className="h-6 w-6" />
            <h1 className="text-3xl font-bold">Aurelia Plus Zone</h1>
          </div>
          <p className="max-w-2xl text-gray-600 dark:text-gray-300">
            Enjoy premium member rewards, early access to launches, extra discounts, and curated shopping experiences designed for our most loyal customers.
          </p>
          <ul className="grid gap-3 text-sm text-gray-700 dark:text-gray-300 sm:grid-cols-2">
            <li className="rounded-3xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">Priority support and faster delivery offers</li>
            <li className="rounded-3xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">Exclusive deals on top brands</li>
            <li className="rounded-3xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">Bonus gift cards on milestone purchases</li>
            <li className="rounded-3xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">Early access to seasonal collections</li>
          </ul>
          <Link to="/profile">
            <Button size="lg">View your membership</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
