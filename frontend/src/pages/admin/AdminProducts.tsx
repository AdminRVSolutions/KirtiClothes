import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getProducts, createProduct, deleteProduct } from '../../api';

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [gender, setGender] = useState('Men');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [fabric, setFabric] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct({
        name,
        slug: name.toLowerCase().replace(/ /g, '-'),
        price: parseFloat(price),
        gender,
        categoryId: 0, // Uses default general category if not handled well, but our backend handles 0
        sizes: [size],
        colors: [color],
        fabric,
        imageUrl: imageUrl || '/img/img2.webp',
        stock: 10
      });
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const filteredProducts = products.filter(p => p.name?.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-display text-xl text-kirti-dark-brown uppercase tracking-wider">Manage Products</h3>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-kirti-dark-brown text-white px-4 py-2 rounded-md font-body text-sm flex items-center space-x-2 hover:bg-kirti-gold transition-colors"
        >
          <Plus size={16} />
          <span>Add Product</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-display text-xl text-kirti-dark-brown">Add New Product</h2>
              <button onClick={() => setIsModalOpen(false)}><X size={24} className="text-gray-500 hover:text-red-500" /></button>
            </div>
            <form onSubmit={handleAddProduct} className="space-y-4 font-body text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">Product Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-kirti-gold" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Gender</label>
                  <select value={gender} onChange={e => setGender(e.target.value)} className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-kirti-gold">
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">Price (₹)</label>
                  <input type="number" value={price} onChange={e => setPrice(e.target.value)} required className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-kirti-gold" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Category</label>
                  <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="e.g. Kurta" className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-kirti-gold" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">Size</label>
                  <input type="text" value={size} onChange={e => setSize(e.target.value)} placeholder="e.g. M" className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-kirti-gold" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Color</label>
                  <input type="text" value={color} onChange={e => setColor(e.target.value)} placeholder="e.g. Red" className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-kirti-gold" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Fabric</label>
                  <input type="text" value={fabric} onChange={e => setFabric(e.target.value)} placeholder="e.g. Silk" className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-kirti-gold" />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Image URL Path</label>
                <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="/img/img2.webp" className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-kirti-gold" />
              </div>
              <div className="flex justify-end pt-4">
                <button type="submit" className="bg-kirti-dark-brown text-white px-6 py-2 rounded font-body text-sm hover:bg-kirti-gold transition-colors">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="relative w-64">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md font-body text-sm focus:outline-none focus:border-kirti-gold"
            />
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <div className="text-sm font-body text-gray-500">
            Total {filteredProducts.length} products
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-body text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-widest text-xs">
              <tr>
                <th className="px-6 py-3 font-medium">Image</th>
                <th className="px-6 py-3 font-medium">Product Name</th>
                <th className="px-6 py-3 font-medium">Gender</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Stock</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img src={`http://localhost:5029${product.imageUrl}`} alt={product.name} className="w-12 h-12 object-cover rounded" />
                  </td>
                  <td className="px-6 py-4 text-kirti-dark-brown font-medium">{product.name}</td>
                  <td className="px-6 py-4 text-gray-600">{product.gender}</td>
                  <td className="px-6 py-4 text-gray-700">₹{product.price.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4 text-gray-700">{product.stock}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button className="text-blue-600 hover:text-blue-800 transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-800 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No products found. Add a new product to get started.</td>
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
