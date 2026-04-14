export type B2BSolution = {
  _id: string;
  title: string;
  link: string;
  niche: string;
  cardImage: any;
  cardImageUrl?: string;
  cardDescription: string;
  accentColor: string;
  ctaLabel: string;
  isActive: boolean;
  isFeatured: boolean;
  order: number;
};

export const ALL_B2B_SOLUTIONS_QUERY = `*[
  _type == "b2bSolution" 
  && isActive == true 
  && defined(link)
]|order(order asc) {
  _id,
  title,
  link,
  niche,
  cardDescription,
  accentColor,
  ctaLabel,
  isFeatured,
  order,
  "cardImageUrl": cardImage.asset->url
}`;

export const B2B_SOLUTION_BY_LINK_QUERY = `*[
  _type == "b2bSolution" 
  && link == $link
][0] {
  _id,
  title,
  link,
  niche,
  cardDescription,
  accentColor,
  ctaLabel,
  isFeatured,
  order,
  "cardImageUrl": cardImage.asset->url
}`;


