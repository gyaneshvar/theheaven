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
      <div className="text-white/45 text-[0.72rem] tracking-[2.5px] uppercase mt-2">{label}</div>
    </motion.div>
  )
}

export default function About() {
  const ref    = useRef(null)
  const inView  = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="bg-dark py-24 px-6 text-center" aria-label="About The Heavens">
      <div className="max-w-4xl mx-auto">

        {/* Ornament */}
        <div className="flex items-center justify-center gap-4 mb-6" aria-hidden="true">
          <div className="flex-1 max-w-[80px] h-px bg-gold/40" />
          <span className="text-gold text-xl">✦</span>
          <div className="flex-1 max-w-[80px] h-px bg-gold/40" />
        </div>

        <div ref={ref}>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-white text-3xl sm:text-4xl mb-5"
          >
            Your Dream Venue in Varanasi
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/68 text-[1.05rem] max-w-2xl mx-auto mb-4 leading-relaxed"
          >
            <strong className="text-white font-semibold">The Heaven Banquet Lawn</strong>, located at Bada Lalpur,
            Chandmari, Varanasi, is crafted for those who believe their special day deserves nothing less than
            perfection. From intimate gatherings to grand weddings and receptions, we create magical experiences
            that last a lifetime — right here in the heart of Varanasi, Uttar Pradesh.
          </motion.p>

          {/* SEO keyword row — visually subtle, semantically valid */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/25 text-[0.78rem] leading-loose max-w-3xl mx-auto mb-12"
          >
            Marriage lawn Varanasi &nbsp;·&nbsp; Engagement lawn Varanasi &nbsp;·&nbsp;
            Birthday party lawn Varanasi &nbsp;·&nbsp; Reception hall Varanasi &nbsp;·&nbsp;
            Sangeet venue Varanasi &nbsp;·&nbsp; Ring ceremony lawn &nbsp;·&nbsp;
            Kitty party venue &nbsp;·&nbsp; Corporate event hall Varanasi &nbsp;·&nbsp;
            Anniversary party lawn &nbsp;·&nbsp; Naming ceremony venue &nbsp;·&nbsp;
            Banquet hall Bada Lalpur Chandmari &nbsp;·&nbsp; Lawn near Ring Road Varanasi &nbsp;·&nbsp;
            Marriage lawn near Airhe, Varanasi 221003
          </motion.p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-10 sm:gap-16">
          {STATS.map((s, i) => <StatItem key={s.label} {...s} index={i} />)}
        </div>

      </div>
    </section>
  )
}
