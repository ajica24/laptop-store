import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { CartProvider } from '@/context/cart-context'
import { PurchaseHistoryProvider } from '@/context/purchase-history-context'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster as SonnerToaster } from '@/components/ui/sonner'
import { Toaster as CustomToaster } from '@/components/ui/toaster'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'AJICA Laptop - Premium Laptops in the Philippines',
  description: 'Your trusted source for premium gaming and professional laptops. Shop ASUS ROG, Lenovo Legion, Dell XPS, MacBook Pro, and more.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system">
          <PurchaseHistoryProvider>
            <CartProvider>
              <SonnerToaster />
              <CustomToaster />
              {children}
            </CartProvider>
          </PurchaseHistoryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
