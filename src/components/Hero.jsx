import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.25 } },
}

const item = {
  hidden: { opacity: 0, y: 26 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  return (
    <section id="home" className="relative h-screen min-h-[550px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/resources/home.webp')" }}
      />

      {/* Layered gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-[rgba(10,8,3,0.42)] to-black/70" />

      {/* Grain texture overlay for luxury feel */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-6 max-w-3xl"
      >
        <motion.span
          variants={item}
          className="inline-block text-gold-light text-[0.72rem] tracking-[5px] uppercase font-semibold mb-4"
        >
          Welcome to
        </motion.span>

        <motion.h1
          variants={item}
          className="text-white font-display text-5xl sm:text-6xl lg:text-7xl drop-shadow-2xl leading-[1.1]"
        >
          The Heavens<br />Banquet Lawn
        </motion.h1>

        {/* Gold ornamental divider */}
        <motion.div variants={item} className="flex items-center justify-center gap-3 my-6">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold" />
          <div className="w-2 h-2 bg-gold rotate-45 flex-shrink-0" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold" />
        </motion.div>

        <motion.p
          variants={item}
          className="text-white/80 text-base sm:text-lg italic max-w-md mx-auto mb-9 leading-relaxed"
        >
          Where every celebration becomes an eternal memory.
          Exquisite venue, impeccable service, unforgettable moments.
        </motion.p>

        <motion.div variants={item} className="flex gap-4 justify-center flex-wrap">
          <a
            href="#gallery"
            className="bg-gold text-dark font-bold text-[0.8125rem] tracking-[2px] uppercase px-8 py-3.5 rounded hover:bg-gold-light hover:-translate-y-0.5 transition-all duration-300 shadow-[0_4px_20px_rgba(200,168,96,0.45)]"
          >
            View Gallery
          </a>
          <a
            href="#contact"
            className="text-white border border-white/50 font-bold text-[0.8125rem] tracking-[2px] uppercase px-8 py-3.5 rounded hover:border-gold hover:text-gold-light hover:-translate-y-0.5 transition-all duration-300"
          >
            Book Your Event
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="w-5 h-5 border-r-2 border-b-2 border-gold rotate-45" />
      </motion.div>
    </section>
  )
}
