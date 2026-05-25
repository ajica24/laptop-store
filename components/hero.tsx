import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-primary text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1),transparent_70%)]" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-balance">
          Premium Laptops for
          <span className="text-gold block mt-2">Every Need</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty">
          Discover top-tier gaming and professional laptops from the world&apos;s leading brands. Quality, performance, and style delivered to your doorstep.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium bg-primary-foreground text-primary rounded-lg hover:bg-muted transition-colors"
          >
            Browse Laptops
          </Link>
          <Link
            href="#about"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium bg-gold text-accent-foreground rounded-lg hover:bg-gold-dark transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
