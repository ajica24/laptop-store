export interface Laptop {
  id: string
  name: string
  brand: string
  specs: string
  price: number
  image: string
  category: string
}

export const laptops: Laptop[] = [
  {
    id: 'asus-rog',
    name: 'ASUS ROG Strix G16',
    brand: 'ASUS',
    specs: 'Intel Core i9-13980HX, RTX 4070, 16GB DDR5, 1TB SSD, 16" QHD 240Hz',
    price: 129990,
    image: '/asus-rog.svg',
    category: 'Gaming'
  },
  {
    id: 'lenovo-legion',
    name: 'Lenovo Legion Pro 7i',
    brand: 'Lenovo',
    specs: 'Intel Core i9-13900HX, RTX 4080, 32GB DDR5, 1TB SSD, 16" WQXGA 240Hz',
    price: 159990,
    image: '/lenovo-legion.svg',
    category: 'Gaming'
  },
  {
    id: 'dell-xps',
    name: 'Dell XPS 15',
    brand: 'Dell',
    specs: 'Intel Core i7-13700H, RTX 4060, 16GB DDR5, 512GB SSD, 15.6" OLED 3.5K',
    price: 109990,
    image: '/dell-xps.svg',
    category: 'Professional'
  },
  {
    id: 'macbook-pro',
    name: 'MacBook Pro 16"',
    brand: 'Apple',
    specs: 'Apple M3 Pro, 18GB Unified Memory, 512GB SSD, 16.2" Liquid Retina XDR',
    price: 149990,
    image: '/macbook-pro.svg',
    category: 'Professional'
  },
  {
    id: 'acer-predator',
    name: 'Acer Predator Helios 18',
    brand: 'Acer',
    specs: 'Intel Core i9-13900HX, RTX 4080, 32GB DDR5, 1TB SSD, 18" WQXGA 250Hz',
    price: 169990,
    image: '/acer-predator.svg',
    category: 'Gaming'
  }
]

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}
