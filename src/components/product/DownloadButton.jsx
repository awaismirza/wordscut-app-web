function GithubLogo({ size = 16 }) {
  return (
    <svg aria-hidden="true" fill="currentColor" height={size} viewBox="0 0 24 24" width={size}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.35.95.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.66.41.36.78 1.05.78 2.12 0 1.53-.01 2.77-.01 3.15 0 .3.2.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  )
}

function AppleLogo({ size = 16 }) {
  return (
    <svg aria-hidden="true" fill="currentColor" height={size} viewBox="0 0 24 24" width={size}>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

function AndroidLogo({ size = 16 }) {
  return (
    <svg aria-hidden="true" fill="currentColor" height={size} viewBox="0 0 24 24" width={size}>
      <path d="M17.52 14.37L19.4 17.6a.75.75 0 1 1-1.3.75l-1.95-3.36c-1.3.56-2.78.88-4.15.88s-2.85-.32-4.15-.88l-1.95 3.36a.75.75 0 1 1-1.3-.75l1.88-3.23C4.16 12.65 2.5 10.15 2.5 7.25h19c0 2.9-1.66 5.4-3.98 7.12zM7.5 10.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zm9 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5zM16 1.75a.75.75 0 0 1 .16 1l-1.15 1.95c1.65.65 3.08 1.68 4.2 2.9h-14.4c1.12-1.22 2.55-2.25 4.2-2.9L7.84 2.75a.75.75 0 1 1 1.3-.75l1.58 2.73c.42-.05.86-.08 1.28-.08s.86.03 1.28.08l1.58-2.73a.75.75 0 0 1 1.1-.25z" />
    </svg>
  )
}

const base =
  'focus-ring inline-flex items-center justify-center gap-2 rounded-full font-semibold text-white transition hover:brightness-110'
const sizes = {
  md: 'h-11 px-6 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

export function DownloadButton({ site, download: directDownload, platform = 'ios', size = 'md', compact = false }) {
  const download = directDownload || (platform === 'android' ? site?.androidDownload : site?.download)
  if (!download) return null

  if (platform === 'android') {
    return (
      <span
        className={`focus-ring inline-flex items-center justify-center gap-2 rounded-full font-semibold transition cursor-default border border-slate/30 text-slate dark:border-white/20 dark:text-white/80 bg-transparent ${sizes[size]} opacity-70`}
        title="Android app is currently in development"
      >
        <AndroidLogo size={size === 'lg' ? 18 : 16} /> {compact ? 'Android' : 'Android coming soon'}
      </span>
    )
  }

  if (download.kind === 'github') {
    return (
      <a
        className={`${base} ${sizes[size]} bg-[var(--accent-control,var(--accent))] shadow-[0_4px_24px_var(--accent-soft)]`}
        href={download.url}
        rel="noreferrer"
        target="_blank"
      >
        <GithubLogo size={size === 'lg' ? 18 : 16} /> {compact ? 'GitHub' : 'View on GitHub'}
      </a>
    )
  }

  if (download.kind === 'coming-soon') {
    return (
      <span
        className={`${base} ${sizes[size]} cursor-default bg-[var(--accent-control,var(--accent))] opacity-60`}
        title={download.note}
      >
        <AppleLogo size={size === 'lg' ? 18 : 16} /> {compact ? 'Coming soon' : 'Coming soon to the App Store'}
      </span>
    )
  }

  return (
    <a
      className={`${base} ${sizes[size]} bg-[var(--accent-control,var(--accent))] shadow-[0_4px_24px_var(--accent-soft)]`}
      href={download.url ?? '#'}
      {...(download.url ? { rel: 'noreferrer', target: '_blank' } : {})}
    >
      <AppleLogo size={size === 'lg' ? 18 : 16} /> {compact ? (download.compactLabel ?? 'Download') : (download.label ?? 'Download on the App Store')}
    </a>
  )
}
