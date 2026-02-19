// ===== TYPES =====

export type Pricing = 'Free' | 'Freemium' | 'Paid'

export type CategoryId =
  | 'all'
  | 'chatbot'
  | 'writing'
  | 'image-gen'
  | 'video'
  | 'audio'
  | 'coding'
  | 'productivity'
  | 'design'
  | 'marketing'

export type AppToolSanity = {
  _id: string
  appName: string
  slug: { current: string }
  description: string
  longDescription: string
  category: Exclude<CategoryId, 'all'>
  pricing: Pricing
  priceDetail?: string
  rating?: number
  features: string[]
  pros: string[]
  cons: string[]
  platforms: string[]
  iconBg: string
  websiteUrl: string
  affiliateUrl?: string
  rank: number
  isFeatured: boolean
  isTrending: boolean
  _updatedAt: string
}

// ===== CATEGORIES =====

export const CATEGORIES = [
  { id: 'all', label: 'Todas', icon: 'LayoutGrid', color: 'slate' },
  { id: 'chatbot', label: 'Chatbots', icon: 'MessageSquare', color: 'emerald' },
  { id: 'writing', label: 'Escritura', icon: 'PenTool', color: 'fuchsia' },
  { id: 'image-gen', label: 'Imagen', icon: 'Image', color: 'violet' },
  { id: 'video', label: 'Video', icon: 'Clapperboard', color: 'orange' },
  { id: 'audio', label: 'Audio', icon: 'Music', color: 'rose' },
  { id: 'coding', label: 'Código', icon: 'Code', color: 'sky' },
  { id: 'productivity', label: 'Productividad', icon: 'Zap', color: 'amber' },
  { id: 'design', label: 'Diseño', icon: 'Palette', color: 'cyan' },
  { id: 'marketing', label: 'Marketing', icon: 'Megaphone', color: 'lime' },
] as const

// ===== GROQ QUERIES =====

export const ALL_APP_TOOLS_QUERY = `*[
  _type == "appTool"
  && defined(slug.current)
]|order(coalesce(rank, 999) asc, _updatedAt desc) {
  _id,
  appName,
  slug,
  description,
  longDescription,
  category,
  pricing,
  priceDetail,
  rating,
  features,
  pros,
  cons,
  platforms,
  iconBg,
  websiteUrl,
  affiliateUrl,
  rank,
  isFeatured,
  isTrending,
  _updatedAt
}`

export const FEATURED_APP_QUERY = `*[
  _type == "appTool"
  && defined(slug.current)
  && isFeatured == true
]|order(coalesce(rank, 999) asc, _updatedAt desc)[0] {
  _id,
  appName,
  slug,
  description,
  longDescription,
  category,
  pricing,
  priceDetail,
  rating,
  features,
  pros,
  cons,
  platforms,
  iconBg,
  websiteUrl,
  affiliateUrl,
  rank,
  isFeatured,
  isTrending,
  _updatedAt
}`

export const TRENDING_APPS_QUERY = `*[
  _type == "appTool"
  && defined(slug.current)
  && isTrending == true
]|order(coalesce(rank, 999) asc, _createdAt desc)[0...8] {
  _id,
  appName,
  slug,
  description,
  category,
  pricing,
  priceDetail,
  rating,
  iconBg,
  websiteUrl,
  affiliateUrl,
  rank,
  _updatedAt
}`

export const APP_TOOL_BY_SLUG_QUERY = `*[
  _type == "appTool"
  && slug.current == $slug
][0] {
  _id,
  appName,
  slug,
  description,
  longDescription,
  category,
  pricing,
  priceDetail,
  rating,
  features,
  pros,
  cons,
  platforms,
  iconBg,
  websiteUrl,
  affiliateUrl,
  rank,
  isFeatured,
  isTrending,
  _updatedAt,
  "relatedApps": *[
    _type == "appTool"
    && slug.current != $slug
    && category == ^.category
    && defined(slug.current)
  ]|order(rank asc)[0...3] {
    _id,
    appName,
    slug,
    description,
    category,
    pricing,
    priceDetail,
    rating,
    iconBg,
    websiteUrl,
    affiliateUrl,
    rank,
    _updatedAt
  }
}`

export const APP_TOOLS_COUNT_QUERY = `count(*[_type == "appTool" && defined(slug.current)])`

export const APP_TOOLS_SITEMAP_QUERY = `*[
  _type == "appTool"
  && defined(slug.current)
] {
  "slug": slug.current,
  _updatedAt
}`

// ===== HELPERS =====

export function getCategoryLabel(categoryId: string): string {
  return CATEGORIES.find((c) => c.id === categoryId)?.label ?? categoryId
}

export function getAppUrl(app: { websiteUrl: string; affiliateUrl?: string }): string {
  const base = app.affiliateUrl || app.websiteUrl
  const separator = base.includes('?') ? '&' : '?'
  return `${base}${separator}ref=juanarango`
}
