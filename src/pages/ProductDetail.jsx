import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Truck, ArrowLeft, Minus, Plus, ShoppingCart } from 'lucide-react';
import { products } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [submittedRating, setSubmittedRating] = useState(null);
  const [hasPurchased, setHasPurchased] = useState(false);

  const handleBuyNow = () => {
    if (!user) {
      addToCart(product, quantity);
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }

    addToCart(product, quantity);
    navigate('/checkout');
  };

  useEffect(() => {
    const ratings = JSON.parse(localStorage.getItem('productRatings') || '{}');
    if (ratings[id]) {
      setSubmittedRating(ratings[id].rating);
      setSelectedRating(ratings[id].rating);
    }

    const purchased = JSON.parse(localStorage.getItem('purchasedProducts') || '[]');
    setHasPurchased(purchased.includes(id));
  }, [id]);

  if (!product) return <div className="text-center py-20 text-xl">Product not found</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link to="/products" className="mb-6 inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary-600 dark:text-gray-400">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to products
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Images */}
        <div className="flex flex-col-reverse lg:flex-row gap-4">
          <div className="flex lg:flex-col gap-4 overflow-x-auto lg:w-24">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`relative aspect-square w-20 lg:w-full overflow-hidden rounded-lg border-2 ${activeImage === idx ? 'border-primary-600' : 'border-transparent'}`}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <div className="flex-1 aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
            <img src={product.images[activeImage]} alt={product.name} className="h-full w-full object-cover" />
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="text-sm text-primary-600 font-medium capitalize">{product.category}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-4">
            {product.name}
          </h1>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-gray-600'}`} />
              ))}
            </div>
            <span className="text-sm text-gray-500">{product.reviews} reviews</span>
          </div>
          <div className="mb-6 flex items-end gap-3">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through mb-1">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="mb-8 border-t border-b border-gray-200 dark:border-gray-800 py-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-medium dark:text-white">Quantity</span>
              <div className="flex items-center rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark-card">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex gap-4">
              <Button size="lg" className="flex-1 text-lg bg-primary-600 hover:bg-primary-700" onClick={() => addToCart(product, quantity)}>
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              <Button size="lg" variant="secondary" className="flex-1 text-lg" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </div>
          </div>

          <div className="mb-8 rounded-3xl border border-pink-100 bg-pink-50 p-6 text-sm text-pink-900 dark:border-pink-800 dark:bg-pink-900/20 dark:text-pink-100">
            {hasPurchased ? (
              <>
                <p className="font-semibold">Purchased item rating</p>
                <p className="mt-2 text-sm text-pink-700 dark:text-pink-200">Thanks for buying this product. Rate it below.</p>
                <div className="mt-4 flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setSelectedRating(star)}
                      className={`rounded-full p-2 transition ${selectedRating >= star ? 'bg-pink-600 text-white' : 'bg-white text-pink-600 dark:bg-pink-800 dark:text-pink-300'}`}
                    >
                      <Star className="h-5 w-5" />
                    </button>
                  ))}
                </div>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button
                    size="md"
                    className="w-full sm:w-auto bg-pink-600 text-white hover:bg-pink-700 border-none"
                    onClick={() => {
                      if (!selectedRating) return;
                      const savedRatings = JSON.parse(localStorage.getItem('productRatings') || '{}');
                      localStorage.setItem(
                        'productRatings',
                        JSON.stringify({
                          ...savedRatings,
                          [id]: { rating: selectedRating, updatedAt: new Date().toISOString() }
                        })
                      );
                      setSubmittedRating(selectedRating);
                    }}
                  >
                    {submittedRating ? 'Update Rating' : 'Submit Rating'}
                  </Button>
                  {submittedRating ? (
                    <span className="text-sm text-pink-700 dark:text-pink-200">You rated this product {submittedRating} / 5.</span>
                  ) : (
                    <span className="text-sm text-pink-600 dark:text-pink-300">Select a star and submit your rating.</span>
                  )}
                </div>
              </>
            ) : (
              <>
                <p className="font-semibold">Rate this product after purchase</p>
                <p className="mt-2 text-sm text-pink-700 dark:text-pink-200">Buy the product first, then return to this page to leave your rating.</p>
              </>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <Truck className="h-5 w-5" />
            <span>Free delivery on orders over $100. Expected delivery 2-4 business days.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
