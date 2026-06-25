import type { Product } from "@/types";
import sofa from "@/assets/p-sofa.jpg";
import chair from "@/assets/p-chair.jpg";
import bed from "@/assets/p-bed.jpg";
import dining from "@/assets/p-dining.jpg";
import wardrobe from "@/assets/p-wardrobe.jpg";
import desk from "@/assets/p-desk.jpg";

const img: Record<string, string> = { sofa, chair, bed, dining, wardrobe, desk };

export const products: Product[] = [
  {
    id: "p1", slug: "emerald-chesterfield-sofa",
    title: "Emerald Chesterfield Sofa",
    subtitle: "Hand-tufted velvet, solid walnut frame",
    category: "sofas", price: 89990, mrp: 124990, rating: 4.8, reviews: 312,
    image: img.sofa, colors: ["#1B3022", "#2A2A2A", "#D4A373"],
    material: "Italian cotton velvet, kiln-dried walnut",
    craftsmanship: "Hand-tufted by master upholsterers in Jodhpur",
    dimensions: "L 2200 × D 920 × H 780 mm",
    care: "Vacuum weekly. Spot-clean with mild soap.",
    description: "An heirloom-grade Chesterfield reimagined for the modern home. Deep button-tufting, scroll arms and a forest-green velvet that ages beautifully.",
    inStock: true, isNew: true, isBestSeller: true, collection: "Heritage",
  },
  {
    id: "p2", slug: "boucle-lounge-chair", title: "Boucle Lounge Chair",
    subtitle: "Sculpted form in ivory boucle",
    category: "chairs", price: 34990, mrp: 44990, rating: 4.7, reviews: 184,
    image: img.chair, colors: ["#F5F2ED", "#2A2A2A"],
    material: "Belgian boucle, solid oak legs",
    craftsmanship: "Single-cushion construction, hand-finished",
    dimensions: "L 760 × D 820 × H 760 mm",
    care: "Brush gently. Avoid direct sunlight.",
    description: "A quiet sculpture for the reading corner. Its low arc invites you in and never lets go.",
    inStock: true, isNew: true, collection: "Atelier",
  },
  {
    id: "p3", slug: "walnut-platform-bed", title: "Walnut Platform Bed — King",
    subtitle: "Solid walnut, linen headboard",
    category: "beds", price: 119990, mrp: 159990, rating: 4.9, reviews: 247,
    image: img.bed, colors: ["#6B3A1E", "#2A2A2A"],
    material: "Solid American walnut, Belgian linen",
    craftsmanship: "Mortise-and-tenon joinery, no plywood",
    dimensions: "L 2150 × W 2050 × H 980 mm",
    care: "Wipe with dry cloth. Polish every 6 months.",
    description: "A grounded, low-profile bed designed to feel like a private sanctuary.",
    inStock: true, isBestSeller: true, collection: "Sanctuary",
  },
  {
    id: "p4", slug: "carrara-dining-table", title: "Carrara Marble Dining Table",
    subtitle: "Oval marble top, brushed brass base",
    category: "dining", price: 149990, mrp: 199990, rating: 4.8, reviews: 132,
    image: img.dining, colors: ["#F5F2ED", "#D4A373"],
    material: "Genuine Carrara marble, brushed brass",
    craftsmanship: "Hand-polished edges, seamless pedestal",
    dimensions: "L 2000 × W 1100 × H 760 mm",
    care: "Use coasters. Re-seal annually.",
    description: "An oval table that makes every dinner feel like an occasion.",
    inStock: true, isNew: true, collection: "Salon",
  },
  {
    id: "p5", slug: "monolith-wardrobe", title: "Monolith Wardrobe",
    subtitle: "Tall walnut, brushed brass pulls",
    category: "wardrobes", price: 159990, mrp: 199990, rating: 4.7, reviews: 96,
    image: img.wardrobe, colors: ["#6B3A1E", "#2A2A2A"],
    material: "Solid walnut veneer, brass hardware",
    craftsmanship: "Soft-close hinges, cedar-lined interior",
    dimensions: "L 1200 × D 600 × H 2200 mm",
    care: "Dust weekly. Avoid moisture.",
    description: "A vertical statement piece that brings order to the bedroom.",
    inStock: true, collection: "Sanctuary",
  },
  {
    id: "p6", slug: "atelier-desk", title: "Atelier Walnut Desk",
    subtitle: "Mid-century inspired workspace",
    category: "office", price: 64990, mrp: 84990, rating: 4.6, reviews: 78,
    image: img.desk, colors: ["#6B3A1E"],
    material: "Solid walnut, leather inlays",
    craftsmanship: "Dovetail drawers, hand-rubbed oil finish",
    dimensions: "L 1500 × D 700 × H 760 mm",
    care: "Wipe with damp cloth. Re-oil yearly.",
    description: "The kind of desk that makes you actually want to start writing.",
    inStock: true, isBestSeller: true, collection: "Atelier",
  },
];

export const categories = [
  { id: "sofas", label: "Sofas", image: img.sofa },
  { id: "beds", label: "Beds", image: img.bed },
  { id: "dining", label: "Dining Tables", image: img.dining },
  { id: "chairs", label: "Chairs", image: img.chair },
  { id: "wardrobes", label: "Wardrobes", image: img.wardrobe },
  { id: "office", label: "Office", image: img.desk },
];

export const findProduct = (slug: string) => products.find((p) => p.slug === slug);

export const inr = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });