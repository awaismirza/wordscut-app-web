import { ExternalLink, Mail } from 'lucide-react'
import { useOutletContext } from 'react-router-dom'
import { Seo } from '../Seo.jsx'
import { InlineText } from './InlineText.jsx'

export function ProductSupportPage() {
  const site = useOutletContext()
  const { support } = site

  return (
    <>
      <Seo
        description={`Get help with ${site.name} — frequently asked questions and support contact.`}
        path={`/support`}
        title={`${site.name} — Support`}
      />

      <section className="section-shell py-14 sm:py-20">
        <span className="inline-flex items-center rounded-full border border-[var(--accent)]/25 bg-[var(--accent-soft)] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
          Support
        </span>
        <h1 className="mt-5 font-display text-4xl font-semibold tracking-[-0.02em] text-ink sm:text-5xl">
          Need help with {site.name}?
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-slate">{support.intro}</p>

        <div className="mt-9 max-w-xl rounded-2xl border border-line bg-white p-7 shadow-line">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate">Email support</p>
          <a
            className="focus-ring mt-3 inline-flex items-center gap-2.5 rounded-sm font-display text-xl font-semibold text-[var(--accent)] hover:underline"
            href={`mailto:${support.email}?subject=${encodeURIComponent(`${site.name} support`)}`}
          >
            <Mail size={20} /> {support.email}
          </a>
          {support.checklist?.length ? (
            <>
              <p className="mt-6 text-sm font-semibold text-ink">When contacting support, include:</p>
              <ul className="mt-2 grid gap-1.5 text-sm leading-6 text-slate">
                {support.checklist.map((item) => (
                  <li className="ml-5 list-disc" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>

        {support.links?.length ? (
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
            {support.links.map((link) => (
              <a
                className="focus-ring inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-[var(--accent)] hover:underline"
                href={link.href}
                key={link.href}
                rel="noreferrer"
                target="_blank"
              >
                {link.label} <ExternalLink size={13} />
              </a>
            ))}
          </div>
        ) : null}

        {support.faqs?.length ? (
          <div className="mt-14 grid max-w-3xl gap-5">
            <h2 className="font-display text-2xl font-semibold text-ink">Frequently asked questions</h2>
            {support.faqs.map((faq) => (
              <div className="rounded-2xl border border-line bg-white p-6 shadow-line" key={faq.q}>
                <h3 className="font-display text-lg font-semibold text-ink">{faq.q}</h3>
                <p className="mt-2 text-base leading-7 text-slate">
                  <InlineText text={faq.a} />
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </section>
    </>
  )
}
