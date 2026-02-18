export type ProductVariant = {
  name: string;
  options: string[];
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  rating: number;
  stock: number;
  variants?: ProductVariant[];
  createdAt: string;
  tags?: string[];
};

