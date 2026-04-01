import { useState } from 'react';
import { IconX } from '../Icons';

interface Product {
  id?: string; name: string; sku: string; description?: string;
  quantity: number; costPrice?: number; sellingPrice?: number; lowStockThreshold?: number;
}

interface Props {
  product?: Product;
  onSave: (data: Omit<Product, 'id'>) => Promise<void>;
  onClose: () => void;
}

export default function ProductModal({ product, onSave, onClose }: Props) {
  const isEdit = !!product?.id;
  const [form, setForm] = useState({
    name: product?.name || '',
    sku: product?.sku || '',
    description: product?.description || '',
    quantity: product?.quantity ?? 0,
    costPrice: product?.costPrice ?? '',
    sellingPrice: product?.sellingPrice ?? '',
    lowStockThreshold: product?.lowStockThreshold ?? '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { setError('Product name is required.'); return; }
    if (!form.sku.trim()) { setError('SKU is required.'); return; }
    setLoading(true);
    setError('');
    try {
      await onSave({
        name: form.name.trim(),
        sku: form.sku.trim(),
        description: form.description || undefined,
        quantity: Number(form.quantity) || 0,
        costPrice: form.costPrice !== '' ? Number(form.costPrice) : undefined,
        sellingPrice: form.sellingPrice !== '' ? Number(form.sellingPrice) : undefined,
        lowStockThreshold: form.lowStockThreshold !== '' ? Number(form.lowStockThreshold) : undefined,
      });
      onClose();
    } catch (err: any) {
      const msg = err?.response?.data?.message;
      setError(Array.isArray(msg) ? msg[0] : msg || 'Failed to save product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">{isEdit ? 'Edit Product' : 'Add New Product'}</div>
          <button className="modal-close" onClick={onClose}><IconX /></button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={submit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Name *</label>
              <input className="form-input" value={form.name} onChange={set('name')} placeholder="Product name" />
            </div>
            <div className="form-group">
              <label className="form-label">SKU *</label>
              <input className="form-input" value={form.sku} onChange={set('sku')} placeholder="e.g. SKU-001" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <input className="form-input" value={form.description} onChange={set('description')} placeholder="Optional description" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Quantity on Hand</label>
              <input className="form-input" type="number" min="0" value={form.quantity} onChange={set('quantity')} />
            </div>
            <div className="form-group">
              <label className="form-label">Low Stock Threshold</label>
              <input className="form-input" type="number" min="0" value={form.lowStockThreshold} onChange={set('lowStockThreshold')} placeholder="Uses global default" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Cost Price ($)</label>
              <input className="form-input" type="number" min="0" step="0.01" value={form.costPrice} onChange={set('costPrice')} placeholder="0.00" />
            </div>
            <div className="form-group">
              <label className="form-label">Selling Price ($)</label>
              <input className="form-input" type="number" min="0" step="0.01" value={form.sellingPrice} onChange={set('sellingPrice')} placeholder="0.00" />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
