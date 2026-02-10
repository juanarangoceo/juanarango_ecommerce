
export interface TOCItem {
  id: string
  text: string
  level: number
}

export function parseTOC(content: string): TOCItem[] {
  // Simple regex to find headings in markdown
  // Matches # Heading or ## Heading
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const items: TOCItem[] = []
  let match
  
  // Reset regex index
  headingRegex.lastIndex = 0

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    // Create a slug for the id
    const id = text
      .toString()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    items.push({ id, text, level })
  }

  return items
}
