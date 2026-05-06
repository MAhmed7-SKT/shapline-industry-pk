import { getProduct, getCategory } from "@/data/catalog";
import { useEffect, useState } from "react";

const ANGLES = [0, 15, 30, 45, 60, 75];

function angleFor(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return ANGLES[h % ANGLES.length];
}

type Props = {
  productId: string;
  className?: string;
};

/** Real product photo or category cover as fallback. */
export default function ProductImage({ productId, className }: Props) {
  const [product, setProduct] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Extract index if present (e.g., "pro-barber-blue-0")
  const match = productId.match(/-(\d+)$/);
  const baseId = match ? productId.slice(0, -match[0].length) : productId;
  const imgIndex = match ? parseInt(match[1], 10) : 0;

  useEffect(() => {
    async function load() {
      try {
        const p = await getProduct(baseId);
        if (p) {
          setProduct(p);
          const c = await getCategory(p.categorySlug);
          setCategory(c);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    const refresh = () => {
      setLoading(true);
      load();
    };
    load();

    if (typeof window !== "undefined") {
      window.addEventListener("storage", refresh);
      window.addEventListener("shapline_products_updated", refresh as EventListener);
      window.addEventListener("productsUpdated", refresh as EventListener);
      return () => {
        window.removeEventListener("storage", refresh);
        window.removeEventListener("shapline_products_updated", refresh as EventListener);
        window.removeEventListener("productsUpdated", refresh as EventListener);
      };
    }
  }, [baseId]);

  if (loading) return <div className="w-full h-full bg-slate-dark/20 animate-pulse" />;
  
  // Try to get the specific image from the product's images array
  const productImg = product?.images?.[imgIndex] || product?.images?.[0];
  
  // Fallback to category cover if product or product images are missing
  const cover = productImg || category?.cover;
    
  const angle = productImg ? 0 : angleFor(productId); // No rotation for actual product images

  return (
    <div className={`relative w-full h-full bg-white grid place-items-center overflow-hidden ${className ?? ""}`}>
      {cover ? (
        <img
          src={cover}
          alt=""
          loading="lazy"
          className={`w-full h-full object-contain transition-transform duration-700 ${productImg ? "" : "p-6"}`}
          style={angle ? { transform: `rotate(${angle}deg)` } : {}}
        />
      ) : null}
    </div>
  );
}
