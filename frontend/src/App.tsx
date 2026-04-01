import { useState } from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import SettingsPage from './pages/SettingsPage';
import { IconDashboard, IconBox, IconSettings, IconLogout } from './Icons';

type Page = 'dashboard' | 'products' | 'settings';

function Layout() {
  const { user, logout } = useAuth();
  const [page, setPage] = useState<Page>('dashboard');

  if (!user) return <AuthPage />;

  const nav = [
    { id: 'dashboard' as Page, label: 'Dashboard', icon: <IconDashboard /> },
    { id: 'products' as Page, label: 'Products', icon: <IconBox /> },
    { id: 'settings' as Page, label: 'Settings', icon: <IconSettings /> },
  ];

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-mark">SF</div>
          <span className="logo-text">StockFlow</span>
        </div>
        <nav className="sidebar-nav">
          {nav.map((n) => (
            <button
              key={n.id}
              className={`nav-item ${page === n.id ? 'active' : ''}`}
              onClick={() => setPage(n.id)}
            >
              {n.icon}
              {n.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="org-chip">
            <div className="org-chip-name">{user.orgName}</div>
            <div className="org-chip-email">{user.email}</div>
          </div>
          <button className="btn-logout" onClick={logout}>
            <IconLogout />
            Sign out
          </button>
        </div>
      </aside>
      <main className="main-content">
        {page === 'dashboard' && <DashboardPage />}
        {page === 'products' && <ProductsPage />}
        {page === 'settings' && <SettingsPage />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}
