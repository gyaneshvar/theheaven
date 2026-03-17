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
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/resources/home.webp')" }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#101319]/60 via-[#111418]/68 to-[#111418]/90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(200,168,96,0.2),transparent_32%),radial-gradient(circle_at_82%_16%,rgba(88,134,169,0.26),transparent_34%)]" />

      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 section-shell grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-end pb-10 lg:pb-16"
      >
        <div>
          <motion.span
            variants={item}
            className="inline-block text-gold-light text-[0.7rem] tracking-[5px] uppercase font-semibold mb-5"
          >
            Varanasi's Signature Venue
          </motion.span>

          <motion.h1
            variants={item}
            className="text-white text-balance text-5xl sm:text-6xl lg:text-7xl drop-shadow-2xl leading-[1.02]"
          >
            Celebrations That Feel
            <br />
            Cinematic, Personal,
            <br />
            and Timeless.
          </motion.h1>

          <motion.div variants={item} className="flex items-center gap-3 my-7">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold" />
            <div className="w-2 h-2 bg-gold rotate-45 flex-shrink-0" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold" />
          </motion.div>

          <motion.p
            variants={item}
            className="text-white/80 text-base sm:text-lg max-w-xl mb-9 leading-relaxed"
          >
            From grand weddings to intimate gatherings, The Heavens blends
            tasteful design, smooth execution, and warm hospitality into events
            your families will remember for years.
          </motion.p>

          <motion.div variants={item} className="flex gap-4 flex-wrap">
            <a
              href="#gallery"
              className="bg-gold text-dark font-bold text-[0.78rem] tracking-[2.5px] uppercase px-8 py-3.5 rounded hover:bg-gold-light hover:-translate-y-0.5 transition-all duration-300 shadow-[0_4px_20px_rgba(200,168,96,0.45)]"
            >
              View Gallery
            </a>
            <a
              href="#contact"
              className="text-white border border-white/50 font-bold text-[0.78rem] tracking-[2.5px] uppercase px-8 py-3.5 rounded hover:border-gold hover:text-gold-light hover:-translate-y-0.5 transition-all duration-300"
            >
              Book Consultation
            </a>
          </motion.div>
        </div>

        <motion.div
          variants={item}
          className="lux-panel rounded-2xl p-6 sm:p-7 text-dark max-w-[420px] w-full justify-self-center lg:justify-self-end"
        >
          <p className="section-kicker mb-3">Why Families Choose Us</p>
          <h2 className="text-2xl sm:text-[1.9rem] mb-4 leading-tight">
            Elegant spaces with event support that actually delivers.
          </h2>
          <ul className="space-y-3.5 text-[0.95rem] text-[#38404a]">
            <li>500+ guest capacity with indoor and lawn flexibility</li>
            <li>Custom decor and menu planning for your style</li>
            <li>Prime Ring Road location with convenient parking</li>
          </ul>
        </motion.div>
      </motion.div>

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
