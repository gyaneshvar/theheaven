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
    <section id="gallery" className="py-20 bg-off-white" aria-labelledby="galleryHeading">

      {/* Section header */}
      <div className="max-w-[1300px] mx-auto px-5 mb-10 text-center">
        <div className="flex items-center justify-center gap-4 mb-5" aria-hidden="true">
          <div className="flex-1 max-w-[80px] h-px bg-gold/50" />
          <span className="text-gold text-xl">✦</span>
          <div className="flex-1 max-w-[80px] h-px bg-gold/50" />
        </div>
        <h2 id="galleryHeading" className="text-dark text-3xl sm:text-4xl">Our Gallery</h2>
        <p className="text-gray-500 italic text-sm mt-2">A glimpse of the magic we create</p>
      </div>

      {/* Slideshow */}
      <div
        className="relative w-full overflow-hidden bg-dark"
        style={{ height: 'clamp(260px, 55vw, 580px)' }}
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next */}
        <button
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold/20 border border-gold/50 text-white flex items-center justify-center hover:bg-gold/55 active:scale-95 transition-all backdrop-blur-sm text-base sm:text-lg"
        >
          &#10094;
        </button>
        <button
          onClick={next}
          aria-label="Next image"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold/20 border border-gold/50 text-white flex items-center justify-center hover:bg-gold/55 active:scale-95 transition-all backdrop-blur-sm text-base sm:text-lg"
        >
          &#10095;
        </button>
      </div>

      {/* Dots + counter */}
      <div className="max-w-[1300px] mx-auto px-5">
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

