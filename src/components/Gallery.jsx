import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const IMAGES = Array.from({ length: 11 }, (_, i) => `/resources/${i + 1}.webp`)
const AUTOPLAY_MS = 4000
const SWIPE_THRESHOLD = 50

const slideVariants = {
  enter:  (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0.3 }),
  center: { x: 0, opacity: 1 },
  exit:   (d) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0.3 }),
}

export default function Gallery() {
  const [idx, setIdx]     = useState(0)
  const [dir, setDir]     = useState(1)
  const [epoch, setEpoch] = useState(0) // increment on manual nav to reset timer

  const touchStartX = useRef(0)

  const go = (to, d = 1) => {
    setDir(d)
    setIdx(((to % IMAGES.length) + IMAGES.length) % IMAGES.length)
    setEpoch(e => e + 1)
  }

  const next = () => go(idx + 1, 1)
  const prev = () => go(idx - 1, -1)

  // Autoplay — resets when user navigates manually (epoch change)
  useEffect(() => {
    const id = setInterval(() => {
      setDir(1)
      setIdx(i => (i + 1) % IMAGES.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [epoch])

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd   = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > SWIPE_THRESHOLD) diff > 0 ? next() : prev()
  }

  return (
    <section id="gallery" className="py-24 bg-off-white" aria-labelledby="galleryHeading">

      <div className="section-shell mb-11 text-center">
        <div className="flex items-center justify-center gap-4 mb-5" aria-hidden="true">
          <div className="flex-1 max-w-[80px] h-px bg-gold/50" />
          <span className="text-gold text-xl">✦</span>
          <div className="flex-1 max-w-[80px] h-px bg-gold/50" />
        </div>
        <p className="section-kicker mb-4">Visual Experience</p>
        <h2 id="galleryHeading" className="text-dark text-4xl sm:text-5xl text-balance">A Venue That Looks As Grand As It Feels</h2>
        <p className="text-gray-600 text-sm mt-3">Swipe or use controls to explore our spaces</p>
      </div>

      <div
        className="relative w-full overflow-hidden bg-dark border-y border-gold/20"
        style={{ height: 'clamp(290px, 58vw, 620px)' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        role="region"
        aria-label="Photo gallery slideshow"
      >
        <AnimatePresence custom={dir} initial={false}>
          <motion.div
            key={idx}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
            className="absolute inset-0"
          >
            <img
              src={IMAGES[idx]}
              alt={`The Heavens Banquet Lawn — photo ${idx + 1}`}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/35 border border-gold/50 text-white flex items-center justify-center hover:bg-gold/65 active:scale-95 transition-all backdrop-blur-sm text-base sm:text-lg"
        >
          &#10094;
        </button>
        <button
          onClick={next}
          aria-label="Next image"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/35 border border-gold/50 text-white flex items-center justify-center hover:bg-gold/65 active:scale-95 transition-all backdrop-blur-sm text-base sm:text-lg"
        >
          &#10095;
        </button>
      </div>

      <div className="section-shell">
        <div
          className="flex justify-center gap-2 pt-4"
          role="tablist"
          aria-label="Gallery navigation dots"
        >
          {IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > idx ? 1 : -1)}
              aria-label={`Go to image ${i + 1}`}
              role="tab"
              aria-selected={i === idx}
              className={`rounded-full border-none cursor-pointer transition-all duration-300 ${
                i === idx
                  ? 'w-4 h-2.5 bg-gold'
                  : 'w-2.5 h-2.5 bg-gold-light opacity-40 hover:opacity-70'
              }`}
            />
          ))}
        </div>
        <p className="text-center text-gray-400 text-xs tracking-wide mt-2" aria-live="polite">
          {idx + 1} / {IMAGES.length}
        </p>
      </div>
    </section>
  )
}

