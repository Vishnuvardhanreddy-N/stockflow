import { useEffect, useState } from 'react';
import api from '../api';
import { IconWarning } from '../Icons';

interface DashboardData {
  totalProducts: number;
  totalUnits: number;
  lowStockCount: number;
  lowStockItems: { id: string; name: string; sku: string; quantity: number; lowStockThreshold: number }[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard').then((r) => { setData(r.data.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading"><div className="spinner" /> Loading dashboard…</div>;
  if (!data) return <div className="loading">Failed to load dashboard.</div>;

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Dashboard</div>
        <div className="page-subtitle">Live overview of your inventory</div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Products</div>
          <div className="stat-value accent">{data.totalProducts}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Units on Hand</div>
          <div className="stat-value">{data.totalUnits.toLocaleString()}</div>
        </div>
        <div className={`stat-card ${data.lowStockCount > 0 ? 'warning' : ''}`}>
          <div className="stat-label">Low Stock Alerts</div>
          <div className={`stat-value ${data.lowStockCount > 0 ? 'warn' : ''}`}>{data.lowStockCount}</div>
        </div>
      </div>

      <div className="card">
        <div className="section-header">
          <div className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <IconWarning /> Low Stock Items
          </div>
        </div>

        {data.lowStockItems.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">✅</div>
            <div className="empty-title">All products well-stocked</div>
            <div className="empty-sub">No products are below their low stock threshold.</div>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>SKU</th>
                  <th>Qty on Hand</th>
                  <th>Threshold</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.lowStockItems.map((item) => (
                  <tr key={item.id}>
                    <td><strong>{item.name}</strong></td>
                    <td><span className="mono">{item.sku}</span></td>
                    <td><span className="mono" style={{ color: item.quantity === 0 ? 'var(--danger)' : 'var(--warning)' }}>{item.quantity}</span></td>
                    <td><span className="mono">{item.lowStockThreshold}</span></td>
                    <td>
                      {item.quantity === 0
                        ? <span className="badge badge-danger">Out of stock</span>
                        : <span className="badge badge-low">Low stock</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
