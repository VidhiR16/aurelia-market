import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { products } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/Button';

export default function Wishlist() {
  // Using static mock data for wishlist
  const wishlistItems = products.slice(1, 4);

  if (wishlistItems.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-32 sm:px-6 lg:px-8">
        <div className="mb-6 rounded-full bg-gray-100 p-6 dark:bg-gray-800">
          <Heart className="h-12 w-12 text-gray-400" />
        </div>
        <h2 className="mb-2 text-2xl font-bold dark:text-white">Your wishlist is empty</h2>
        <p className="mb-8 text-gray-500 dark:text-gray-400">Save items you love to your wishlist.</p>
        <Link to="/products">
          <Button size="lg">Discover Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold dark:text-white">My Wishlist</h1>
        <span className="text-gray-500">{wishlistItems.length} items</span>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {wishlistItems.map(product => (
          <div key={product.id} className="relative">
            <ProductCard product={product} />
            <button className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-red-500 shadow-md hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700">
              <Heart className="h-4 w-4 fill-current" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
