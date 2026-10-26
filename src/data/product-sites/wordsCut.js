import { Cpu, FileVideo, GitBranch, Scissors, ShieldCheck, Type } from 'lucide-react'

const checkoutUrl = import.meta.env?.VITE_WORDSCUT_CHECKOUT_URL?.trim()
if (checkoutUrl) {
  const checkout = new URL(checkoutUrl)
  if (checkout.protocol !== 'https:' || checkout.username || checkout.password) {
    throw new Error('WordsCut checkout must be a public HTTPS checkout URL, never a secret key.')
  }
}

export const wordsCut = {
  slug: 'wordscut',
  aliases: ['yusafcut'],
  name: 'WordsCut',
  overview: 'wordscut',
  socialPreview: '/wordscut/social-preview.png',
  category: 'Local AI video editor for macOS',
  icon: '/wordscut/icon.svg',
  seoDescription:
    'WordsCut is a local-first, transcript-based video editor for Apple Silicon Macs. Edit the words; WordsCut edits the video. Local processing, no cloud upload, no telemetry.',

  accent: '#4F5EE8',
  accentOnDark: '#B9C4FF',
  accentDark: '#3644B8',
  accentSoft: 'rgba(104, 123, 243, 0.12)',
  download: checkoutUrl
    ? { kind: 'website', url: checkoutUrl, label: 'Buy WordsCut for Mac', compactLabel: 'Buy WordsCut' }
    : { kind: 'website', url: 'mailto:owaesmirza@gmail.com?subject=WordsCut%20paid%20release', label: 'Ask about the paid release', compactLabel: 'Contact' },

  facts: [
    { label: 'Platform', value: 'macOS 13+ · Apple Silicon' },
    { label: 'Availability', value: checkoutUrl ? 'Paid download' : 'Paid release in preparation' },
    { label: 'Data', value: 'Local-first · No telemetry' },
    { label: 'Earlier public release', value: '1.0.0' },
  ],

  hero: {
    eyebrow: 'Transcript-based video editing',
    headline: 'Edit the words.',
    headlineAccent: 'Shape the video.',
    sub: 'A local-first video editor for Mac. Turn spoken words into a tighter story, then refine every frame on the timeline.',
    ctas: [{ label: 'Purchase and release questions', href: '/support' }],
    badges: ['Local transcription', 'Apple Silicon · macOS 13+', checkoutUrl ? 'Paid Mac app' : 'Paid release coming soon'],
  },

  closing: {
    title: 'Cut your next video by editing words.',
    sub: 'WordsCut is the new name for YusafCut. Current development builds support .wordscut packages and existing .scribe projects. Purchase details and customer download delivery will be available here when checkout is ready.',
  },

  screenshotFormat: 'desktop',
  screenshotsTitle: 'Inside WordsCut',
  screenshots: [
    { id: 'editor', src: '/wordscut/screenshots/editor-hero.webp', width: 1400, height: 900, alt: 'WordsCut native editor with the Fieldnotes presentation, selected transcript words, five clips and two screen zooms', title: 'The whole edit, together', caption: 'Transcript, video preview and effect lanes in the real Mac editor.' },
    { id: 'transcript', src: '/wordscut/screenshots/transcript-editing.webp', detail: '/wordscut/screenshots/transcript-detail.webp', detailWidth: 517, detailHeight: 510, width: 1400, height: 900, alt: 'Ten words selected in the WordsCut transcript with Cut and Keep only controls', title: 'Keep the words that matter', caption: 'Select words to cut, keep, mark or turn into a chapter.' },
    { id: 'timeline', src: '/wordscut/screenshots/timeline-editing.webp', detail: '/wordscut/screenshots/timeline-detail.webp', detailWidth: 1400, detailHeight: 255, width: 1400, height: 900, alt: 'A selected clip on the WordsCut timeline above two screen zoom regions and chapter markers', title: 'Refine the cut', caption: 'Five clips, chapter markers and timed screen zooms.' },
    { id: 'zoom', src: '/wordscut/screenshots/zoom-styling.webp', width: 1400, height: 900, alt: 'A real 1.6 times screen zoom enlarges the Fieldnotes presentation in WordsCut', title: 'Bring the detail closer', caption: 'A selected screen zoom with scale, focus and timing controls.' },
    { id: 'look', src: '/wordscut/screenshots/look.webp', detail: '/wordscut/screenshots/look-detail.webp', detailWidth: 352, detailHeight: 540, width: 1400, height: 900, alt: 'WordsCut Look inspector with canvas ratio, crop and background settings beside a framed presentation', title: 'Give the frame a look', caption: 'A local presentation with indigo padding and rounded corners.' },
    { id: 'camera', src: '/wordscut/screenshots/camera-controls.webp', width: 352, height: 540, alt: 'Genuine WordsCut Camera inspector showing position, size, sync and shape controls', title: 'Compose your camera', caption: 'Inspector crop only. The synthetic camera picture did not render in this capture session.' },
    { id: 'captions', src: '/wordscut/screenshots/captions-audio.webp', detail: '/wordscut/screenshots/captions-detail.webp', detailWidth: 352, detailHeight: 540, width: 1400, height: 900, alt: 'WordsCut caption settings with font, size, spoken-word highlighting and captions in the video preview', title: 'Make every word clear', caption: 'Caption styling and spoken-word highlighting, shown in the real preview.' },
    { id: 'recording', src: '/wordscut/screenshots/screen-recording.webp', width: 960, height: 225, alt: 'WordsCut recorder with display source, camera and microphone off, frame rate and countdown settings', title: 'Start with a recording', caption: 'Real recorder setup. This dev session used the display-only fallback; window, area and system audio were unavailable.' },
    { id: 'export', src: '/wordscut/screenshots/export-dialog.webp', detail: '/wordscut/screenshots/export-detail.webp', detailWidth: 512, detailHeight: 667, width: 1400, height: 900, alt: 'WordsCut export dialog showing MP4, resolution, codec, bitrate and caption burn-in options', title: 'Finish on your Mac', caption: 'Actual export settings. No render-speed or performance claims.' },
  ],
  featuresTitle: 'From recording to final cut',
  features: [
    { icon: Type, title: 'Edit the transcript', description: 'Delete words, reorder passages, remove fillers, and shorten pauses. The connected video follows your edits, with undo and redo.' },
    { icon: FileVideo, title: 'Record or import', description: 'Import footage or use screen, window, area, camera and microphone recording controls. Recording permissions are managed by macOS; native capture validation is still in progress.' },
    { icon: Cpu, title: 'Local transcription', description: 'whisper.cpp uses Core ML and Metal on Apple Silicon. Download a speech model, then transcribe on your Mac without uploading the recording.' },
    { icon: Scissors, title: 'Shape the timeline', description: 'Trim, split, duplicate and reorder clips. Work with chapters, in–out ranges, playback quality controls and audio waveforms.' },
    { icon: Type, title: 'Captions and annotations', description: 'Add captions and annotations, adjust their timing, and include them in a video export. Use source-time privacy masks for static regions and check their coverage.' },
    { icon: FileVideo, title: 'Style the frame', description: 'Choose backgrounds, padding, corners, aspect ratios and device frames. Add zooms, follow-cursor movement and cursor styling when event data is available.' },
    { icon: FileVideo, title: 'Music and narration', description: 'Add music and voice-over tracks with fades, mute and solo controls. Export supports music ducking, loudness targets and an audio report; preview does not apply ducking.' },
    { icon: Cpu, title: 'Export your way', description: 'Export MP4, MOV, ProRes, GIF, M4A or WAV, selected ranges and audio stems. ProRes 4444 supports transparency; other formats flatten unsupported alpha.' },
    { icon: GitBranch, title: 'Projects that stay editable', description: 'Current development builds save .wordscut packages with edit decisions, snapshots and optional bundled media. Legacy .scribe projects remain supported. Existing YusafCut project files and application preferences keep their compatibility identifiers.' },
    { icon: ShieldCheck, title: 'Local by default', description: 'Media processing stays on your Mac. No telemetry or remote crash reporting. Optional CLI and MCP agent control is off by default and must be enabled in the app.' },
  ],
  howItWorksTitle: 'Make your next cut',
  howItWorks: [
    { title: 'Bring in a take', description: 'Import footage or record a take, then create its transcript locally.' },
    { title: 'Keep the story', description: 'Edit words, trim pauses, arrange clips and refine captions, framing and sound.' },
    { title: 'Export and keep editing', description: 'Render the finished video on your Mac and keep the editable project for your next revision.' },
  ],

  marketing: {
    demoLabel: 'Explore the editor',
    availability: checkoutUrl ? 'Purchase terms and delivery at checkout.' : 'Paid release in preparation. Contact us for availability.',
    captureNote: 'Real Mac application captures from development build 1.10.1. Original synthetic demo media and an authored sample transcript; features may differ from the earlier public 1.0.0 release.',
    workflowTitle: 'A story, shaped in words.',
    workflowSub: 'Find your story in the transcript. Keep the moments that matter, then make the cut your own.',
    workflow: [
      { title: 'Bring in your take', description: 'Import a video or audio file, or start with the built-in recorder.', shot: 'editor' },
      { title: 'Read. Select. Cut.', description: 'Transcribe locally, select the words you want to remove, and let the connected video follow.', shot: 'transcript' },
      { title: 'Get the timing right', description: 'Move to the timeline to split, trim and reorder clips. Your source recording stays intact.', shot: 'timeline' },
    ],
    timelineTitle: 'Words first. Frames next.',
    timelineSub: 'Make a thoughtful first cut in the transcript. Then refine it with clips, in–out ranges, chapter markers and timed effects on one timeline.',
    timelinePoints: ['Split, trim and reorder', 'In–out range editing', 'Keyboard shortcuts and undo'],
    visualsTitle: 'Give your recording presence.',
    visuals: [
      { title: 'Guide the eye', description: 'Bring a detail forward with timed screen zooms. Set the scale and focus where the story needs them.', shot: 'zoom' },
      { title: 'Set the scene', description: 'Choose your canvas, background, padding and corners. Give a simple screen recording a considered frame.', shot: 'look' },
      { title: 'Find your place', description: 'Adjust camera size, position and shape with dedicated composition controls.', shot: 'camera', note: 'Real controls shown; camera picture capture is still pending.' },
      { title: 'Let the words show', description: 'Style captions and highlight the spoken word. Add music or record voice-over, then finish the mix for export.', shot: 'captions' },
    ],
    finishTitle: 'From take to final file.',
    finishSub: 'Record a screen. Shape the story. Choose your export. Keep the whole workflow on your Mac.',
    recordTitle: 'Ready when the idea is',
    recordCopy: 'Choose a source, set a countdown and record. Camera, microphone and system audio depend on device permissions and the available recorder.',
    exportTitle: 'Your edit, ready to share',
    exportCopy: 'Export video, audio or captions. Choose MP4, MOV, ProRes, GIF, M4A or WAV, with resolution and quality controls.',
    privacyTitle: 'Your story stays yours.',
    privacyCopy: 'Your recordings and transcripts are processed on your Mac. Local transcription uses whisper.cpp with Apple Silicon acceleration.',
    privacyDetails: ['No media uploads for editing or transcription.', 'No telemetry or remote crash reporting.', 'Download a speech model first; update metadata may use the network when enabled.'],
    privacyLink: 'Read the privacy policy',
    galleryTitle: 'See the real workspace.',
    gallerySub: 'Open any capture for a closer look. Every image comes from the running Mac app.',
    capabilitiesTitle: 'Room for the whole story.',
    capabilities: [
      { title: 'Transcript', description: 'Word selection, filler removal and pause cleanup.' },
      { title: 'Timeline', description: 'Clips, chapters, ranges and timed effects.' },
      { title: 'Recording', description: 'Integrated screen, camera and audio controls.' },
      { title: 'Camera & framing', description: 'Camera composition, backgrounds and zooms.' },
      { title: 'Captions & sound', description: 'Styled captions, music and voice-over tracks.' },
      { title: 'Projects & export', description: 'Editable local packages and flexible final formats.' },
    ],
    faqTitle: 'Before your first cut.',
    faqs: [
      { q: 'Which Macs are supported?', a: 'WordsCut targets Apple Silicon Macs running macOS 13 Ventura or later. Intel Macs are not supported.' },
      { q: 'Does transcription need the cloud?', a: 'No. Download a speech model, then transcribe locally on your Mac. Model downloads and enabled update checks can use the network.' },
      { q: 'Can I record or import footage?', a: 'Both. Import existing video or audio, or use integrated recording controls. Camera, microphone and screen capture need the appropriate macOS permissions. Recorder capabilities depend on the build and available native helper.' },
      { q: 'Can I return to an edit later?', a: 'Yes. Current development builds save .wordscut packages, with optional bundled media. Legacy .scribe projects remain compatible. Linked projects still need their original media files.' },
      { q: 'What can I export?', a: 'Current development supports MP4, MOV, ProRes, GIF, M4A and WAV, plus SRT and VTT captions. Available options depend on the chosen format.' },
      { q: 'Can I buy WordsCut today?', a: checkoutUrl ? 'Use the purchase link to review the current price, terms and delivery details before paying.' : 'A paid release is in preparation. There is no public checkout on this page yet. Contact support for availability; the screenshots show development capabilities, not a promise of customer delivery.' },
    ],
    closingTitle: 'Make room for your story.',
    closingCopy: checkoutUrl ? 'A clearer cut starts with the words. Review purchase terms and delivery for WordsCut for Mac.' : 'A clearer cut starts with the words. Ask about WordsCut for Mac and the upcoming paid release.',
    supportLabel: 'Talk to support',
  },

  support: {
    email: 'owaesmirza@gmail.com',
    intro:
      'WordsCut is under active development. Email support for release questions, bug reports, feature requests or earlier-version source requests.',
    links: [
      { label: 'Purchase and release information', href: '/' },
      { label: 'Licence information', href: '/terms' },
    ],
    faqs: [
      {
        q: 'Does WordsCut upload my videos anywhere?',
        a: 'No. Media, transcripts, models, and project files all stay on your Mac. Network access is limited to model downloads and, once enabled, release update metadata.',
      },
      {
        q: 'What do I need to run it?',
        a: 'An Apple Silicon Mac running macOS 13 Ventura or later. Intel Macs are not supported. The Mac build has been signed and notarized. A paid release is being prepared; contact support for availability and installation questions.',
      },
      { q: 'Is WordsCut available in the Mac App Store?', a: 'Not yet. A separate store build is being prepared; sandbox, persistent file access, capture and licensing checks remain open.' },
      { q: 'What happened to YusafCut?', a: 'YusafCut is now WordsCut. Existing .scribe projects stay compatible. The old product URLs redirect here.' },
      {
        q: 'Will WordsCut be a paid product?',
        a: 'Yes. A paid release is being prepared. Pricing, purchase terms and customer delivery will be shown before checkout opens. Existing recipients of the earlier AGPL-licensed 1.0.0 release retain their licence rights; contact support for the matching source files.',
      },
    ],
  },

  privacy: {
    title: 'Privacy Policy',
    lastUpdated: '26 October 2026',
    seoDescription:
      'WordsCut privacy: local-first video editing with no uploads, no telemetry, and no analytics.',
    summary:
      'WordsCut is local-first. Your media is not uploaded, transcripts stay on your machine, and there is no telemetry, analytics, or remote crash reporting.',
    sections: [
      {
        heading: 'Local-first by design',
        blocks: [
          { p: 'WordsCut runs entirely on your Mac:' },
          {
            ul: [
              'Your media is not uploaded.',
              'Generated transcripts stay on your machine.',
              'There is no telemetry, analytics, or remote crash reporting.',
              'Network access is limited to model downloads and, once enabled, release update metadata.',
            ],
          },
        ],
      },
      {
        heading: 'Project files',
        blocks: [
          {
            p: 'Current development builds save local .wordscut project packages with edit decisions, metadata, snapshots and optional bundled media. Earlier .scribe bundles remain supported. Linked projects reference original media; keep those files available and backed up. Optional agent integrations can access project information when you explicitly enable them.',
          },
        ],
      },
      { heading: 'Permissions and network requests', blocks: [{ p: 'macOS requests screen recording, camera or microphone access when needed. Model downloads and release links connect to third-party services. Optional agent connections are off by default. This product website is hosted on GitHub Pages. Visiting this site or an external link sends ordinary connection information to the hosting or linked provider.' }] },
      {
        heading: 'Security reporting',
        blocks: [
          {
            p: 'Please do not open public issues for vulnerabilities. Email [owaesmirza@gmail.com](mailto:owaesmirza@gmail.com) privately with vulnerability details; do not include private recordings or credentials.',
          },
        ],
      },
      {
        heading: 'Contact',
        blocks: [
          {
            p: 'Questions about privacy? Email [owaesmirza@gmail.com](mailto:owaesmirza@gmail.com).',
          },
        ],
      },
    ],
  },

  terms: {
    title: 'Terms & Conditions',
    lastUpdated: '22 October 2026',
    seoDescription: 'WordsCut release and purchase information, earlier-version licence rights, and support.',
    summary:
      'WordsCut is preparing a paid release. Checkout, pricing and purchase terms are not yet available. The earlier 1.0.0 release remains subject to its existing licence.',
    sections: [
      {
        heading: 'Earlier release licence',
        blocks: [
          {
            p: 'The earlier WordsCut 1.0.0 release was provided under [AGPL-3.0-or-later](/wordscut/legacy-AGPL-3.0.txt). Removing the former distribution repository does not revoke those rights. Existing recipients can contact [support](mailto:owaesmirza@gmail.com?subject=WordsCut%201.0.0%20source) for the matching application and dependency sources at no additional charge. A paid release does not automatically change earlier licences.',
          },
        ],
      },
      {
        heading: 'Purchase availability',
        blocks: [
          {
            p: 'The paid launch is in preparation. No price, subscription, refund policy, or proprietary licence is being offered by this page yet. Purchase terms and delivery details must be shown before payment. Keep backups of your source media and projects.',
          },
        ],
      },
      {
        heading: 'Trademarks and name',
        blocks: [
          {
            p: 'Availability of the source code does not grant rights to use the WordsCut name or design assets outside what the license permits.',
          },
        ],
      },
      {
        heading: 'Changes',
        blocks: [
          {
            p: 'The project is under active development; features may change, and packaging still has rough edges. Contact support for current release status.',
          },
        ],
      },
      {
        heading: 'Contact',
        blocks: [
          {
            p: 'Questions about these terms or an earlier release? Email [owaesmirza@gmail.com](mailto:owaesmirza@gmail.com).',
          },
        ],
      },
    ],
  },
}

// Vite's base keeps image requests inside the project on the temporary Pages URL.
const assetBase = import.meta.env?.BASE_URL || '/'
const assetUrl = path => `${assetBase}${path.replace(/^\//, '')}`
wordsCut.icon = assetUrl(wordsCut.icon)
wordsCut.socialPreview = assetUrl(wordsCut.socialPreview)
wordsCut.screenshots = wordsCut.screenshots.map(shot => ({
  ...shot, src: assetUrl(shot.src), ...(shot.detail ? { detail: assetUrl(shot.detail) } : {}),
}))
