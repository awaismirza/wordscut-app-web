import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Maximize2,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Seo } from "../Seo.jsx";
import { DownloadButton } from "./DownloadButton.jsx";
import "./wordscut.css";

function Capture({
  shot,
  onOpen,
  detail = false,
  eager = false,
  className = "",
}) {
  return (
    <button
      className={`wc-capture ${className}`}
      type="button"
      onClick={(event) => onOpen(shot, event.currentTarget)}
      aria-label={`Enlarge: ${shot.title}`}
    >
      <img
        src={detail && shot.detail ? shot.detail : shot.src}
        alt={shot.alt}
        width={detail && shot.detail ? shot.detailWidth : shot.width}
        height={detail && shot.detail ? shot.detailHeight : shot.height}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
      />
      <span className="wc-enlarge" aria-hidden="true">
        <Maximize2 size={16} />
      </span>
    </button>
  );
}

export function WordsCutLandingPage({ site }) {
  const copy = site.marketing;
  const [step, setStep] = useState(1);
  const [expanded, setExpanded] = useState(null);
  const [actualSize, setActualSize] = useState(false);
  const page = useRef(null);
  const dialog = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("wc-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 },
    );
    page.current
      .querySelectorAll(
        ".wc-section-intro > *, .wc-feature-copy, .wc-privacy h2, .wc-closing h2",
      )
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  const opener = useRef(null);
  const shot = (id) => site.screenshots.find((item) => item.id === id);
  const open = (image, trigger) => {
    opener.current = trigger;
    setActualSize(false);
    setExpanded(image);
    dialog.current.showModal();
  };
  const close = () => dialog.current.close();
  const keepDialogFocus = (event) => {
    if (event.key !== "Tab") return;
    const controls = dialog.current.querySelectorAll(
      'button, a[href], [tabindex="0"]',
    );
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div ref={page} className="wc-landing">
      <Seo
        title={site.name}
        description={site.seoDescription}
        path="/"
        image={site.socialPreview}
        imageAlt={shot("editor").alt}
      />
      <section className="wc-hero" aria-labelledby="wc-title">
        <div className="wc-shell">
          <div className="wc-hero-copy">
            <h1 id="wc-title">
              {site.hero.headline}
              <br />
              {site.hero.headlineAccent}
            </h1>
            <div>
              <p>{site.hero.sub}</p>
              <div className="wc-actions">
                <DownloadButton site={site} />
                <a className="wc-text-link" href="#demonstration">
                  {copy.demoLabel} <ArrowDown size={17} />
                </a>
              </div>
              <p className="wc-note">{copy.availability}</p>
            </div>
          </div>
          <div className="wc-hero-image">
            <Capture eager shot={shot("editor")} onOpen={open} />
          </div>
          <div className="wc-hero-foot">
            <p>{site.hero.badges.slice(0, 2).join(" · ")}</p>
            <p>{copy.captureNote}</p>
          </div>
        </div>
      </section>

      <section
        className="wc-section wc-shell"
        id="demonstration"
        aria-labelledby="wc-words"
      >
        <div className="wc-section-intro">
          <h2 id="wc-words">{copy.workflowTitle}</h2>
          <p>{copy.workflowSub}</p>
        </div>
        <div className="wc-workflow">
          <div
            className="wc-workflow-options"
            role="group"
            aria-label={copy.workflowTitle}
          >
            {copy.workflow.map((item, index) => (
              <button
                key={item.title}
                type="button"
                aria-pressed={step === index}
                aria-controls="wc-workflow-image"
                onClick={() => setStep(index)}
              >
                <span>{item.title}</span>
                <p>{item.description}</p>
                <ArrowUpRight size={21} aria-hidden="true" />
              </button>
            ))}
          </div>
          <figure id="wc-workflow-image" className="wc-workflow-stage">
            <Capture
              shot={shot(copy.workflow[step].shot)}
              detail
              onOpen={open}
            />
            <figcaption aria-live="polite">
              {shot(copy.workflow[step].shot).caption}
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        className="wc-timeline wc-dark-field"
        aria-labelledby="wc-timeline-title"
      >
        <div className="wc-shell wc-section">
          <div className="wc-section-intro">
            <h2 id="wc-timeline-title">{copy.timelineTitle}</h2>
            <p>{copy.timelineSub}</p>
          </div>
          <Capture
            className="wc-timeline-image"
            shot={shot("timeline")}
            detail
            onOpen={open}
          />
          <ul className="wc-inline-list">
            {copy.timelinePoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="wc-shell wc-section wc-visuals"
        aria-labelledby="wc-visuals-title"
      >
        <h2 id="wc-visuals-title">{copy.visualsTitle}</h2>
        {copy.visuals.map((item, index) => (
          <article
            className={`wc-feature wc-feature-${index}`}
            key={item.title}
          >
            <div className="wc-feature-copy">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {item.note && <p className="wc-note">{item.note}</p>}
            </div>
            <figure>
              <Capture
                shot={shot(item.shot)}
                detail={item.shot === "camera"}
                onOpen={open}
              />
              <figcaption>{shot(item.shot).caption}</figcaption>
            </figure>
          </article>
        ))}
      </section>

      <section
        className="wc-finish wc-section"
        aria-labelledby="wc-finish-title"
      >
        <div className="wc-shell">
          <div className="wc-section-intro">
            <h2 id="wc-finish-title">{copy.finishTitle}</h2>
            <p>{copy.finishSub}</p>
          </div>
          <div className="wc-finish-grid">
            <article>
              <h3>{copy.recordTitle}</h3>
              <p>{copy.recordCopy}</p>
              <Capture shot={shot("recording")} onOpen={open} />
              <p className="wc-note">{shot("recording").caption}</p>
            </article>
            <article>
              <Capture shot={shot("export")} detail onOpen={open} />
              <h3>{copy.exportTitle}</h3>
              <p>{copy.exportCopy}</p>
            </article>
          </div>
        </div>
      </section>

      <section
        className="wc-privacy wc-dark-field"
        aria-labelledby="wc-privacy-title"
      >
        <div className="wc-shell wc-section">
          <div>
            <h2 id="wc-privacy-title">{copy.privacyTitle}</h2>
            <p>{copy.privacyCopy}</p>
            <Link
              className="wc-text-link"
              to={`/privacy`}
            >
              {copy.privacyLink} <ArrowRight size={18} />
            </Link>
          </div>
          <ul>
            {copy.privacyDetails.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="wc-shell wc-section"
        aria-labelledby="wc-gallery-title"
      >
        <div className="wc-section-intro">
          <h2 id="wc-gallery-title">{copy.galleryTitle}</h2>
          <p>{copy.gallerySub}</p>
        </div>
        <div className="wc-gallery">
          {site.screenshots.map((image) => (
            <figure key={image.id}>
              <Capture shot={image} onOpen={open} />
              <figcaption>
                <strong>{image.title}</strong>
                <span>{image.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section
        className="wc-capabilities wc-shell"
        aria-labelledby="wc-capabilities-title"
      >
        <h2 id="wc-capabilities-title">{copy.capabilitiesTitle}</h2>
        <dl>
          {copy.capabilities.map((item) => (
            <div key={item.title}>
              <dt>{item.title}</dt>
              <dd>{item.description}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        className="wc-shell wc-section wc-faq"
        aria-labelledby="wc-faq-title"
      >
        <h2 id="wc-faq-title">{copy.faqTitle}</h2>
        <div>
          {copy.faqs.map((item) => (
            <details name="wordscut-faq" key={item.q}>
              <summary>
                {item.q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="wc-closing wc-dark-field">
        <div className="wc-shell">
          <img src={site.icon} alt="" width="88" height="88" loading="lazy" />
          <h2>{copy.closingTitle}</h2>
          <p>{copy.closingCopy}</p>
          <div className="wc-actions">
            <DownloadButton site={site} />
            <Link
              className="wc-text-link"
              to={`/support`}
            >
              {copy.supportLabel} <ArrowUpRight size={18} />
            </Link>
          </div>
          <p className="wc-note">{copy.availability}</p>
        </div>
      </section>

      <dialog
        onKeyDown={keepDialogFocus}
        ref={dialog}
        className="wc-lightbox"
        aria-label={expanded?.title}
        onClose={() => {
          setExpanded(null);
          opener.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        {expanded && (
          <>
            <div className="wc-lightbox-bar">
              <p>{expanded.title}</p>
              <button
                type="button"
                onClick={close}
                autoFocus
                aria-label="Close screenshot"
              >
                <X size={24} />
              </button>
            </div>
            <button
              className="wc-image-size"
              type="button"
              aria-pressed={actualSize}
              onClick={() => setActualSize((value) => !value)}
            >
              {actualSize ? "Fit image" : "View actual size"}
            </button>
            <div
              tabIndex={actualSize ? 0 : undefined}
              aria-label="Screenshot, scroll to explore"
              className={`wc-lightbox-image ${actualSize ? "wc-actual-size" : ""}`}
            >
              <img
                src={expanded.src}
                alt={expanded.alt}
                width={expanded.width}
                height={expanded.height}
              />
            </div>
            <p>{expanded.caption}</p>
            <a href={expanded.src} target="_blank" rel="noreferrer">
              Open original image <ArrowUpRight size={16} />
            </a>
          </>
        )}
      </dialog>
    </div>
  );
}
