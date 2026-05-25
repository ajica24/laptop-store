'use client'

import Link from 'next/link'
import { usePurchaseHistory } from '@/context/purchase-history-context'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { formatPrice } from '@/lib/data'
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react'

export default function PurchaseHistoryPage() {
  const { orders, clearHistory } = usePurchaseHistory()

  return (
    <main>
      <Navbar />
      
      <section className="pt-24 pb-20 bg-background min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Link>
              <h1 className="text-3xl font-bold text-foreground">
                Purchase History
              </h1>
            </div>
            {orders.length > 0 && (
              <button
                onClick={() => {
                  if (window.confirm('Clear all purchase history? This cannot be undone.')) {
                    clearHistory()
                  }
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                No purchases yet
              </h2>
              <p className="text-muted-foreground mb-8">
                Start shopping and build your purchase history!
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-gold text-accent-foreground px-6 py-3 rounded-lg font-medium hover:bg-gold-dark transition-colors"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map(order => (
                <div key={order.id} className="bg-card rounded-xl border border-border p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-card-foreground">
                        {order.id}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {order.orderDate}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Order Total</p>
                      <p className="text-2xl font-bold text-gold">
                        {formatPrice(order.totalPrice)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-card-foreground mb-2">
                        Customer Details
                      </h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p><span className="font-medium text-card-foreground">Name:</span> {order.customerName}</p>
                        <p><span className="font-medium text-card-foreground">Contact:</span> {order.customerContact}</p>
                        <p><span className="font-medium text-card-foreground">Address:</span> {order.customerAddress}</p>
                        <p><span className="font-medium text-card-foreground">Payment:</span> {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod === 'gcash' ? 'GCash' : order.paymentMethod === 'bank' ? 'Bank Transfer' : 'Credit/Debit Card'}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-card-foreground mb-4">
                        Items ({order.items.length})
                      </h4>
                      <div className="space-y-3">
                        {order.items.map(item => (
                          <div key={item.id} className="flex gap-3">
                            <div className="w-12 h-12 bg-muted rounded overflow-hidden shrink-0">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-card-foreground truncate">
                                {item.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                x{item.quantity} = {formatPrice(item.price * item.quantity)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-card-foreground font-medium">Total Amount:</span>
                      <span className="text-lg font-bold text-gold">
                        {formatPrice(order.totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
