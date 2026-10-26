import { useOutletContext } from 'react-router-dom'
import { Seo } from '../Seo.jsx'
import { InlineText } from './InlineText.jsx'

function scrollToSection(index) {
  const target = document.getElementById(`section-${index}`)
  if (!target) return
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  window.history.replaceState(null, '', `#section-${index}`)
}

function Block({ block }) {
  if (block.h3) {
    return <h3 className="font-display text-lg font-semibold text-ink">{block.h3}</h3>
  }
  if (block.ul) {
    return (
      <ul className="grid gap-2">
        {block.ul.map((item) => (
          <li className="ml-5 list-disc" key={item}>
            <InlineText text={item} />
          </li>
        ))}
      </ul>
    )
  }
  return (
    <p>
      <InlineText text={block.p} />
    </p>
  )
}

export function ProductDocPage({ kind }) {
  const site = useOutletContext()
  const doc = site[kind]
  const path = `/${kind}`
  const showContents = doc.sections.length >= 4

  return (
    <>
      <Seo description={doc.seoDescription} path={path} title={`${site.name} — ${doc.title}`} />

      <section className="section-shell py-14 sm:py-20">
        <span className="inline-flex items-center rounded-full border border-[var(--accent)]/25 bg-[var(--accent-soft)] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
          Legal
        </span>
        <h1 className="mt-5 font-display text-4xl font-semibold tracking-[-0.02em] text-ink sm:text-5xl">
          {doc.title}
        </h1>
        {doc.lastUpdated ? (
          <p className="mt-4 text-sm font-semibold text-slate">Last updated: {doc.lastUpdated}</p>
        ) : null}

        {doc.summary ? (
          <div className="mt-8 max-w-3xl rounded-2xl border border-[var(--accent)]/25 bg-[var(--accent-soft)] p-6 text-base leading-7 text-slate">
            <span className="font-semibold text-[var(--accent)]">Plain-English summary: </span>
            <InlineText text={doc.summary} />
          </div>
        ) : null}

        <div
          className={
            showContents ? 'mt-12 lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-16' : 'mt-12'
          }
        >
          <div className="grid max-w-3xl gap-10">
            {doc.sections.map((section, index) => (
              <section className="scroll-mt-36" id={`section-${index + 1}`} key={section.heading}>
                <h2 className="font-display text-2xl font-semibold text-ink">{section.heading}</h2>
                <div className="mt-3 grid gap-4 text-base leading-7 text-slate">
                  {section.blocks.map((block, blockIndex) => (
                    <Block block={block} key={blockIndex} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {showContents ? (
            <aside className="hidden lg:block">
              <nav
                aria-label="Contents"
                className="sticky top-36 rounded-2xl border border-line bg-white p-5 shadow-line"
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate/70 dark:text-white/40">
                  Contents
                </p>
                <div className="mt-3 grid gap-0.5">
                  {doc.sections.map((section, index) => (
                    <a
                      className="focus-ring rounded-md px-2.5 py-1.5 text-[13px] font-medium text-slate transition hover:bg-mist hover:text-[var(--accent)] dark:text-white/70"
                      href={`#section-${index + 1}`}
                      key={section.heading}
                      onClick={(event) => {
                        event.preventDefault()
                        scrollToSection(index + 1)
                      }}
                    >
                      {section.heading}
                    </a>
                  ))}
                </div>
              </nav>
            </aside>
          ) : null}
        </div>
      </section>
    </>
  )
}
