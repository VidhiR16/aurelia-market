import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { CheckCircle2 } from 'lucide-react';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [paymentError, setPaymentError] = useState('');
  
  const savePurchasedProducts = (items) => {
    const purchased = JSON.parse(localStorage.getItem('purchasedProducts') || '[]');
    const updated = [...new Set([...purchased, ...items.map(item => item.id)])];
    localStorage.setItem('purchasedProducts', JSON.stringify(updated));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setPaymentError('');

    if (paymentMethod === 'credit-card') {
      if (!cardName.trim() || !cardNumber.trim() || !cardExpiry.trim() || !cardCvc.trim()) {
        setPaymentError('Please complete all credit card fields to proceed.');
        return;
      }

      const normalizedCard = cardNumber.replace(/\s+/g, '');
      if (normalizedCard.length < 13 || normalizedCard.length > 19 || !/^\d+$/.test(normalizedCard)) {
        setPaymentError('Please enter a valid card number.');
        return;
      }

      if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) {
        setPaymentError('Enter expiry date as MM/YY.');
        return;
      }

      if (!/^\d{3,4}$/.test(cardCvc)) {
        setPaymentError('Enter a valid CVC.');
        return;
      }
    }

    savePurchasedProducts(cartItems);
    clearCart();
    navigate('/order-success');
  };

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/checkout' } });
    }
  }, [user, navigate]);

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold dark:text-white">Checkout</h1>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7 xl:col-span-8">
          {/* Progress Steps */}
          <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-800'}`}>1</div>
              <span className="font-medium">Shipping</span>
            </div>
            <div className="h-px flex-1 bg-gray-200 mx-4 dark:bg-gray-800"></div>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-800'}`}>2</div>
              <span className="font-medium">Payment</span>
            </div>
          </div>

          <form onSubmit={step === 1 ? (e) => { e.preventDefault(); setStep(2); } : handlePlaceOrder}>
            {step === 1 ? (
              <div className="space-y-6">
                <h2 className="text-xl font-bold dark:text-white">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="First Name" required />
                  <Input placeholder="Last Name" required />
                </div>
                <Input placeholder="Address Line 1" required />
                <Input placeholder="Apartment, suite, etc. (optional)" />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="City" required />
                  <Input placeholder="State/Province" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Postal Code" required />
                  <Input placeholder="Country" required />
                </div>
                <div className="mt-8">
                  <Button type="submit" size="lg" className="w-full sm:w-auto">Continue to Payment</Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-xl font-bold dark:text-white">Payment Method</h2>
                <div className="space-y-4">
                  <label className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 ${paymentMethod === 'credit-card' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-200 dark:border-gray-700'}`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="credit-card"
                        checked={paymentMethod === 'credit-card'}
                        onChange={() => { setPaymentMethod('credit-card'); setPaymentError(''); }}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <span className="font-medium dark:text-white">Credit Card</span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Visa, MasterCard, Amex</span>
                  </label>
                  <label className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 ${paymentMethod === 'paypal' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-200 dark:border-gray-700'}`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={() => { setPaymentMethod('paypal'); setPaymentError(''); }}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <span className="font-medium dark:text-white">PayPal</span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Secure checkout</span>
                  </label>
                </div>
                
                {paymentMethod === 'credit-card' ? (
                  <div className="mt-6 space-y-4 rounded-lg border border-gray-200 p-6 dark:border-gray-800">
                    <Input
                      placeholder="Name on Card"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      required
                    />
                    <Input
                      placeholder="Card Number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        required
                      />
                      <Input
                        placeholder="CVC"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-6 text-sm text-gray-600 dark:border-gray-800 dark:bg-dark-card dark:text-gray-300">
                    You will be redirected to PayPal to complete your payment securely.
                  </div>
                )}

                {paymentError && (
                  <p className="text-sm text-red-600 dark:text-red-400">{paymentError}</p>
                )}

                <div className="mt-8 flex gap-4">
                  <Button type="button" variant="outline" size="lg" onClick={() => setStep(1)}>Back</Button>
                  <Button type="submit" size="lg" className="flex-1">
                    Place Order <CheckCircle2 className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="lg:col-span-5 xl:col-span-4">
          <div className="sticky top-24 rounded-2xl bg-gray-50 p-6 dark:bg-dark-card">
            <h2 className="mb-6 text-lg font-bold dark:text-white">Order Summary</h2>
            <div className="mb-6 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="h-16 w-16 shrink-0 rounded-lg bg-gray-200 dark:bg-gray-800 overflow-hidden">
                    <img src={item.images[0]} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium dark:text-white line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-medium dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 border-t border-gray-200 pt-4 text-sm text-gray-600 dark:border-gray-800 dark:text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(cartTotal * 0.08).toFixed(2)}</span>
              </div>
              <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 text-lg font-bold text-gray-900 dark:border-gray-800 dark:text-white">
                <span>Total</span>
                <span>${(cartTotal * 1.08).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
