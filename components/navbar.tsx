'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { useState } from 'react'
import { ThemeToggle } from './theme-toggle'

export function Navbar() {
  const { totalItems } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">AJICA</span>
            <span className="text-gold text-sm font-medium">Laptop</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <Link href="/products" className="hover:text-gold transition-colors">
              Products
            </Link>
            <Link href="/purchase-history" className="hover:text-gold transition-colors">
              Purchase History
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/cart"
              className="relative flex items-center gap-2 hover:text-gold transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-4">
            <Link
              href="/"
              className="hover:text-gold transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="hover:text-gold transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/purchase-history"
              className="hover:text-gold transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Purchase History
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
