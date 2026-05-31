import React from 'react';

export default function CustomerManager() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold dark:text-white">Customers</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Manage customer accounts.</p>
      </div>
      <div className="rounded-xl bg-white p-12 text-center premium-shadow dark:bg-dark-card">
        <h3 className="text-lg font-medium dark:text-white">Customer Data Integration Pending</h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          The customer management module is currently being connected to the CRM database. Check back later.
        </p>
      </div>
    </div>
  );
}
