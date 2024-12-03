'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Tip tanımları
type MenuItem = {
  label: string
  href: string
}

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll fonksiyonu eklendi
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Eğer hash link ise
    if (href.startsWith('#')) {
      e.preventDefault()
      const element = document.querySelector(href)
      element?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const menuItems: MenuItem[] = [
    { label: 'Ana Sayfa', href: '/' },
    { label: 'Proje Özeti', href: '#summary' },
    { label: 'Veri Analizi', href: '#data-analysis' },
    { label: 'Metodoloji', href: '#methodology' },
    { label: 'Literatür', href: '#literature' },
    { label: 'Referans Analizi', href: '#reference-analysis' }
  ]

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        ${scrolled 
          ? 'bg-gray-900/95 backdrop-blur-sm border-b border-gray-800' 
          : 'bg-gray-900/80 backdrop-blur-sm'
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-20"></div>
              <div className="absolute inset-0 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">A</span>
              </div>
            </div>
            <div>
              <span className="text-lg font-semibold text-white">Öğrenci Analizi</span>
              <span className="text-sm text-gray-400 block -mt-1">Zamansal Tahmin</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)} // Click handler eklendi
                className={`text-gray-300 hover:text-white transition-colors duration-200 
                  text-sm font-medium ${pathname === item.href ? 'text-white' : ''}`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#end"
              onClick={(e) => handleClick(e, '#end')} // Contact için de eklendi
              className="px-5 py-2.5 text-sm text-white/90 hover:text-white
                border border-gray-700 hover:border-gray-600 rounded-lg
                transition-colors duration-200"
            >
              Kapanış
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}