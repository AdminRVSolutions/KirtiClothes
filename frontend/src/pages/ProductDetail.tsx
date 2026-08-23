import React from 'react';
import { useParams } from 'react-router-dom';
import ProductGallery from '../components/product/ProductGallery';
import ProductInfo from '../components/product/ProductInfo';
import ProductGrid from '../components/shop/ProductGrid';
import { getProduct, getProducts, API_BASE } from '../api';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = React.useState<any>(null);
  const [crossSellProducts, setCrossSellProducts] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (id) {
      getProduct(id).then(data => {
        // Format product images to ensure full paths
        // Extract unique sizes and colors from variants
        const variants = data.variants || [];
        const uniqueColors = Array.from(new Set(variants.map((v: any) => v.color))) as string[];
        const uniqueSizes = Array.from(new Set(variants.map((v: any) => v.size))) as string[];
        
        const formattedProduct = {
          ...data,
          category: data.category?.name || 'Uncategorized',
          mrp: data.price * 1.2,
          images: data.images?.length > 0 ? data.images.map((img: string) => img.startsWith('http') ? img : `${API_BASE}${img}`) : (variants[0]?.images?.length > 0 ? variants[0].images.map((img: string) => img.startsWith('http') ? img : `${API_BASE}${img}`) : [`${API_BASE}${data.imageUrl || '/img/img2.webp'}`]),
          colors: uniqueColors.map(c => ({ name: c, hex: '#C0C0C0' })), // Using placeholder hex for now
          sizes: uniqueSizes,
          variants: variants
        };
        setProduct(formattedProduct);
      });

      // Fetch other products for cross-sell
      getProducts().then(allProducts => {
        const filtered = allProducts
          .filter((p: any) => p.id.toString() !== id)
          .slice(0, 4)
          .map((p: any) => ({
            ...p,
            category: p.category?.name || 'Uncategorized',
            image: `${API_BASE}${p.imageUrl}`,
            mrp: p.price * 1.2,
          }));
        setCrossSellProducts(filtered);
      });
    }
  }, [id]);

  if (!product) return <div className="min-h-screen pt-24 text-center font-body">Loading...</div>;

  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-[1600px]">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-32">
          {/* Left: Gallery */}
          <div className="w-full">
            <ProductGallery images={product.images} />
          </div>

          {/* Right: Info */}
          <div className="w-full">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Cross-Sell Section */}
        <div className="border-t border-kirti-border/30 pt-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl text-kirti-dark-brown uppercase tracking-widest mb-4">
              You May Also Like
            </h2>
            <div className="w-16 h-[1px] bg-kirti-gold mx-auto" />
          </div>
          <ProductGrid products={crossSellProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
