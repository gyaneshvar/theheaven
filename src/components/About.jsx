import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { num: '500+',  label: 'Guest Capacity' },
  { num: '10+',   label: 'Years of Joy' },
  { num: '1000+', label: 'Events Hosted' },
  { num: '4.9★',  label: 'Avg. Rating' },
]

function StatItem({ num, label, index }) {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="text-center min-w-[110px]"
    >
      <div className="font-display text-gold text-4xl sm:text-5xl leading-none">{num}</div>
      <div className="text-[#525a66] text-[0.72rem] tracking-[2.1px] uppercase mt-2">{label}</div>
    </motion.div>
  )
}

export default function About() {
  const ref    = useRef(null)
  const inView  = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="bg-dark py-24 lg:py-28" aria-label="About The Heavens">
      <div className="section-shell grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
        <div ref={ref}>
          <p className="section-kicker mb-4 text-gold-light">About The Venue</p>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-white text-4xl sm:text-5xl mb-6 text-balance"
          >
            The celebration destination trusted by Varanasi families.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/75 text-[1.03rem] max-w-2xl mb-5 leading-relaxed"
          >
            The Heaven Banquet Lawn at Bada Lalpur, Chandmari, is designed to
            host everything from heartfelt rituals to large receptions with
            graceful flow, warm service, and flexible decor direction.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/68 text-[1rem] max-w-2xl mb-8 leading-relaxed"
          >
            Our team plans every detail around your family, culture, and
            timeline so your day feels effortless from welcome to farewell.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/30 text-[0.76rem] leading-loose max-w-3xl"
          >
            Marriage lawn Varanasi · Engagement lawn Varanasi · Birthday party lawn Varanasi · Reception hall Varanasi ·
            Sangeet venue Varanasi · Ring ceremony lawn · Kitty party venue · Corporate event hall Varanasi ·
            Anniversary party lawn · Naming ceremony venue · Banquet hall Bada Lalpur Chandmari · Lawn near Ring Road Varanasi
          </motion.p>
        </div>

        <div className="lux-panel rounded-2xl p-7 sm:p-9">
          <div className="grid grid-cols-2 gap-6 sm:gap-8">
            {STATS.map((s, i) => <StatItem key={s.label} {...s} index={i} />)}
          </div>
          <div className="mt-8 pt-6 border-t border-gold/25 text-sm text-[#3f4650]">
            Located near Ring Road, The Heavens offers easy access, spacious
            parking, and event-ready infrastructure for a seamless guest
            experience.
          </div>
        </div>
      </div>
    </section>
  )
}
