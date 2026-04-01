import { useEffect, useState, useMemo } from 'react';
import api from '../api';
import ProductModal from '../components/ProductModal';
import AdjustStockModal from '../components/AdjustStockModal';
import ConfirmModal from '../components/ConfirmModal';
import { IconPlus, IconSearch, IconEdit, IconTrash, IconTrendUp } from '../Icons';

interface Product {
  id: string; name: string; sku: string; description?: string;
  quantity: number; costPrice?: number; sellingPrice?: number;
  lowStockThreshold?: number; createdAt: string; updatedAt: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<{ type: string; product?: Product } | null>(null);
  const [globalThreshold, setGlobalThreshold] = useState(5);

  const loadProducts = async () => {
    try {
      const [prods, settings] = await Promise.all([
        api.get('/products'),
        api.get('/settings'),
      ]);
      setProducts(prods.data);
      setGlobalThreshold(settings.data.lowStockDefault);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadProducts(); }, []);

  const filtered = useMemo(() =>
    products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
    ), [products, search]);

  const isLow = (p: Product) => p.quantity <= (p.lowStockThreshold ?? globalThreshold);

  const handleCreate = async (data: any) => {
    await api.post('/products', data);
    await loadProducts();
  };

  const handleUpdate = async (data: any) => {
    await api.put(`/products/${modal!.product!.id}`, data);
    await loadProducts();
  };

  const handleAdjust = async (id: string, delta: number, note?: string) => {
    await api.patch(`/products/${id}/adjust-stock`, { delta, note });
    await loadProducts();
  };

  const handleDelete = async () => {
    await api.delete(`/products/${modal!.product!.id}`);
    await loadProducts();
  };

  const fmt = (v?: number) => v == null ? '—' : `$${Number(v).toFixed(2)}`;

  if (loading) return <div className="loading"><div className="spinner" />Loading products…</div>;

  return (
    <div>
      <div className="topbar">
        <div className="page-header" style={{ margin: 0 }}>
          <div className="page-title">Products</div>
          <div className="page-subtitle">{products.length} product{products.length !== 1 ? 's' : ''} in your inventory</div>
        </div>
        <div className="topbar-right">
          <div className="search-box">
            <IconSearch />
            <input
              placeholder="Search by name or SKU…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={() => setModal({ type: 'create' })}>
            <IconPlus /> Add Product
          </button>
        </div>
      </div>

      <div className="card">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <div className="empty-title">{search ? 'No products match your search' : 'No products yet'}</div>
            <div className="empty-sub">{search ? 'Try a different search term.' : 'Add your first product to get started.'}</div>
            {!search && (
              <button className="btn btn-primary" onClick={() => setModal({ type: 'create' })}>
                <IconPlus /> Add Product
              </button>
            )}
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Qty on Hand</th>
                  <th>Selling Price</th>
                  <th>Cost Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => {
                  const low = isLow(p);
                  return (
                    <tr key={p.id}>
                      <td>
                        <div style={{ fontWeight: 600, fontSize: 13.5 }}>{p.name}</div>
                        {p.description && <div style={{ color: 'var(--text2)', fontSize: 12, marginTop: 2 }}>{p.description}</div>}
                      </td>
                      <td><span className="mono">{p.sku}</span></td>
                      <td>
                        <span className="mono" style={{ fontSize: 15, fontWeight: 500, color: p.quantity === 0 ? 'var(--danger)' : low ? 'var(--warning)' : 'var(--accent)' }}>
                          {p.quantity}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text2)' }}>{fmt(p.sellingPrice)}</td>
                      <td style={{ color: 'var(--text2)' }}>{fmt(p.costPrice)}</td>
                      <td>
                        {p.quantity === 0
                          ? <span className="badge badge-danger">Out of stock</span>
                          : low
                          ? <span className="badge badge-low">Low stock</span>
                          : <span className="badge badge-ok">In stock</span>}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button className="btn btn-ghost btn-sm btn-icon" title="Adjust stock" onClick={() => setModal({ type: 'adjust', product: p })}><IconTrendUp /></button>
                          <button className="btn btn-ghost btn-sm btn-icon" title="Edit product" onClick={() => setModal({ type: 'edit', product: p })}><IconEdit /></button>
                          <button className="btn btn-danger-ghost btn-sm btn-icon" title="Delete product" onClick={() => setModal({ type: 'delete', product: p })}><IconTrash /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal?.type === 'create' && <ProductModal onSave={handleCreate} onClose={() => setModal(null)} />}
      {modal?.type === 'edit' && modal.product && <ProductModal product={modal.product} onSave={handleUpdate} onClose={() => setModal(null)} />}
      {modal?.type === 'adjust' && modal.product && <AdjustStockModal product={modal.product} onAdjust={handleAdjust} onClose={() => setModal(null)} />}
      {modal?.type === 'delete' && modal.product && (
        <ConfirmModal
          title="Delete Product"
          message={`Are you sure you want to delete "${modal.product.name}"? This action cannot be undone.`}
          onConfirm={handleDelete}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
