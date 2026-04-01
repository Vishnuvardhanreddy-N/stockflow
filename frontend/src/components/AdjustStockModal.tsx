import { useState } from 'react';
import { IconX } from '../Icons';

interface Props {
  product: { id: string; name: string; quantity: number };
  onAdjust: (id: string, delta: number, note?: string) => Promise<void>;
  onClose: () => void;
}

export default function AdjustStockModal({ product, onAdjust, onClose }: Props) {
  const [delta, setDelta] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const preview = delta !== '' && !isNaN(Number(delta))
    ? Math.max(0, product.quantity + Number(delta))
    : null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (delta === '' || isNaN(Number(delta))) { setError('Enter a valid number.'); return; }
    setLoading(true);
    setError('');
    try {
      await onAdjust(product.id, Number(delta), note || undefined);
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Adjustment failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 380 }}>
        <div className="modal-header">
          <div className="modal-title">Adjust Stock</div>
          <button className="modal-close" onClick={onClose}><IconX /></button>
        </div>

        <div style={{ background: 'var(--surface2)', borderRadius: 8, padding: '12px 14px', marginBottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 2 }}>Product</div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{product.name}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 2 }}>Current Qty</div>
            <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 22, fontWeight: 500, color: 'var(--accent)' }}>{product.quantity}</div>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={submit}>
          <div className="form-group">
            <label className="form-label">Adjustment (e.g. +10 or -3)</label>
            <input
              className="form-input"
              type="number"
              value={delta}
              onChange={(e) => setDelta(e.target.value)}
              placeholder="+5 or -2"
              autoFocus
              style={{ fontFamily: 'Geist Mono, monospace', fontSize: 18 }}
            />
            {preview !== null && (
              <div className="form-hint">
                New quantity will be: <strong style={{ color: 'var(--accent)' }}>{preview}</strong>
              </div>
            )}
          </div>
          <div className="form-group">
            <label className="form-label">Note (optional)</label>
            <input className="form-input" value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Restock from supplier" />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Applying…' : 'Apply Adjustment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
