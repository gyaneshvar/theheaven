import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EVENTS = [
  { icon: '💍', title: 'Wedding & Shaadi',     desc: 'Grand marriage ceremonies with full decor, catering & stage — the perfect marriage lawn in Varanasi.' },
  { icon: '💎', title: 'Engagement Lawn',      desc: 'Intimate & elegant engagement ceremonies, ring ceremony and sagai on our beautifully decorated lawn.' },
  { icon: '🎂', title: 'Birthday Party',       desc: 'Memorable birthday party celebrations for all ages — kids, adults & milestone birthdays with custom themes.' },
  { icon: '🥂', title: 'Reception',            desc: 'Elegant wedding reception hall with premium lighting, seating & catering for 500+ guests.' },
  { icon: '🎶', title: 'Sangeet & Mehendi',    desc: 'Vibrant sangeet nights and mehendi ceremonies with a dedicated dance floor and sound system.' },
  { icon: '🎊', title: 'Anniversary Party',    desc: 'Celebrate love milestones — silver jubilee, golden anniversary & all special occasions in style.' },
  { icon: '👩‍💼', title: 'Kitty Party',       desc: 'Comfortable, stylish hall setup for kitty parties, ladies\' get-togethers & social gatherings.' },
  { icon: '🏢', title: 'Corporate Events',     desc: 'Professional setup for conferences, seminars, product launches & corporate parties in Varanasi.' },
  { icon: '🎓', title: 'Farewell & Alumni',    desc: 'School & college farewell parties, reunion gatherings and alumni meets with full event support.' },
  { icon: '🎉', title: 'Private Parties',      desc: 'Any special occasion — puja, bhoj, tillak, baraat & all private family celebrations.' },
]

const FACILITIES = [
  { icon: '🌿', title: 'Open Lawn',          desc: 'Lush, manicured lawns — ideal for outdoor ceremonies under the open sky.' },
  { icon: '🏛️', title: 'AC Banquet Hall',   desc: 'Air-conditioned indoor hall for 500+ guests with premium decor options.' },
  { icon: '🍽️', title: 'In-House Catering', desc: 'Traditional feasts to modern multi-cuisine spreads — all freshly prepared.' },
  { icon: '🅿️', title: 'Ample Parking',     desc: 'Spacious, secure parking for all your guests — no hassle on the big day.' },
  { icon: '💡', title: 'Decor & Lighting',   desc: 'Floral arrangements, fairy lights & custom stage setups for every theme.' },
  { icon: '🎶', title: 'Sound & Stage',      desc: 'Professional sound system, DJ booth & stage for live performances.' },
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
      className="bg-white rounded-xl p-7 text-center shadow-sm border border-gold/12 hover:-translate-y-1.5 hover:shadow-md transition-all duration-300"
    >
      <span className="text-[2.4rem] mb-4 block leading-none" aria-hidden="true">{icon}</span>
      <h3 className="text-dark text-[1.05rem] mb-2">{title}</h3>
      <p className="text-gray-500 text-[0.875rem] leading-relaxed">{desc}</p>
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
        <h2 id={id} className="text-dark text-3xl sm:text-4xl">{title}</h2>
        <p className="text-gray-500 italic text-sm mt-2">{subtitle}</p>
      </motion.div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-6">
        {items.map((item, i) => <Card key={item.title} {...item} index={i} />)}
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <section id="services" className="py-24 bg-cream" aria-labelledby="eventsHeading">
      <div className="max-w-[1300px] mx-auto px-5 space-y-24">
        <Grid id="eventsHeading"     title="Events We Host"  subtitle="Every occasion deserves a grand celebration"  items={EVENTS} />
        <Grid id="facilitiesHeading" title="Our Facilities"  subtitle="Everything included for a seamless event"     items={FACILITIES} />
      </div>
    </section>
  )
}
