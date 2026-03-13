import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const WA_NUM = '919651370469'
const WA_MSG = encodeURIComponent('Hello, I would like to enquire about booking the venue.')
const WA_URL = `https://wa.me/${WA_NUM}?text=${WA_MSG}`

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function InfoRow({ icon, label, children }) {
  return (
    <div className="flex items-start gap-3.5 mb-5">
      <span className="text-xl flex-shrink-0 w-7 text-center mt-0.5" aria-hidden="true">{icon}</span>
      <div>
        <strong className="block text-[0.7rem] tracking-[1.5px] uppercase text-gold-dark mb-0.5">{label}</strong>
        <div className="text-gray-700 text-[0.9rem] leading-relaxed">{children}</div>
      </div>
    </div>
  )
}

const inputCls = 'w-full px-3.5 py-2.5 border border-gold/30 rounded text-sm text-gray-800 bg-off-white focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all'
const labelCls = 'block text-[0.73rem] tracking-wide uppercase text-gray-500 font-semibold mb-1.5'

export default function Contact() {
  const ref    = useRef(null)
  const inView  = useInView(ref, { once: true, margin: '-80px' })
  const [result, setResult] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    setResult('Sending...')

    const formData = new FormData(event.target)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setResult('Enquiry sent successfully.')
        event.target.reset()
        return
      }

      setResult(data.message || 'Unable to send enquiry right now.')
    } catch {
      setResult('Unable to send enquiry right now.')
    }
  }

  return (
    <section id="contact" className="py-24 bg-off-white" aria-labelledby="contactHeading">
      <div className="max-w-[1300px] mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-14" ref={ref}>
          <div className="flex items-center justify-center gap-4 mb-5" aria-hidden="true">
            <div className="flex-1 max-w-[80px] h-px bg-gold/50" />
            <span className="text-gold text-xl">✦</span>
            <div className="flex-1 max-w-[80px] h-px bg-gold/50" />
          </div>
          <motion.h2
            id="contactHeading"
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-dark text-3xl sm:text-4xl"
          >
            Get in Touch
          </motion.h2>
          <p className="text-gray-500 italic text-sm mt-2">We'd love to make your special day unforgettable</p>
        </div>

        <div className="grid md:grid-cols-[1fr_1.45fr] gap-12 lg:gap-16">

          {/* ── Left: Contact info ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="text-dark text-[1.35rem] mb-5 pb-3 border-b border-gold/25">Venue Details</h3>

            {/* Owner + Manager cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Owner */}
              <div className="flex items-center gap-3">
                <img
                  src="/resources/owner.png"
                  alt="Ram Singh — Owner"
                  width={60} height={60}
                  className="w-[60px] h-[60px] rounded-full object-cover border-2 border-gold flex-shrink-0"
                />
                <div>
                  <strong className="block text-[0.68rem] tracking-[1.5px] uppercase text-gold-dark mb-0.5">Owner</strong>
                  <span className="text-gray-800 font-medium text-sm block">Ram Singh</span>
                  <a href="tel:+919651370469" className="text-gray-600 text-xs hover:text-gold-dark transition-colors">
                    +91 96513 70469
                  </a>
                </div>
              </div>

              {/* Manager */}
              <div className="flex items-center gap-3">
                <div className="w-[60px] h-[60px] rounded-full bg-dark-mid border-2 border-gold flex-shrink-0 flex items-center justify-center">
                  <span className="font-display text-gold text-xl font-semibold select-none">VK</span>
                </div>
                <div>
                  <strong className="block text-[0.68rem] tracking-[1.5px] uppercase text-gold-dark mb-0.5">Manager</strong>
                  <span className="text-gray-800 font-medium text-sm block">Vishnu Kumar Verma</span>
                  <a href="tel:+916394710967" className="text-gray-600 text-xs hover:text-gold-dark transition-colors">
                    +91 63947 10967
                  </a>
                </div>
              </div>
            </div>

            <InfoRow icon="💬" label="WhatsApp">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gold-dark transition-colors">
                Chat on WhatsApp
              </a>
            </InfoRow>

            <InfoRow icon="📍" label="Address">
              Near KGF Restaurant, Ring Road, Bada Lalpur, Chandmari,<br />
              Airhe, Varanasi, Uttar Pradesh 221003
            </InfoRow>

            <InfoRow icon="✉️" label="Email">
              <a href="mailto:info@theheavensbanquet.com" className="hover:text-gold-dark transition-colors">
                info@theheavensbanquet.com
              </a>
            </InfoRow>

            <InfoRow icon="🕐" label="Hours">
              Open daily — 9:00 AM to 10:00 PM
            </InfoRow>

            {/* WhatsApp CTA */}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="inline-flex items-center gap-2.5 bg-[#25D366] text-white font-bold text-sm px-6 py-3 rounded mt-1 hover:bg-[#1ebe5a] hover:-translate-y-0.5 transition-all shadow-[0_4px_15px_rgba(37,211,102,0.28)]"
            >
              <WhatsAppIcon /> Chat on WhatsApp
            </a>
          </motion.div>

          {/* ── Right: Form + Map ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-7"
          >
            {/* Enquiry form */}
            <div className="bg-white rounded-2xl p-7 sm:p-8 shadow-sm border border-gold/15">
              <h3 className="text-dark text-[1.25rem] mb-6">Send an Enquiry</h3>
              <form onSubmit={onSubmit} noValidate>
                <input type="hidden" name="access_key" value="488a230e-ec44-4733-952f-db000c11f0e2" />
                <input type="hidden" name="subject" value="New enquiry from The Heavens website" />
                <input type="hidden" name="from_name" value="The Heavens Website" />
                <input type="checkbox" name="botcheck" className="hidden" tabIndex="-1" autoComplete="off" />

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="fname" className={labelCls}>Name</label>
                    <input type="text" id="fname" name="name" placeholder="Your name" required className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="fphone" className={labelCls}>Phone</label>
                    <input type="tel" id="fphone" name="phone" placeholder="+91 XXXXX XXXXX" className={inputCls} />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="femail" className={labelCls}>Email</label>
                  <input type="email" id="femail" name="email" placeholder="your@email.com" required className={inputCls} />
                </div>

                <div className="mb-4">
                  <label htmlFor="fevent" className={labelCls}>Event Type</label>
                  <select id="fevent" name="event_type" className={inputCls}>
                    <option value="">Select event type…</option>
                    <option>Wedding / Shaadi</option>
                    <option>Engagement / Ring Ceremony</option>
                    <option>Reception</option>
                    <option>Sangeet / Mehendi</option>
                    <option>Birthday Party</option>
                    <option>Naming Ceremony / Namkaran</option>
                    <option>Kitty Party</option>
                    <option>Corporate Event</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="fdate" className={labelCls}>Preferred Date</label>
                  <input type="date" id="fdate" name="preferred_date" className={inputCls} />
                </div>

                <div className="mb-5">
                  <label htmlFor="fmsg" className={labelCls}>Message</label>
                  <textarea
                    id="fmsg" name="message"
                    placeholder="Tell us about your event…"
                    rows={4}
                    required
                    className={`${inputCls} resize-y min-h-[110px]`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold text-dark font-bold text-[0.875rem] tracking-[2px] uppercase py-3.5 rounded hover:bg-gold-light transition-colors shadow-[0_4px_20px_rgba(200,168,96,0.35)]"
                >
                  Send Enquiry
                </button>

                <p className="mt-3 text-sm text-gray-500 min-h-5" aria-live="polite">
                  {result}
                </p>
              </form>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gold/20" style={{ height: 300 }}>
              <iframe
                src="https://maps.google.com/maps?q=9XPC%2B6P+Varanasi,+Uttar+Pradesh&output=embed&z=17"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Heavens Banquet Lawn — Varanasi"
                className="w-full h-full border-0 block"
              />
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
