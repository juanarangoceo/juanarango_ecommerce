export type B2BSolution = {
  _id: string;
  title: string;
  slug: { current: string };
  niche: string;
  cardImage: any;
  cardImageUrl?: string;
  cardDescription: string;
  accentColor: string;
  ctaLabel: string;
  isActive: boolean;
  isFeatured: boolean;
  order: number;
  
  // Dedicated Page Fields
  heroTitle?: string;
  heroSubtitle?: string;
  whatYouGet?: {
    title: string;
    description: string;
    icon: string;
  }[];
  targetAudience?: string;
  pageImage?: any;
  pageImageUrl?: string;
  metaTitle?: string;
  metaDescription?: string;
};

export const ALL_B2B_SOLUTIONS_QUERY = `*[
  _type == "b2bSolution" 
  && isActive == true 
  && defined(slug.current)
]|order(order asc) {
  _id,
  title,
  slug,
  niche,
  cardDescription,
  accentColor,
  ctaLabel,
  isFeatured,
  order,
  "cardImageUrl": cardImage.asset->url
}`;

export const B2B_SOLUTION_BY_SLUG_QUERY = `*[
  _type == "b2bSolution" 
  && slug.current == $slug
][0] {
  _id,
  title,
  niche,
  accentColor,
  heroTitle,
  heroSubtitle,
  whatYouGet,
  targetAudience,
  "pageImageUrl": pageImage.asset->url,
  metaTitle,
  metaDescription
}`;

export const B2B_ALL_SLUGS_QUERY = `*[
  _type == "b2bSolution" 
  && defined(slug.current)
] {
  "slug": slug.current
}`;
