'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/cart-context'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { formatPrice } from '@/lib/data'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart()

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
                Looks like you haven&apos;t added any laptops to your cart yet.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-gold text-accent-foreground px-6 py-3 rounded-lg font-medium hover:bg-gold-dark transition-colors"
              >
                Browse Products
                <ArrowRight className="w-4 h-4" />
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
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Shopping Cart
            </h1>
            <button
              onClick={clearCart}
              className="text-sm text-destructive hover:underline flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear Cart
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map(item => (
                <div
                  key={item.id}
                  className="bg-card rounded-xl border border-border p-4 sm:p-6 flex flex-col sm:flex-row gap-4"
                >
                  <div className="relative w-full sm:w-40 h-32 bg-muted rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-xs font-medium text-gold uppercase tracking-wider">
                          {item.brand}
                        </span>
                        <h3 className="text-lg font-semibold text-card-foreground">
                          {item.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {item.specs}
                    </p>
                    
                    <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          {formatPrice(item.price)} each
                        </p>
                        <p className="text-xl font-bold text-gold">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-card-foreground mb-6">
                  Order Summary
                </h2>
                
                <div className="space-y-3 mb-6">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="text-card-foreground">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-card-foreground">Total</span>
                    <span className="text-gold">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
                
                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center gap-2 bg-gold text-accent-foreground px-6 py-3 rounded-lg font-medium hover:bg-gold-dark transition-colors"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Link>
                
                <Link
                  href="/products"
                  className="w-full flex items-center justify-center gap-2 mt-3 border border-border px-6 py-3 rounded-lg font-medium text-foreground hover:bg-muted transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
