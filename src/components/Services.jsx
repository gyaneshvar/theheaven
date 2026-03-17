import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EVENTS = [
  { icon: '01', title: 'Wedding & Shaadi',  desc: 'Grand marriage ceremonies with complete decor, catering, and staging with smooth guest flow.' },
  { icon: '02', title: 'Engagement Events', desc: 'Elegant ring and sagai events designed for warm family moments and polished photography.' },
  { icon: '03', title: 'Birthday Celebrations', desc: 'Kids, milestone, and themed birthdays with custom seating and menu planning.' },
  { icon: '04', title: 'Reception Nights', desc: 'Stylish reception experiences with lighting, hospitality, and premium floor management.' },
  { icon: '05', title: 'Sangeet & Mehendi', desc: 'High-energy pre-wedding functions with stage setup, music system, and decor concepts.' },
  { icon: '06', title: 'Corporate Events', desc: 'Conferences, launches, and team events that maintain professionalism without feeling rigid.' },
]

const FACILITIES = [
  { icon: 'A', title: 'Open Lawn', desc: 'Expansive landscaped lawn ideal for rituals, welcome entries, and open-air dining.' },
  { icon: 'B', title: 'AC Banquet Hall', desc: 'Comfortable indoor hall for large guest counts with complete weather flexibility.' },
  { icon: 'C', title: 'In-House Catering', desc: 'Traditional and multi-cuisine menus curated to your event format and audience.' },
  { icon: 'D', title: 'Ample Parking', desc: 'Large, secure parking designed to avoid congestion during peak arrival windows.' },
  { icon: 'E', title: 'Decor & Lighting', desc: 'Theme-aligned floral styling, stage concepts, and ambient lighting compositions.' },
  { icon: 'F', title: 'Sound & Stage', desc: 'Reliable event audio, DJ-ready setup, and stage systems for performances and entries.' },
]

function Card({ icon, title, desc, index }) {
  const ref    = useRef(null)
  const inView  = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 5) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="lux-panel rounded-2xl p-7 text-left shadow-sm hover:-translate-y-1.5 hover:shadow-md transition-all duration-300"
    >
      <span className="w-9 h-9 mb-4 rounded-full bg-gold/15 text-gold-dark font-bold text-[0.76rem] tracking-[1px] grid place-items-center" aria-hidden="true">{icon}</span>
      <h3 className="text-dark text-[1.2rem] mb-2">{title}</h3>
      <p className="text-[#525a66] text-[0.92rem] leading-relaxed">{desc}</p>
    </motion.div>
  )
}

function Grid({ id, title, subtitle, items }) {
  const ref    = useRef(null)
  const inView  = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-10"
      >
        <div className="flex items-center justify-center gap-4 mb-5" aria-hidden="true">
          <div className="flex-1 max-w-[80px] h-px bg-gold/50" />
          <span className="text-gold text-xl">✦</span>
          <div className="flex-1 max-w-[80px] h-px bg-gold/50" />
        </div>
        <h2 id={id} className="text-dark text-4xl sm:text-5xl text-balance">{title}</h2>
        <p className="text-gray-600 text-sm mt-3">{subtitle}</p>
      </motion.div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
        {items.map((item, i) => <Card key={item.title} {...item} index={i} />)}
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <section id="services" className="py-24 bg-cream" aria-labelledby="eventsHeading">
      <div className="section-shell space-y-24">
        <Grid id="eventsHeading" title="Event Formats We Master" subtitle="Built for weddings, milestones, and professional gatherings" items={EVENTS} />
        <Grid id="facilitiesHeading" title="Operational Excellence" subtitle="Infrastructure and service depth that remove event-day stress" items={FACILITIES} />
      </div>
    </section>
  )
}
