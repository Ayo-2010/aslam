import { onMounted, onUnmounted, watch, type Ref } from 'vue'
import { useRoute } from 'vue-router'

const setMeta = (attr: 'name' | 'property', key: string, content: string): void => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const setLink = (rel: string, href: string): void => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

let structuredData: HTMLScriptElement | null = null

export interface SeoOverrides {
  title?: Ref<string | undefined> | string
  description?: Ref<string | undefined> | string
}

const isRef = <T>(value: Ref<T> | T | undefined): value is Ref<T> =>
  typeof value === 'object' && value !== null && 'value' in value

const resolve = <T>(value: Ref<T> | T | undefined): T | undefined =>
  isRef(value) ? value.value : value

/**
 * Applies per-route title, description, canonical URL, Open Graph and
 * Twitter metadata. A single source of truth for SEO across the site.
 */
export const useSeo = (overrides: SeoOverrides = {}): void => {
  const route = useRoute()

  const apply = (): void => {
    const title =
      resolve(overrides.title) ?? (route.meta.title as string | undefined) ?? 'Aslam School'
    const description =
      resolve(overrides.description) ??
      (route.meta.description as string | undefined) ??
      'Aslam School — empowering tomorrow’s leaders through academic excellence, character development and modern learning.'
    const noIndex = route.meta.noIndex === true
    const url = `${window.location.origin}${route.path}`
    const image = `${window.location.origin}/og-cover.svg`

    document.title = title
    setMeta('name', 'description', description)
    setMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow')
    setLink('canonical', url)

    setMeta('property', 'og:site_name', 'Aslam School')
    setMeta('property', 'og:type', route.name?.toString().includes('detail') ? 'article' : 'website')
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', image)

    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', image)

    structuredData?.remove()
    structuredData = document.createElement('script')
    structuredData.type = 'application/ld+json'
    structuredData.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'School',
      name: 'Aslam School',
      url: window.location.origin,
      slogan: "Empowering Tomorrow's Leaders",
      address: {
        '@type': 'PostalAddress',
        streetAddress: '12 Education Avenue',
        addressLocality: 'Lagos',
        addressCountry: 'NG',
      },
      telephone: '+234 800 000 0000',
      email: 'info@aslamschool.edu',
    })
    document.head.appendChild(structuredData)
  }

  onMounted(apply)
  watch(() => route.fullPath, apply)
  if (isRef(overrides.title)) watch(overrides.title, apply)
  if (isRef(overrides.description)) watch(overrides.description, apply)

  onUnmounted(() => {
    structuredData?.remove()
    structuredData = null
  })
}
