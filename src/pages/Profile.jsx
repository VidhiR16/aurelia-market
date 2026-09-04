import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { User, Package, MapPin, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export default function Profile() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile');
  const { logout } = useAuth();

  useEffect(() => {
    setActiveTab(searchParams.get('tab') || 'profile');
  }, [searchParams]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold dark:text-white">My Account</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 shrink-0">
          <div className="space-y-1 rounded-xl bg-white p-2 premium-shadow dark:bg-dark-card">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium ${activeTab === 'profile' ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'}`}
            >
              <User className="h-5 w-5" /> Profile Info
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium ${activeTab === 'orders' ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'}`}
            >
              <Package className="h-5 w-5" /> Order History
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium ${activeTab === 'addresses' ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'}`}
            >
              <MapPin className="h-5 w-5" /> Saved Addresses
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium ${activeTab === 'settings' ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'}`}
            >
              <Settings className="h-5 w-5" /> Settings
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              <LogOut className="h-5 w-5" /> Sign out
            </button>
          </div>
        </div>

        <div className="flex-1">
          <div className="rounded-2xl bg-white p-6 premium-shadow dark:bg-dark-card">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-bold dark:text-white mb-6">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                    <Input defaultValue="Vidhi" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                    <Input defaultValue="Raval" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                    <Input defaultValue="vidhi.raval@example.com" type="email" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                    <Input defaultValue="+1 (555) 123-4567" type="tel" />
                  </div>
                </div>
                <Button className="mt-8">Save Changes</Button>
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-bold dark:text-white mb-6">Order History</h2>
                <div className="space-y-4">
                  {[1, 2].map(order => (
                    <div key={order} className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                      <div>
                        <p className="font-semibold dark:text-white">Order #ORD-{1000 + order}</p>
                        <p className="text-sm text-gray-500">Placed on Oct 25, 2023</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">Delivered</span>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold dark:text-white">Saved Addresses</h2>
                  <Button size="sm">Add New</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-lg border border-primary-500 p-4 dark:bg-primary-900/10">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold dark:text-white">Home</h4>
                      <span className="text-xs font-medium text-primary-600 dark:text-primary-400">Default</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">123 Main St, Apt 4B<br/>New York, NY 10001<br/>United States</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 className="text-xl font-bold dark:text-white mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold dark:text-white mb-2">Change Password</h3>
                    <div className="space-y-4 max-w-md">
                      <Input type="password" placeholder="Current Password" />
                      <Input type="password" placeholder="New Password" />
                      <Input type="password" placeholder="Confirm New Password" />
                      <Button>Update Password</Button>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
                    <h3 className="font-semibold text-red-600 mb-2">Danger Zone</h3>
                    <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900/50 dark:hover:bg-red-900/20">Delete Account</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
