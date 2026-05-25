import { Laptop, Shield, Truck } from 'lucide-react'

export function About() {
  return (
    <section id="about" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            About AJICA Laptop
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your trusted partner for premium laptops in the Philippines since 2024.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-background p-8 rounded-xl text-center">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Laptop className="w-8 h-8 text-gold" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Premium Selection
            </h3>
            <p className="text-muted-foreground">
              We offer only the best laptops from top brands like ASUS, Lenovo, Dell, Apple, and Acer.
            </p>
          </div>

          <div className="bg-background p-8 rounded-xl text-center">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-gold" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Warranty Assured
            </h3>
            <p className="text-muted-foreground">
              All products come with official manufacturer warranty for your peace of mind.
            </p>
          </div>

          <div className="bg-background p-8 rounded-xl text-center">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Truck className="w-8 h-8 text-gold" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Fast Delivery
            </h3>
            <p className="text-muted-foreground">
              Nationwide delivery across the Philippines with secure packaging and tracking.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
