import proBarberImg from "@/assets/cat-pro-barber-new.jpg";
import barberSetImg from "@/assets/cat-barber-set.jpg";
import qualityImg from "@/assets/cat-quality.jpg";
import stylishImg from "@/assets/cat-stylish.jpg";
import beautyImg from "@/assets/cat-beauty.jpg";
import classicImg from "@/assets/cat-classic.jpg";
import smallImg from "@/assets/cat-small.jpg";
import haircutImg from "@/assets/cat-haircut.jpg";
import dragonImg from "@/assets/cat-dragon.jpg";

export type Category = {
  slug: string;
  name: string;
  cover: string;
  blurb: string;
};

export type Product = {
  id: string;
  artNo: string;
  name: string;
  categorySlug: string;
  images: string[];
  sizes: string[];
  material: string;
  description: string;
  featured?: boolean;
  createdAt?: number;
};

const PRODUCTS_STORAGE_KEY = "shapline_products_v1";
const PRODUCTS_UPDATED_EVENT = "shapline_products_updated";
const PRODUCTS_UPDATED_PUBLIC_EVENT = "productsUpdated";

function readProductsFromStorage(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Product[];
  } catch {
    return [];
  }
}

function writeProductsToStorage(products: Product[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  window.dispatchEvent(new Event(PRODUCTS_UPDATED_EVENT));
  window.dispatchEvent(new Event(PRODUCTS_UPDATED_PUBLIC_EVENT));
}

function newId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return (crypto as Crypto).randomUUID();
  }
  return `p_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function byCreatedAtDesc(a: Product, b: Product) {
  const ta = a.createdAt ?? 0;
  const tb = b.createdAt ?? 0;
  return tb - ta;
}

export const categories: Category[] = [
  {
    slug: "professional-barber-scissors",
    name: "Professional Barber Scissors",
    cover: proBarberImg,
    blurb: "Hand-finished offset barber shears for working stylists.",
  },
  {
    slug: "barber-set",
    name: "Barber Set",
    cover: barberSetImg,
    blurb: "Complete barber kits with shears, comb and leather pouch.",
  },
  {
    slug: "quality-scissors",
    name: "Quality Scissors",
    cover: qualityImg,
    blurb: "Premium mirror-polished blades inspected for export.",
  },
  {
    slug: "stylish-scissors",
    name: "Stylish Scissors",
    cover: stylishImg,
    blurb: "Rainbow titanium and color-coated decorative scissors.",
  },
  {
    slug: "beauty-scissors",
    name: "Beauty Scissors",
    cover: beautyImg,
    blurb: "Elegant thin-blade beauty and brow scissors.",
  },
  {
    slug: "scissors",
    name: "Scissors",
    cover: classicImg,
    blurb: "Classic straight standard scissors for everyday use.",
  },
  {
    slug: "small-scissors",
    name: "Small Scissors",
    cover: smallImg,
    blurb: "Cuticle and embroidery scissors with fine precision tips.",
  },
  {
    slug: "hair-cutting-scissors",
    name: "Hair Cutting Scissors",
    cover: haircutImg,
    blurb: "Long-blade professional hair cutting shears.",
  },
  {
    slug: "dragon-handle-scissors",
    name: "Dragon Handle Scissors",
    cover: dragonImg,
    blurb: "Ornate decorative dragon-handle artisan scissors.",
  },
];

export async function getCategories() {
  // We keep the static categories for structure but they could also be moved to Firestore
  return categories;
}

export async function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export async function getProducts() {
  return readProductsFromStorage().slice().sort(byCreatedAtDesc);
}

export async function getFeaturedProducts() {
  return readProductsFromStorage()
    .filter((p) => !!p.featured)
    .slice()
    .sort(byCreatedAtDesc);
}

export async function getProduct(id: string) {
  return readProductsFromStorage().find((p) => p.id === id) ?? null;
}

export async function productsByCategory(slug: string) {
  return readProductsFromStorage()
    .filter((p) => p.categorySlug === slug)
    .slice()
    .sort(byCreatedAtDesc);
}

export async function createProduct(input: Omit<Product, "id">) {
  const products = readProductsFromStorage();
  const created: Product = {
    id: newId(),
    ...input,
    createdAt: Date.now(),
  };
  products.push(created);
  writeProductsToStorage(products);
  return created;
}

export async function deleteProduct(id: string) {
  const products = readProductsFromStorage().filter((p) => p.id !== id);
  writeProductsToStorage(products);
}

export async function updateProduct(id: string, patch: Partial<Omit<Product, "id">>) {
  const products = readProductsFromStorage();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  const updated: Product = {
    ...products[idx],
    ...patch,
    id,
  };
  products[idx] = updated;
  writeProductsToStorage(products);
  return updated;
}
