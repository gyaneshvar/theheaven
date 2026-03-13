import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Home',     href: '#home' },
  { label: 'Gallery',  href: '#gallery' },
  { label: 'Services', href: '#services' },
  { label: 'Contact',  href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setMenuOpen(false)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-[70px] flex items-center px-6 transition-all duration-300 ${
        scrolled
          ? 'bg-dark/[.97] backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.45)] border-b border-gold/30'
          : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between w-full max-w-[1300px] mx-auto">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3" aria-label="The Heavens Banquet Lawn — home">
          <img
            src="/resources/logo.png"
            alt="The Heavens logo"
            width={44} height={44}
            className="w-11 h-11 rounded-full border border-gold/60 p-0.5 object-contain"
          />
          <div className="flex flex-col leading-none gap-0.5">
            <span className="font-display text-white text-[1.05rem] tracking-wide">The Heavens</span>
            <span className="text-gold-light text-[0.6rem] tracking-[2px] uppercase">Banquet Lawn</span>
          </div>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="relative text-white/80 text-[0.8125rem] tracking-[1.5px] uppercase font-semibold hover:text-gold-light transition-colors duration-200 group"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="bg-gold text-dark text-[0.8125rem] tracking-[1.5px] uppercase font-bold px-4 py-2 rounded hover:bg-gold-light transition-colors duration-200"
            >
              Book Now
            </a>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 z-10"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`block w-6 h-[2px] bg-white rounded-sm transition-all duration-300 origin-center ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block w-6 h-[2px] bg-white rounded-sm transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-[2px] bg-white rounded-sm transition-all duration-300 origin-center ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="absolute top-[70px] left-0 right-0 bg-dark/[.97] backdrop-blur-md border-b border-gold/20 py-5 px-6 md:hidden"
          >
            <ul className="flex flex-col gap-5" role="list">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={close}
                    className="text-white/80 text-sm tracking-[1.5px] uppercase font-semibold hover:text-gold-light transition-colors block"
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={close}
                  className="inline-block bg-gold text-dark text-sm tracking-[1.5px] uppercase font-bold px-5 py-2.5 rounded hover:bg-gold-light transition-colors"
                >
                  Book Now
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
