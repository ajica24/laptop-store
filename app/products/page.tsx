'use client'

import Image from 'next/image'
import { laptops, formatPrice } from '@/lib/data'
import { useCart } from '@/context/cart-context'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ShoppingCart, Check } from 'lucide-react'
import { useState } from 'react'

export default function ProductsPage() {
  const { addToCart } = useCart()
  const [addedId, setAddedId] = useState<string | null>(null)

  const handleAddToCart = (laptop: typeof laptops[0]) => {
    addToCart(laptop)
    setAddedId(laptop.id)
    setTimeout(() => setAddedId(null), 1500)
  }

  return (
    <main>
      <Navbar />
      
      <section className="pt-24 pb-20 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Products
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our complete collection of premium laptops. From high-performance gaming machines to sleek professional workstations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {laptops.map(laptop => (
              <div
                key={laptop.id}
                id={laptop.id}
                className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all scroll-mt-24"
              >
                <div className="relative aspect-[4/3] bg-muted">
                  <Image
                    src={laptop.image}
                    alt={laptop.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <span className="absolute top-4 left-4 bg-gold text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                    {laptop.category}
                  </span>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {laptop.brand}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-card-foreground mb-3">
                    {laptop.name}
                  </h2>
                  
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {laptop.specs}
                  </p>
                  
                  <p className="text-2xl font-bold text-gold mb-6">
                    {formatPrice(laptop.price)}
                  </p>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAddToCart(laptop)}
                      disabled={addedId === laptop.id}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                        addedId === laptop.id
                          ? 'bg-green-600 text-white'
                          : 'bg-primary text-primary-foreground hover:bg-primary/90'
                      }`}
                    >
                      {addedId === laptop.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          Added
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
