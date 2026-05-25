'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { CartItem } from './cart-context'

export interface Order {
  id: string
  items: CartItem[]
  totalPrice: number
  customerName: string
  customerContact: string
  customerAddress: string
  paymentMethod: string
  orderDate: string
}

interface PurchaseHistoryContextType {
  orders: Order[]
  addOrder: (order: Omit<Order, 'id' | 'orderDate'>) => void
  clearHistory: () => void
}

const PurchaseHistoryContext = createContext<PurchaseHistoryContextType | undefined>(undefined)

export function PurchaseHistoryProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('ajica-purchase-history')
    if (stored) {
      try {
        setOrders(JSON.parse(stored))
      } catch {
        setOrders([])
      }
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('ajica-purchase-history', JSON.stringify(orders))
    }
  }, [orders, isLoaded])

  const addOrder = (order: Omit<Order, 'id' | 'orderDate'>) => {
    const newOrder: Order = {
      ...order,
      id: `ORDER-${Date.now()}`,
      orderDate: new Date().toLocaleDateString('en-PH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
    setOrders(current => [newOrder, ...current])
  }

  const clearHistory = () => {
    setOrders([])
  }

  return (
    <PurchaseHistoryContext.Provider value={{
      orders,
      addOrder,
      clearHistory
    }}>
      {children}
    </PurchaseHistoryContext.Provider>
  )
}

export function usePurchaseHistory() {
  const context = useContext(PurchaseHistoryContext)
  if (!context) {
    throw new Error('usePurchaseHistory must be used within a PurchaseHistoryProvider')
  }
  return context
}
