'use client'

import Image from 'next/image'
import Link from 'next/link'
import { laptops, formatPrice } from '@/lib/data'
import { useCart } from '@/context/cart-context'
import { ShoppingCart } from 'lucide-react'

export function FeaturedLaptops() {
  const { addToCart } = useCart()
  const featured = laptops.slice(0, 3)

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Featured Laptops
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our handpicked selection of the best laptops available in the Philippines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map(laptop => (
            <div
              key={laptop.id}
              className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[4/3] bg-muted">
                <Image
                  src={laptop.image}
                  alt={laptop.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-medium text-gold uppercase tracking-wider">
                  {laptop.category}
                </span>
                <h3 className="text-xl font-semibold text-card-foreground mt-2 mb-2">
                  {laptop.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {laptop.specs}
                </p>
                <p className="text-2xl font-bold text-gold mb-4">
                  {formatPrice(laptop.price)}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => addToCart(laptop)}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </button>
                  <Link
                    href={`/products#${laptop.id}`}
                    className="px-4 py-2.5 border border-border rounded-lg font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium bg-gold text-accent-foreground rounded-lg hover:bg-gold-dark transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}
