import proBarberImg from "@/assets/cat-pro-barber-new.jpg";
import barberSetImg from "@/assets/cat-barber-set.jpg";
import qualityImg from "@/assets/cat-quality.jpg";
import stylishImg from "@/assets/cat-stylish.jpg";
import beautyImg from "@/assets/cat-beauty.jpg";
import classicImg from "@/assets/cat-classic.jpg";
import smallImg from "@/assets/cat-small.jpg";
import haircutImg from "@/assets/cat-haircut.jpg";
import dragonImg from "@/assets/cat-dragon.jpg";

import { db } from "@/lib/firebase";
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  deleteDoc, 
  updateDoc, 
  query, 
  orderBy, 
  where, 
  getDoc,
  serverTimestamp
} from "firebase/firestore";

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

const PRODUCTS_COLLECTION = "products";

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
  return categories;
}

export async function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export async function getProducts() {
  try {
    const q = query(collection(db, PRODUCTS_COLLECTION), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getFeaturedProducts() {
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION), 
      where("featured", "==", true),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

export async function getProduct(id: string) {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Product;
    }
    return null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function productsByCategory(slug: string) {
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION), 
      where("categorySlug", "==", slug),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
}

export async function createProduct(input: Omit<Product, "id">) {
  try {
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
      ...input,
      createdAt: Date.now(), // Using Date.now() for consistency with existing sorting logic
    });
    return { id: docRef.id, ...input } as Product;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

export async function deleteProduct(id: string) {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

export async function updateProduct(id: string, patch: Partial<Omit<Product, "id">>) {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await updateDoc(docRef, patch);
    const updatedSnap = await getDoc(docRef);
    return { id: updatedSnap.id, ...updatedSnap.data() } as Product;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}
