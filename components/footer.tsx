import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">AJICA</span>
            <span className="text-gold font-medium">Laptop</span>
          </div>
          <p className="text-sm text-muted-foreground text-center md:text-right">
            Your trusted source for premium gaming and professional laptops.
          </p>
        </div>
      </div>
    </footer>
  )
}
