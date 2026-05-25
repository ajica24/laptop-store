'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/cart-context'
import { usePurchaseHistory } from '@/context/purchase-history-context'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { formatPrice } from '@/lib/data'
import { ShoppingBag, ArrowLeft, CheckCircle } from 'lucide-react'

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const { addOrder } = usePurchaseHistory()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    address: '',
    paymentMethod: 'cod'
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Add order to purchase history
    addOrder({
      items: items,
      totalPrice: totalPrice,
      customerName: formData.name,
      customerContact: formData.contact,
      customerAddress: formData.address,
      paymentMethod: formData.paymentMethod
    })
    
    setIsSubmitted(true)
    clearCart()
  }

  if (isSubmitted) {
    return (
      <main>
        <Navbar />
        <section className="pt-24 pb-20 bg-background min-h-screen">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="py-20">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Order Placed Successfully!
              </h1>
              <p className="text-muted-foreground mb-2">
                Thank you for your order, {formData.name}!
              </p>
              <p className="text-muted-foreground mb-8">
                We will contact you at {formData.contact} to confirm your order.
              </p>
              <div className="bg-card rounded-xl border border-border p-6 text-left mb-8">
                <h3 className="font-semibold text-card-foreground mb-2">Delivery Address:</h3>
                <p className="text-muted-foreground">{formData.address}</p>
                <h3 className="font-semibold text-card-foreground mt-4 mb-2">Payment Method:</h3>
                <p className="text-muted-foreground">
                  {formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 
                   formData.paymentMethod === 'gcash' ? 'GCash' : 
                   formData.paymentMethod === 'bank' ? 'Bank Transfer' : 'Credit/Debit Card'}
                </p>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-gold text-accent-foreground px-6 py-3 rounded-lg font-medium hover:bg-gold-dark transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  if (items.length === 0) {
    return (
      <main>
        <Navbar />
        <section className="pt-24 pb-20 bg-background min-h-screen">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="py-20">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-muted-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-4">
                Your cart is empty
              </h1>
              <p className="text-muted-foreground mb-8">
                Add some laptops to your cart before checking out.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-gold text-accent-foreground px-6 py-3 rounded-lg font-medium hover:bg-gold-dark transition-colors"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main>
      <Navbar />
      
      <section className="pt-24 pb-20 bg-background min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-8">
            Checkout
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-card rounded-xl border border-border p-6">
                  <h2 className="text-xl font-semibold text-card-foreground mb-6">
                    Contact Information
                  </h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold text-foreground"
                        placeholder="Juan Dela Cruz"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact" className="block text-sm font-medium text-foreground mb-2">
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        id="contact"
                        required
                        value={formData.contact}
                        onChange={e => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                        className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold text-foreground"
                        placeholder="+63 917 123 4567"
                      />
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-foreground mb-2">
                        Delivery Address
                      </label>
                      <textarea
                        id="address"
                        required
                        rows={3}
                        value={formData.address}
                        onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold text-foreground resize-none"
                        placeholder="123 Main Street, Barangay, City, Province"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-xl border border-border p-6">
                  <h2 className="text-xl font-semibold text-card-foreground mb-6">
                    Payment Method
                  </h2>
                  
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={e => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                        className="w-4 h-4 text-gold"
                      />
                      <div>
                        <span className="font-medium text-foreground">Cash on Delivery</span>
                        <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="gcash"
                        checked={formData.paymentMethod === 'gcash'}
                        onChange={e => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                        className="w-4 h-4 text-gold"
                      />
                      <div>
                        <span className="font-medium text-foreground">GCash</span>
                        <p className="text-sm text-muted-foreground">Pay via GCash mobile wallet</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="bank"
                        checked={formData.paymentMethod === 'bank'}
                        onChange={e => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                        className="w-4 h-4 text-gold"
                      />
                      <div>
                        <span className="font-medium text-foreground">Bank Transfer</span>
                        <p className="text-sm text-muted-foreground">Direct bank deposit or transfer</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={e => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                        className="w-4 h-4 text-gold"
                      />
                      <div>
                        <span className="font-medium text-foreground">Credit/Debit Card</span>
                        <p className="text-sm text-muted-foreground">Visa, Mastercard, etc.</p>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold text-accent-foreground px-6 py-4 rounded-lg font-medium text-lg hover:bg-gold-dark transition-colors"
                >
                  Place Order - {formatPrice(totalPrice)}
                </button>

                <p className="text-center text-sm text-muted-foreground">
                  This is a demo checkout. No real payment will be processed.
                </p>
              </form>
            </div>

            <div>
              <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-card-foreground mb-6">
                  Order Summary
                </h2>
                
                <div className="space-y-4 mb-6">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden shrink-0 relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-card-foreground text-sm truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-gold">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-card-foreground">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t border-border">
                    <span className="text-card-foreground">Total</span>
                    <span className="text-gold">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
