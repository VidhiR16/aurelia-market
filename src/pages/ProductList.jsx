import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Filter, ChevronDown, Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/mockData';
import { Button } from '../components/ui/Button';

export default function ProductList() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialCategory = searchParams.get('category');
  const searchFromParams = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'all');
  const [searchText, setSearchText] = useState(searchFromParams);
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    setSearchText(searchFromParams);
  }, [searchFromParams]);

  useEffect(() => {
    setSelectedCategory(initialCategory || 'all');
  }, [initialCategory]);

  const buildProductUrl = (category, search) => {
    const params = new URLSearchParams();
    if (category && category !== 'all') {
      params.set('category', category);
    }
    if (search) {
      params.set('search', search);
    }
    const queryString = params.toString();
    return `/products${queryString ? `?${queryString}` : ''}`;
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchText.trim();
    navigate(buildProductUrl(selectedCategory, trimmed));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    navigate(buildProductUrl(category, searchText.trim() || searchFromParams));
  };

  const searchQuery = (searchText.trim() || searchFromParams).toLowerCase();

  const filteredProducts = useMemo(() => {
    let items = products;
    if (selectedCategory !== 'all') {
      items = items.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      items = items.filter((p) =>
        p.name.toLowerCase().includes(searchQuery) ||
        (p.description && p.description.toLowerCase().includes(searchQuery))
      );
    }

    return [...items];
  }, [selectedCategory, searchQuery]);

  // Sorting
  if (sortBy === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  } else {
    // featured default
    filteredProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className={`w-full md:w-64 shrink-0 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
          <div className="sticky top-24 space-y-8 rounded-xl bg-white p-6 premium-shadow dark:bg-dark-card">
            <div>
              <h3 className="text-lg font-semibold dark:text-white mb-4">Categories</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === 'all'}
                    onChange={() => handleCategoryChange('all')}
                    className="text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm dark:text-gray-300">All Products</span>
                </label>
                {categories.map(cat => (
                  <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat.slug}
                      onChange={() => handleCategoryChange(cat.slug)}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm dark:text-gray-300">{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold dark:text-white mb-4">Price Range</h3>
              <div className="space-y-4">
                <input type="range" min="0" max="1000" className="w-full accent-primary-600" />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>0</span>
                  <span>1000+</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-6 flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold dark:text-white">
                  {searchFromParams
                    ? `Search results for "${searchFromParams}"`
                    : selectedCategory === 'all'
                      ? 'All Products'
                      : categories.find(c => c.slug === selectedCategory)?.name}
                  <span className="ml-2 text-sm font-normal text-gray-500">({filteredProducts.length})</span>
                </h1>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button variant="outline" className="md:hidden" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                  <Filter className="mr-2 h-4 w-4" /> Filters
                </Button>
                <div className="relative">
                  <select
                    className="h-10 appearance-none rounded-md border border-gray-300 bg-white pl-4 pr-10 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-dark-card dark:text-white"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <form onSubmit={handleSearchSubmit} className="relative max-w-md">
              <Search className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search product names..."
                className="h-11 w-full rounded-full border border-gray-300 bg-white pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-dark-card dark:text-white"
              />
            </form>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
