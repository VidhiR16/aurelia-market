import React from 'react';
import { LifeBuoy, Phone, Mail } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function Support() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-gradient-to-br from-slate-50 via-white to-cyan-50 p-8 shadow-xl dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
        <div className="flex flex-col gap-6 rounded-[1.75rem] bg-white p-8 shadow-2xl dark:bg-dark-card">
          <div className="flex items-center gap-3 text-primary-600">
            <LifeBuoy className="h-6 w-6" />
            <h1 className="text-3xl font-bold">24x7 Customer Care</h1>
          </div>
          <p className="max-w-2xl text-gray-600 dark:text-gray-300">
            Our support team is available around the clock to help with orders, returns, payments, and account questions.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-center gap-3 text-primary-600">
                <Phone className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Call us</h2>
              </div>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">+91 1800 123 4567</p>
            </div>
            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-center gap-3 text-primary-600">
                <Mail className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Email support</h2>
              </div>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">help@aureliamarket.com</p>
            </div>
          </div>
          <Button size="lg">Open live chat</Button>
        </div>
      </div>
    </div>
  );
}
