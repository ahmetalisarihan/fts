'use client'

import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import ContactPhone from './ContactPhone'

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="lg:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        className="relative z-50"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col">
          <div className="flex-1 px-4 py-16 overflow-y-auto">
            <nav className="space-y-4">
              <Link 
                href="/" 
                className="mobile-menu-item"
                onClick={() => setIsOpen(false)}
              >
                Ana Sayfa
              </Link>
              <Link 
                href="/kategoriler" 
                className="mobile-menu-item"
                onClick={() => setIsOpen(false)}
              >
                Kategoriler
              </Link>
              <Link 
                href="/fiyat-listeleri" 
                className="mobile-menu-item"
                onClick={() => setIsOpen(false)}
              >
                Fiyat Listeleri
              </Link>
              <Link 
                href="/hakkimizda" 
                className="mobile-menu-item"
                onClick={() => setIsOpen(false)}
              >
                Hakkımızda
              </Link>
              <Link 
                href="/iletisim" 
                className="mobile-menu-item"
                onClick={() => setIsOpen(false)}
              >
                İletişim
              </Link>
            </nav>
            
            <div className="mt-8 pt-8 border-t">
              <ContactPhone />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MobileMenu
