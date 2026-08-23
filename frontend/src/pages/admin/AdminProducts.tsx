import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X, Upload } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getProducts, getCategories, createCategory, createProduct, createProductVariant, deleteProduct, uploadProductImages, API_BASE } from '../../api';

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Form State
  const [gender, setGender] = useState('Men');
  const [categoryId, setCategoryId] = useState<string>('');
  const [newCategoryName, setNewCategoryName] = useState('');
  
  const [productId, setProductId] = useState<string>(''); // existing product id or 'new'
  const [newProductName, setNewProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [fabric, setFabric] = useState('');
  const [stock, setStock] = useState('10');
  
  const [files, setFiles] = useState<FileList | null>(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const fetchInitialData = async () => {
    try {
      const [prodData, catData] = await Promise.all([getProducts(), getCategories()]);
      setProducts(prodData);
      setCategories(catData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleOpenModal = () => {
    setGender('Men');
    setCategoryId('');
    setNewCategoryName('');
    setProductId('');
    setNewProductName('');
    setPrice('');
    setDescription('');
    setSize('');
    setColor('');
    setFabric('');
    setStock('10');
    setFiles(null);
    setMainImageIndex(0);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      // 1. Resolve Category
      let finalCategoryId = parseInt(categoryId);
      let catName = categories.find(c => c.id === finalCategoryId)?.name || 'General';

      if (categoryId === 'new') {
        const newCat = await createCategory({
          name: newCategoryName,
          slug: newCategoryName.toLowerCase().replace(/ /g, '-')
        });
        finalCategoryId = newCat.id;
        catName = newCat.name;
      }

      // 2. Resolve Product
      let finalProductId = parseInt(productId);
      let prodName = products.find(p => p.id === finalProductId)?.name || newProductName;

      if (productId === 'new' || !productId) {
        const newProd = await createProduct({
          name: newProductName,
          slug: newProductName.toLowerCase().replace(/ /g, '-'),
          price: parseFloat(price),
          description,
          gender,
          categoryId: finalCategoryId,
          fabric,
          stock: parseInt(stock),
          imageUrl: '' // will be set by variant main image ideally, but keeping empty for now
        });
        finalProductId = newProd.id;
        prodName = newProd.name;
      }

      // 3. Upload Images
      let uploadedUrls: string[] = [];
      if (files && files.length > 0) {
        const formData = new FormData();
        formData.append('gender', gender);
        formData.append('category', catName);
        formData.append('product', prodName);
        formData.append('size', size);
        formData.append('color', color);
        for (let i = 0; i < files.length; i++) {
          formData.append('images', files[i]);
        }

        const uploadRes = await uploadProductImages(formData);
        uploadedUrls = uploadRes.urls;
      }

      // 4. Create Variant
      const mainImage = uploadedUrls.length > 0 ? uploadedUrls[mainImageIndex] || uploadedUrls[0] : '';
      await createProductVariant(finalProductId, {
        size,
        color,
        colorHex: '#C0C0C0', // simple default
        stock: parseInt(stock),
        mainImage,
        images: uploadedUrls
      });

      setIsModalOpen(false);
      fetchInitialData();
    } catch (err) {
      console.error(err);
      alert("Failed to save product/variant.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        fetchInitialData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filteredProducts = products.filter(p => p.name?.toLowerCase().includes(searchTerm.toLowerCase()));

  // Dynamic dropdown options
  const genderCategories = categories; // In a more complex app, categories might belong to a gender
  const categoryProducts = products.filter(p => p.categoryId === parseInt(categoryId) && p.gender === gender);
  
  // Extract unique sizes/colors for current category/gender (optional, for suggestions)
  const existingSizes = Array.from(new Set(products.flatMap(p => p.variants?.map((v:any) => v.size) || [])));
  const existingColors = Array.from(new Set(products.flatMap(p => p.variants?.map((v:any) => v.color) || [])));

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-display text-xl text-kirti-dark-brown uppercase tracking-wider">Manage Products</h3>
        <button 
          onClick={handleOpenModal}
          className="bg-kirti-dark-brown text-white px-4 py-2 rounded-md font-body text-sm flex items-center space-x-2 hover:bg-kirti-gold transition-colors"
        >
          <Plus size={16} />
          <span>Add Product</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
              <h2 className="font-display text-xl text-kirti-dark-brown uppercase tracking-wider">Add New Product / Variant</h2>
              <button onClick={() => setIsModalOpen(false)}><X size={24} className="text-gray-500 hover:text-red-500" /></button>
            </div>
            
            <form onSubmit={handleSaveProduct} className="space-y-6 font-body text-sm">
              
              {/* Step 1 & 2: Gender & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-md">
                <div>
                  <label className="block text-kirti-dark-brown font-medium uppercase tracking-wider text-xs mb-2">1. Gender</label>
                  <select value={gender} onChange={e => { setGender(e.target.value); setCategoryId(''); setProductId(''); }} className="w-full border border-gray-300 rounded p-2.5 focus:outline-none focus:border-kirti-gold bg-white">
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                  </select>
                </div>
                <div>
                  <label className="block text-kirti-dark-brown font-medium uppercase tracking-wider text-xs mb-2">2. Category</label>
                  <select value={categoryId} onChange={e => { setCategoryId(e.target.value); setProductId(''); }} required className="w-full border border-gray-300 rounded p-2.5 focus:outline-none focus:border-kirti-gold bg-white mb-2">
                    <option value="">Select Category</option>
                    {genderCategories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                    <option value="new">+ Create New Category</option>
                  </select>
                  {categoryId === 'new' && (
                    <input type="text" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} required placeholder="New Category Name" className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-kirti-gold" />
                  )}
                </div>
              </div>

              {/* Step 3: Product Name */}
              <div className="bg-gray-50 p-4 rounded-md">
                <label className="block text-kirti-dark-brown font-medium uppercase tracking-wider text-xs mb-2">3. Product Name</label>
                <select value={productId} onChange={e => setProductId(e.target.value)} required className="w-full border border-gray-300 rounded p-2.5 focus:outline-none focus:border-kirti-gold bg-white mb-2">
                  <option value="">Select Existing Product or Create New</option>
                  {categoryProducts.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                  <option value="new">+ Create New Product</option>
                </select>
                
                {productId === 'new' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-gray-700 mb-1">New Product Name</label>
                      <input type="text" value={newProductName} onChange={e => setNewProductName(e.target.value)} required placeholder="e.g. Elegant Casual Shirt" className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-kirti-gold" />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Base Price (₹)</label>
                      <input type="number" value={price} onChange={e => setPrice(e.target.value)} required placeholder="e.g. 1500" className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-kirti-gold" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-1">Description</label>
                      <textarea value={description} onChange={e => setDescription(e.target.value)} rows={2} className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-kirti-gold"></textarea>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-1">Fabric</label>
                      <input type="text" value={fabric} onChange={e => setFabric(e.target.value)} placeholder="e.g. Cotton Silk" className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-kirti-gold" />
                    </div>
                  </div>
                )}
              </div>

              {/* Step 4 & 5: Size & Color */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-md">
                <div>
                  <label className="block text-kirti-dark-brown font-medium uppercase tracking-wider text-xs mb-2">4. Variant Size</label>
                  <input type="text" list="sizes" value={size} onChange={e => setSize(e.target.value)} required placeholder="e.g. M" className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-kirti-gold bg-white" />
                  <datalist id="sizes">
                    {existingSizes.map((s, i) => <option key={i} value={s as string} />)}
                  </datalist>
                </div>
                <div>
                  <label className="block text-kirti-dark-brown font-medium uppercase tracking-wider text-xs mb-2">5. Variant Color</label>
                  <input type="text" list="colors" value={color} onChange={e => setColor(e.target.value)} required placeholder="e.g. Black" className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-kirti-gold bg-white" />
                  <datalist id="colors">
                    {existingColors.map((c, i) => <option key={i} value={c as string} />)}
                  </datalist>
                </div>
                <div>
                  <label className="block text-kirti-dark-brown font-medium uppercase tracking-wider text-xs mb-2">Variant Stock</label>
                  <input type="number" value={stock} onChange={e => setStock(e.target.value)} required min="0" className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-kirti-gold bg-white" />
                </div>
              </div>

              {/* Step 6 & 7: Images */}
              <div className="bg-gray-50 p-4 rounded-md">
                <label className="block text-kirti-dark-brown font-medium uppercase tracking-wider text-xs mb-2">6. Upload Variant Images</label>
                <p className="text-xs text-gray-500 mb-4">You can upload multiple images. Please upload images in AVIF or WEBP format for best performance. Ideal aspect ratio: 3:4.</p>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-white relative hover:bg-gray-50 transition-colors">
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*"
                    onChange={e => setFiles(e.target.files)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload size={32} className="text-gray-400 mb-2" />
                  <span className="text-gray-600">Click to browse or drag & drop</span>
                  <span className="text-xs text-gray-400 mt-1">{files ? `${files.length} file(s) selected` : 'No files selected'}</span>
                </div>

                {files && files.length > 0 && (
                  <div className="mt-4">
                    <label className="block text-gray-700 mb-2 text-xs uppercase tracking-wider">7. Select Main Image</label>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {Array.from(files).map((file, i) => (
                        <div 
                          key={i} 
                          onClick={() => setMainImageIndex(i)}
                          className={`relative flex-shrink-0 cursor-pointer border-2 rounded-md overflow-hidden ${mainImageIndex === i ? 'border-kirti-gold' : 'border-transparent'}`}
                        >
                          <img src={URL.createObjectURL(file)} alt="Preview" className="w-20 h-24 object-cover" />
                          {mainImageIndex === i && (
                            <div className="absolute top-1 right-1 bg-kirti-gold text-white text-[10px] px-1.5 py-0.5 rounded">Main</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-6 border-t border-gray-200">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 rounded font-body text-sm text-gray-600 hover:bg-gray-100 mr-4 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isUploading}
                  className="bg-kirti-dark-brown text-white px-8 py-2 rounded font-body text-sm uppercase tracking-wider hover:bg-kirti-gold transition-colors disabled:opacity-50"
                >
                  {isUploading ? 'Saving...' : 'Save Product & Variant'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product List Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mt-6">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <div className="relative w-72">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md font-body text-sm focus:outline-none focus:border-kirti-gold"
            />
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <div className="text-sm font-body text-gray-500 uppercase tracking-widest text-xs">
            {filteredProducts.length} Products
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-body text-sm">
            <thead className="bg-white border-b border-gray-200 text-gray-500 uppercase tracking-widest text-xs">
              <tr>
                <th className="px-6 py-4 font-medium">Product Name</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Gender</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Variants (Size - Color)</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img src={`${API_BASE}${product.variants?.[0]?.mainImage || product.imageUrl || '/img/img2.webp'}`} alt={product.name} className="w-10 h-12 object-cover rounded shadow-sm" />
                      <span className="text-kirti-dark-brown font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{product.category?.name}</td>
                  <td className="px-6 py-4 text-gray-600">{product.gender}</td>
                  <td className="px-6 py-4 text-kirti-dark-brown font-medium">₹{product.price.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {product.variants?.map((v:any) => (
                        <span key={v.id} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded border border-gray-200">
                          {v.size} - {v.color}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button className="text-kirti-brown hover:text-kirti-gold transition-colors" title="Edit">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="text-red-400 hover:text-red-600 transition-colors" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500 font-display text-lg">No products found. Add a new product to get started.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
