import { useEffect, useState } from 'react';
import api from '../api';

export default function SettingsPage() {
  const [threshold, setThreshold] = useState(5);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/settings').then((r) => {
      setThreshold(r.data.data.lowStockDefault);
      setLoading(false);
    });
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await api.put('/settings', { lowStockDefault: threshold });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      setError('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading"><div className="spinner" />Loading settings…</div>;

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Settings</div>
        <div className="page-subtitle">Configure your organization preferences</div>
      </div>

      <div className="card" style={{ maxWidth: 460 }}>
        <div className="card-title">Inventory Defaults</div>
        {error && <div className="alert alert-danger">{error}</div>}
        {saved && <div className="alert alert-success">Settings saved successfully.</div>}
        <form onSubmit={submit}>
          <div className="form-group">
            <label className="form-label">Default Low Stock Threshold</label>
            <input
              className="form-input"
              type="number"
              min="0"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              style={{ maxWidth: 160 }}
            />
            <div className="form-hint">
              Products without a custom threshold use this value. Currently <strong>{threshold} units</strong>.
            </div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving…' : 'Save Settings'}
          </button>
        </form>
      </div>

      <div className="card" style={{ maxWidth: 460, marginTop: 16 }}>
        <div className="card-title">About</div>
        <div style={{ color: 'var(--text2)', fontSize: 13, lineHeight: 1.8 }}>
          <div><strong style={{ color: 'var(--text)' }}>StockFlow</strong> — MVP v0.1</div>
          <div>Simple inventory management for small businesses.</div>
          <div style={{ marginTop: 8 }}>Built with NestJS · MySQL · React</div>
        </div>
      </div>
    </div>
  );
}
