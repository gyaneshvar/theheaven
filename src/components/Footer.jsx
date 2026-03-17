const NAV = ['Home', 'Gallery', 'Services', 'Contact']

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/55 hover:border-gold hover:text-gold transition-all duration-200"
    >
      {children}
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-gold/25 pt-14 pb-7 px-6" role="contentinfo">
      <div className="section-shell flex flex-col items-center gap-8 text-center">

        <div className="flex items-center gap-3">
          <img
            src="/resources/logo.png"
            alt="The Heavens Banquet Lawn"
            width={48} height={48}
            className="w-12 h-12 rounded-full border border-gold/55 p-0.5 object-contain"
          />
          <div className="text-left">
            <div className="font-display text-white text-[1.15rem] leading-tight">The Heavens</div>
            <div className="text-gold text-[0.6rem] tracking-[2.8px] uppercase">Banquet Lawn</div>
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap justify-center gap-6" role="list">
            {NAV.map(item => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="text-white/55 text-[0.74rem] tracking-[2px] uppercase hover:text-gold-light transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3" aria-label="Social media links">
          <SocialLink href="https://wa.me/919651370469?text=Hello%2C%20I%20would%20like%20to%20book%20the%20venue." label="WhatsApp">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </SocialLink>

          <SocialLink href="https://instagram.com/theheavensbanquetlawn" label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4.5"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
          </SocialLink>

          <SocialLink href="https://facebook.com/theheavensbanquetlawn" label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </SocialLink>

        </div>

        <div className="w-full h-px bg-white/8" />

        <div className="text-white/30 text-[0.75rem] flex flex-wrap justify-center items-center gap-x-3 gap-y-1 leading-relaxed">
          <span>© 2026 The Heavens Banquet Lawn. All rights reserved.</span>
          <span aria-hidden="true">•</span>
          <span>
            Owner: Ram Singh &nbsp;|&nbsp;
            <a href="tel:+919651370469" className="hover:text-gold-light transition-colors">+91 96513 70469</a>
          </span>
          <span aria-hidden="true">•</span>
          <span>
            Manager: Vishnu Kumar Verma &nbsp;|&nbsp;
            <a href="tel:+916394710967" className="hover:text-gold-light transition-colors">+91 63947 10967</a>
          </span>
        </div>

      </div>
    </footer>
  )
}
