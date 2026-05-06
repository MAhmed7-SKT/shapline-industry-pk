import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Upload, X, Loader2, CheckCircle2, Plus, Trash2, PlusCircle, List, ExternalLink, Pencil } from "lucide-react";
import { categories, type Product, getProducts, createProduct, deleteProduct, updateProduct } from "@/data/catalog";
import PageHeader from "@/components/PageHeader";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

const CLOUDINARY_UPLOAD_PRESET = "shapline_upload";
const CLOUDINARY_CLOUD_NAME = "dlvfx1rne";
const CLOUDINARY_FOLDER = "products";

export function AdminDashboard() {
  const { isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState<"add" | "list">("list");
  
  // Form State
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    artNo: "",
    categorySlug: categories[0].slug,
    description: "",
    material: "Japanese Stainless Steel",
    featured: false,
    sizes: ["5.5\"", "6.0\""],
  });

  // List State
  const [products, setProducts] = useState<Product[]>([]);
  const [fetchLoading, setFetchLoading] = useState(false);

  useEffect(() => {
    if (activeTab === "list" && isLoggedIn) {
      fetchProducts();
    }
  }, [activeTab, isLoggedIn]);

  const fetchProducts = async () => {
    setFetchLoading(true);
    try {
      const items = await getProducts();
      setProducts(items);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Error deleting product.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages((prev) => [...prev, ...files]);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    setExistingImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleSize = (size: string) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size) 
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId && images.length === 0) return alert("Please upload at least one image.");
    
    setLoading(true);
    try {
      const uploadedUrls =
        images.length > 0
          ? await Promise.all(
              images.map(async (file) => {
                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
                data.append("folder", CLOUDINARY_FOLDER);

                const res = await fetch(
                  `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
                  { method: "POST", body: data }
                );
                const json = await res.json();
                if (!res.ok) throw new Error(json.error?.message || "Upload failed");
                return json.secure_url as string;
              })
            )
          : [];

      const finalImageUrls = editingId ? [...existingImageUrls, ...uploadedUrls] : uploadedUrls;
      if (finalImageUrls.length === 0) throw new Error("Please upload at least one image.");

      if (editingId) {
        await updateProduct(editingId, { ...formData, images: finalImageUrls });
      } else {
        await createProduct({
          ...formData,
          images: finalImageUrls,
        });
      }

      setSuccess(true);
      setImages([]);
      setPreviews([]);
      setExistingImageUrls([]);
      setEditingId(null);
      setFormData({
        name: "",
        artNo: "",
        categorySlug: categories[0].slug,
        description: "",
        material: "Japanese Stainless Steel",
        featured: false,
        sizes: ["5.5\"", "6.0\""],
      });
      
      setTimeout(() => {
        setSuccess(false);
        setActiveTab("list");
      }, 2000);
    } catch (error: any) {
      console.error("Upload error:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (p: Product) => {
    setEditingId(p.id);
    setExistingImageUrls(p.images ?? []);
    setImages([]);
    setPreviews([]);
    setSuccess(false);
    setFormData({
      name: p.name ?? "",
      artNo: p.artNo ?? "",
      categorySlug: p.categorySlug ?? categories[0].slug,
      description: p.description ?? "",
      material: p.material ?? "Japanese Stainless Steel",
      featured: !!p.featured,
      sizes: p.sizes?.length ? p.sizes : ["5.5\"", "6.0\""],
    });
    setActiveTab("add");
  };

  return (
    <div className="pb-20 bg-charcoal min-h-screen">
      <PageHeader title="ADMIN DASHBOARD" subtitle="Manage your global instrument catalog" />

      <div className="max-w-[1440px] mx-auto px-6 py-12">
        {/* Tabs */}
        <div className="flex gap-px bg-white/10 border border-white/10 mb-12">
          <button 
            onClick={() => setActiveTab("list")}
            className={`flex-1 py-4 flex items-center justify-center gap-2 font-bebas text-xl tracking-widest transition-colors ${activeTab === "list" ? "bg-electric text-white" : "bg-slate-dark text-steel hover:bg-white/5"}`}
          >
            <List className="size-5" /> View Products
          </button>
          <button 
            onClick={() => setActiveTab("add")}
            className={`flex-1 py-4 flex items-center justify-center gap-2 font-bebas text-xl tracking-widest transition-colors ${activeTab === "add" ? "bg-electric text-white" : "bg-slate-dark text-steel hover:bg-white/5"}`}
          >
            <PlusCircle className="size-5" /> Add New Product
          </button>
        </div>

        {activeTab === "add" ? (
          <div className="max-w-4xl mx-auto">
            {success && (
              <div className="mb-8 p-4 bg-green-500/10 border border-green-500/20 text-green-500 flex items-center gap-3 rounded">
                <CheckCircle2 className="size-5" />
                <span className="font-bold uppercase tracking-widest text-sm">
                  {editingId ? "Product Updated Successfully!" : "Product Added Successfully!"}
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8 bg-slate-dark p-8 border border-white/10">
              {/* Images */}
              <div className="space-y-4">
                <label className="block text-[10px] uppercase tracking-[0.3em] text-steel/60">Upload Images (Cloudinary)</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {existingImageUrls.map((src, i) => (
                    <div key={`existing-${i}`} className="relative aspect-square border border-white/10 overflow-hidden group">
                      <img src={src} className="w-full h-full object-contain bg-white" alt="Existing" />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(i)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  ))}
                  {previews.map((src, i) => (
                    <div key={i} className="relative aspect-square border border-white/10 overflow-hidden group">
                      <img src={src} className="w-full h-full object-contain bg-white" alt="Preview" />
                      <button type="button" onClick={() => removeImage(i)} className="absolute top-2 right-2 p-1 bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"><X className="size-4" /></button>
                    </div>
                  ))}
                  <label className="aspect-square border-2 border-dashed border-white/10 hover:border-electric transition-colors cursor-pointer flex flex-col items-center justify-center gap-2 text-steel hover:text-electric">
                    <Plus className="size-8" />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-center px-2">Add Photos</span>
                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-steel/60">Product Name</label>
                  <input required type="text" className="w-full bg-charcoal border border-white/10 px-4 py-3 text-white focus:border-electric outline-none" value={formData.name} onChange={e => setFormData(prev => ({...prev, name: e.target.value}))} />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-steel/60">Art No</label>
                  <input required type="text" className="w-full bg-charcoal border border-white/10 px-4 py-3 text-white focus:border-electric outline-none" value={formData.artNo} onChange={e => setFormData(prev => ({...prev, artNo: e.target.value}))} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-steel/60">Category</label>
                  <select className="w-full bg-charcoal border border-white/10 px-4 py-3 text-white focus:border-electric outline-none" value={formData.categorySlug} onChange={e => setFormData(prev => ({...prev, categorySlug: e.target.value}))}>
                    {categories.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-steel/60">Material</label>
                  <input type="text" className="w-full bg-charcoal border border-white/10 px-4 py-3 text-white focus:border-electric outline-none" value={formData.material} onChange={e => setFormData(prev => ({...prev, material: e.target.value}))} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-[0.3em] text-steel/60">Sizes (Check to Add)</label>
                <div className="flex flex-wrap gap-3">
                  {["3.5\"", "4.0\"", "4.5\"", "5.0\"", "5.5\"", "6.0\"", "6.5\"", "7.0\""].map(s => (
                    <button key={s} type="button" onClick={() => toggleSize(s)} className={`px-4 py-2 text-[10px] font-mono border transition-all ${formData.sizes.includes(s) ? "bg-electric border-electric text-white" : "border-white/10 text-steel hover:border-white/30"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-[0.3em] text-steel/60">Description</label>
                <textarea required rows={4} className="w-full bg-charcoal border border-white/10 px-4 py-3 text-white focus:border-electric outline-none" value={formData.description} onChange={e => setFormData(prev => ({...prev, description: e.target.value}))} />
              </div>

              <div className="flex items-center gap-8">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="size-4 accent-electric" checked={formData.featured} onChange={e => setFormData(prev => ({...prev, featured: e.target.checked}))} />
                  <span className="text-[10px] uppercase tracking-widest text-steel group-hover:text-white transition-colors">Featured on Home</span>
                </label>
              </div>

              <button disabled={loading} type="submit" className="w-full bg-electric hover:bg-electric-glow text-white py-4 font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 disabled:opacity-50 transition-all">
                {loading ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  <>
                    <Upload className="size-5" /> {editingId ? "Update Product" : "Save Product"}
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-4">
            {fetchLoading ? (
              <div className="flex flex-col items-center justify-center py-24 text-steel">
                <Loader2 className="size-12 animate-spin text-electric mb-4" />
                <p className="font-bebas text-2xl tracking-widest uppercase">Fetching Catalog...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-24 border border-dashed border-white/10 text-steel uppercase tracking-widest text-sm">No products found</div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {products.map((p) => (
                  <div key={p.id} className="bg-slate-dark border border-white/10 p-4 flex items-center gap-6 group hover:border-white/20 transition-all">
                    <div className="size-20 bg-white p-1 overflow-hidden flex-shrink-0">
                      <img src={p.images[0]} className="w-full h-full object-contain" alt="" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-mono text-electric uppercase tracking-widest mb-1">{p.artNo}</div>
                      <h4 className="font-bebas text-xl text-white truncate uppercase">{p.name}</h4>
                      <div className="text-[10px] text-steel/60 uppercase tracking-widest">{p.categorySlug}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => startEdit(p)}
                        className="p-2 text-steel hover:text-electric transition-colors"
                        title="Edit Product"
                      >
                        <Pencil className="size-5" />
                      </button>
                      <a href={`/products/${p.categorySlug}/${p.id}`} target="_blank" className="p-2 text-steel hover:text-electric transition-colors" title="View Public Page">
                        <ExternalLink className="size-5" />
                      </a>
                      <button onClick={() => handleDelete(p.id)} className="p-2 text-steel hover:text-red-500 transition-colors" title="Delete Product">
                        <Trash2 className="size-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
