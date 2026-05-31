import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Users, LogOut, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Button } from '../components/ui/Button';

export default function AdminLayout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-dark-card hidden md:block relative">
        <div className="flex h-16 items-center px-6 border-b border-gray-200 dark:border-gray-800">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white font-bold">E</div>
            <span className="text-xl font-bold tracking-tight">Admin</span>
          </Link>
        </div>
        <nav className="p-4 space-y-2">
          <Link to="/admin" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
            <LayoutDashboard className="h-5 w-5 text-gray-500" />
            Dashboard
          </Link>
          <Link to="/admin/products" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
            <Package className="h-5 w-5 text-gray-500" />
            Products
          </Link>
          <Link to="/admin/orders" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
            <ShoppingBag className="h-5 w-5 text-gray-500" />
            Orders
          </Link>
          <Link to="/admin/customers" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
            <Users className="h-5 w-5 text-gray-500" />
            Customers
          </Link>
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <Link to="/">
            <Button variant="outline" className="w-full justify-start gap-3">
              <LogOut className="h-4 w-4" />
              Exit Admin
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 dark:border-gray-800 dark:bg-dark-card">
          <div className="flex-1"></div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-medium">
              A
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
