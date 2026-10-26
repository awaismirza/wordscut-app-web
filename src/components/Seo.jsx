import { useEffect } from 'react'
import { pageMetadata } from '../data/pages.js'

// Update the prebuilt head in place when the client router changes pages.
export function Seo({ path = '/', imageAlt }) {
  const meta = pageMetadata[path] || pageMetadata['/']
  useEffect(() => {
    document.title = meta.title
    const tags = [
      ['meta', 'name', 'description', meta.description],
      ['link', 'rel', 'canonical', meta.canonical],
      ['meta', 'property', 'og:title', meta.title],
      ['meta', 'property', 'og:description', meta.description],
      ['meta', 'property', 'og:url', meta.canonical],
      ['meta', 'property', 'og:type', 'website'],
      ['meta', 'property', 'og:site_name', 'WordsCut'],
      ['meta', 'property', 'og:image', meta.image],
      ['meta', 'property', 'og:image:width', '1200'],
      ['meta', 'property', 'og:image:height', '630'],
      ['meta', 'name', 'twitter:card', 'summary_large_image'],
      ['meta', 'name', 'twitter:title', meta.title],
      ['meta', 'name', 'twitter:description', meta.description],
      ['meta', 'name', 'twitter:image', meta.image],
    ]
    if (imageAlt) tags.push(['meta', 'property', 'og:image:alt', imageAlt])
    else document.head.querySelector('meta[property="og:image:alt"]')?.remove()
    for (const [type, attribute, key, value] of tags) {
      let element = document.head.querySelector(`${type}[${attribute}="${key}"]`)
      if (!element) {
        element = document.createElement(type)
        element.setAttribute(attribute, key)
        document.head.append(element)
      }
      element.setAttribute(type === 'link' ? 'href' : 'content', value)
    }
  }, [meta, imageAlt])
  return null
}
