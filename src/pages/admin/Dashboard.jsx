import React from 'react';
import { DollarSign, Users, ShoppingBag, TrendingUp, CreditCard } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { adminAnalytics } from '../../data/mockData';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold dark:text-white">Dashboard Overview</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back to your admin dashboard.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-white p-6 premium-shadow dark:bg-dark-card">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</h3>
            <DollarSign className="h-5 w-5 text-gray-400" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold dark:text-white">₹{adminAnalytics.totalRevenue.toLocaleString()}</span>
            <span className="ml-2 flex items-center text-sm font-medium text-green-600 dark:text-green-400">
              <TrendingUp className="mr-1 h-4 w-4" /> +12.5%
            </span>
          </div>
        </div>
        <div className="rounded-xl bg-white p-6 premium-shadow dark:bg-dark-card">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders</h3>
            <ShoppingBag className="h-5 w-5 text-gray-400" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold dark:text-white">{adminAnalytics.totalOrders.toLocaleString()}</span>
            <span className="ml-2 flex items-center text-sm font-medium text-green-600 dark:text-green-400">
              <TrendingUp className="mr-1 h-4 w-4" /> +8.2%
            </span>
          </div>
        </div>
        <div className="rounded-xl bg-white p-6 premium-shadow dark:bg-dark-card">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Customers</h3>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold dark:text-white">{adminAnalytics.totalCustomers.toLocaleString()}</span>
            <span className="ml-2 flex items-center text-sm font-medium text-green-600 dark:text-green-400">
              <TrendingUp className="mr-1 h-4 w-4" /> +5.1%
            </span>
          </div>
        </div>
        <div className="rounded-xl bg-white p-6 premium-shadow dark:bg-dark-card">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Order Value</h3>
            <CreditCard className="h-5 w-5 text-gray-400" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold dark:text-white">₹{(adminAnalytics.totalRevenue / adminAnalytics.totalOrders).toFixed(2)}</span>
            <span className="ml-2 flex items-center text-sm font-medium text-green-600 dark:text-green-400">
              <TrendingUp className="mr-1 h-4 w-4" /> +2.3%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Chart */}
        <div className="rounded-xl bg-white p-6 premium-shadow dark:bg-dark-card">
          <h3 className="mb-6 text-lg font-bold dark:text-white">Sales Overview</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={adminAnalytics.salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f9fafb' }}
                  itemStyle={{ color: '#14b8a6' }}
                />
                <Line type="monotone" dataKey="sales" stroke="#14b8a6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="rounded-xl bg-white p-6 premium-shadow dark:bg-dark-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold dark:text-white">Recent Orders</h3>
            <button className="text-sm font-medium text-primary-600 hover:text-primary-500">View All</button>
          </div>
          <div className="space-y-4">
            {adminAnalytics.recentOrders.map(order => (
              <div key={order.id} className="flex items-center justify-between rounded-lg border border-gray-100 p-4 dark:border-gray-800">
                <div>
                  <p className="font-semibold dark:text-white">{order.id}</p>
                  <p className="text-sm text-gray-500">{order.customer} &bull; {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold dark:text-white">₹{order.total.toFixed(2)}</p>
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium mt-1
                    ${order.status === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                      order.status === 'Processing' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' : 
                      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
