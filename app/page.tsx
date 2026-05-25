import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { FeaturedLaptops } from '@/components/featured-laptops'
import { About } from '@/components/about'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeaturedLaptops />
      <About />
      <Contact />
      <Footer />
    </main>
  )
}
