export type PropertyType = 'House' | 'Townhouse' | 'Flat' | 'Stand' | 'Commercial';
export type ListingType = 'Sale' | 'Rent' | 'Boarding' | 'Development';

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  suburb: string;
  city: string;
  type: PropertyType;
  listingType: ListingType;
  bedrooms: number;
  bathrooms: number;
  size?: number; // sqm
  image: string;
  isFeatured?: boolean;
  isVerified?: boolean;
  features: string[];
  // Boarding specific
  universityNearby?: string;
  distanceFromCampus?: string;
  wifiIncluded?: boolean;
  mealsIncluded?: boolean;
}
