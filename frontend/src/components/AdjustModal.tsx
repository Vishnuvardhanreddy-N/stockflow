import { useState } from 'react';
import { IconX } from '../Icons';

interface Props {
  product: { id: string; name: string; quantity: number };
  onAdjust: (id: string, delta: number, note?: string) => Promise<void>;
  onClose: () => void;
}

export default function AdjustModal({ product, onAdjust, onClose }: Props) {
  const [delta, setDelta] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const preview = delta !== '' && !isNaN(Number(delta))
    ? Math.max(0, product.quantity + Number(delta))
    : null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!delta || isNaN(Number(delta))) { setError('Enter a valid number.'); return; }
    setLoading(true);
    try {
      await onAdjust(product.id, Number(delta), note || undefined);
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to adjust stock.');
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

        <div style={{ background: 'var(--surface2)', borderRadius: 'var(--radius)', padding: '12px 14px', marginBottom: 18 }}>
          <div style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 2 }}>Product</div>
          <div style={{ fontWeight: 600 }}>{product.name}</div>
          <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 13, color: 'var(--text2)', marginTop: 4 }}>
            Current qty: <strong style={{ color: 'var(--text)' }}>{product.quantity}</strong>
            {preview !== null && (
              <span style={{ marginLeft: 12, color: 'var(--accent)' }}>→ {preview}</span>
            )}
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={submit}>
          <div className="form-group">
            <label className="form-label">Adjustment (+10 to add, -5 to remove)</label>
            <input
              className="form-input"
              type="number"
              value={delta}
              onChange={(e) => setDelta(e.target.value)}
              placeholder="+10 or -5"
              autoFocus
            />
          </div>
          <div className="form-group">
            <label className="form-label">Note (optional)</label>
            <input
              className="form-input"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Stock count correction"
            />
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
