import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Sparkles, Users, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/mockData';

export default function Home() {
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const premiumCategories = categories.slice(0, 4);

  return (
    <div className="flex flex-col gap-20 pb-20 bg-pink-50">
      {/* Premium Hero */}
      <section className="relative overflow-hidden bg-gray-950 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1600&q=80"
            alt="Luxury shopping experience"
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="relative mx-auto flex min-h-[680px] max-w-7xl flex-col justify-center px-6 py-24 sm:px-8 lg:px-12">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.3em] text-white/80">
              Curated for a refined lifestyle
            </span>
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              Shop exquisite design, quality, and craftsmanship.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
              Welcome to Aurelia Market — a premium boutique marketplace featuring limited-edition collections, elite home essentials, and impeccable customer experiences.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/products">
                <Button size="lg" className="bg-white text-gray-950 hover:bg-gray-100 border-none">
                  Explore the Collection
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="lg" variant="secondary" className="border border-white/20 text-white hover:bg-white/10">
                  Join the Club
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-white/5 p-6 backdrop-blur-xl ring-1 ring-white/10">
              <p className="text-sm uppercase tracking-[0.2em] text-white/50">Limited drops</p>
              <p className="mt-3 text-2xl font-semibold">Exclusive Releases</p>
              <p className="mt-2 text-sm text-white/70">Stay ahead with the newest fashions, tech, and home pieces each season.</p>
            </div>
            <div className="rounded-3xl bg-white/5 p-6 backdrop-blur-xl ring-1 ring-white/10">
              <p className="text-sm uppercase tracking-[0.2em] text-white/50">Fast service</p>
              <p className="mt-3 text-2xl font-semibold">White-Glove Delivery</p>
              <p className="mt-2 text-sm text-white/70">Premium packaging and shipping for every order, right to your door.</p>
            </div>
            <div className="rounded-3xl bg-white/5 p-6 backdrop-blur-xl ring-1 ring-white/10">
              <p className="text-sm uppercase tracking-[0.2em] text-white/50">Luxury support</p>
              <p className="mt-3 text-2xl font-semibold">Concierge Assistance</p>
              <p className="mt-2 text-sm text-white/70">Expert guidance for product selection, gifting, and order care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Services */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl bg-pink-50 p-8 shadow-xl shadow-black/10 dark:bg-pink-900/20">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 text-white">
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-pink-950 dark:text-white">A premium edit</h2>
            <p className="mt-4 text-pink-700 dark:text-pink-300">Handpicked collections designed for modern living, luxury fashion, and exceptional everyday essentials.</p>
          </div>
          <div className="rounded-3xl bg-pink-50 p-8 shadow-xl shadow-black/10 dark:bg-pink-900/20">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 text-white">
              <Truck className="h-6 w-6" />
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-pink-950 dark:text-white">White-glove delivery</h2>
            <p className="mt-4 text-pink-700 dark:text-pink-300">Fast, secure shipping with luxury packaging and real-time tracking on every purchase.</p>
          </div>
          <div className="rounded-3xl bg-pink-50 p-8 shadow-xl shadow-black/10 dark:bg-pink-900/20">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 text-white">
              <Shield className="h-6 w-6" />
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-pink-950 dark:text-white">Satisfaction guaranteed</h2>
            <p className="mt-4 text-pink-700 dark:text-pink-300">Effortless returns, premium support, and curated experiences for every customer.</p>
          </div>
        </div>
      </section>

      {/* Curated Collections */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary-600">Signature Collections</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-950 dark:text-white">Explore our curated categories</h2>
          </div>
          <Link to="/products" className="text-sm font-medium text-primary-600 hover:text-primary-500">View all categories</Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {premiumCategories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.slug}`}
              className="group overflow-hidden rounded-[28px] bg-pink-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-pink-100 hover:shadow-[0_35px_60px_-20px_rgba(219,39,119,0.15)]"
            >
              <div className="flex h-48 items-end overflow-hidden rounded-3xl bg-gray-900">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="mt-6">
                <p className="text-sm text-pink-600 dark:text-pink-300">{category.name}</p>
                <h3 className="mt-2 text-xl font-semibold text-pink-950 dark:text-white">{category.name} Edit</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Featured</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-950 dark:text-white">Most sought-after pieces</h2>
          </div>
          <Link to="/products" className="text-sm font-medium text-primary-600 hover:text-primary-500">Browse all products</Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[36px] bg-gradient-to-br from-gray-900 via-black to-gray-950 p-12 text-white shadow-2xl shadow-black/20">
            <span className="text-sm uppercase tracking-[0.3em] text-primary-400">Luxury reviews</span>
            <h2 className="mt-6 text-4xl font-bold">Loved by discerning customers worldwide</h2>
            <p className="mt-6 max-w-xl text-lg text-white/75">“Aurelia Market delivers stunning products with impeccable service. Every detail feels premium, from browsing to delivery.”</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { name: 'Mila R.', quote: 'The packaging, the selection, and the customer care are all next-level.', stars: 5 },
              { name: 'Noah T.', quote: 'Every product feels curated, high-end and beautifully presented.', stars: 5 },
            ].map((item) => (
          <div className="rounded-[28px] border border-pink-200 bg-pink-50 p-8 shadow-xl shadow-black/5 dark:border-pink-800 dark:bg-pink-900/20">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600 text-white">{item.name.charAt(0)}</div>
                  <div>
                    <p className="font-semibold text-pink-950 dark:text-white">{item.name}</p>
                    <p className="text-sm text-pink-600 dark:text-pink-300">Verified buyer</p>
                  </div>
                </div>
                <p className="mt-6 text-sm leading-7 text-pink-700 dark:text-pink-300">{item.quote}</p>
                <div className="mt-6 flex gap-1 text-primary-600">
                  {Array.from({ length: item.stars }).map((_, index) => (
                    <Star key={index} className="h-4 w-4" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIP Call to Action */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="overflow-hidden rounded-[36px] bg-gray-900 px-8 py-12 sm:px-12 sm:py-16 text-white shadow-2xl shadow-black/20">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.3em] text-primary-400">Become a VIP</p>
              <h2 className="mt-4 text-4xl font-bold">Join Aurelia Market and unlock premium access.</h2>
              <p className="mt-4 text-gray-300">Receive early access to limited releases, exclusive offers, and personalized styling guidance.</p>
            </div>
            <div className="flex gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-primary-600 text-white hover:bg-primary-500 border-none">Get Started</Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="secondary" className="border border-white/20 text-white hover:bg-white/10">Explore Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
