import { useState } from 'react';
import { useAuth } from '../AuthContext';

export default function AuthPage() {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [form, setForm] = useState({ email: '', password: '', orgName: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) { setError('Email and password are required.'); return; }
    if (mode === 'signup' && !form.orgName.trim()) { setError('Organization name is required.'); return; }
    setLoading(true);
    try {
      if (mode === 'login') await login(form.email, form.password);
      else await signup(form.email, form.password, form.orgName);
    } catch (err: any) {
      const msg = err?.response?.data?.message;
      setError(Array.isArray(msg) ? msg[0] : msg || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-logo-row">
          <div className="logo-mark">SF</div>
          <span className="logo-text">StockFlow</span>
        </div>
        <div className="auth-title">{mode === 'login' ? 'Welcome back' : 'Create your account'}</div>
        <div className="auth-sub">
          {mode === 'login' ? 'Sign in to manage your inventory.' : 'Get started with your organization.'}
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={submit}>
          {mode === 'signup' && (
            <div className="form-group">
              <label className="form-label">Organization Name</label>
              <input className="form-input" placeholder="e.g. My Warehouse" value={form.orgName} onChange={set('orgName')} />
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" placeholder="Min. 6 characters" value={form.password} onChange={set('password')} />
          </div>
          <button type="submit" className="btn btn-primary btn-full" disabled={loading} style={{ marginTop: 8 }}>
            {loading ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <div className="auth-divider" style={{ marginTop: 20 }}>
          {mode === 'login' ? (
            <>No account? <button onClick={() => { setMode('signup'); setError(''); }}>Sign up free</button></>
          ) : (
            <>Have an account? <button onClick={() => { setMode('login'); setError(''); }}>Sign in</button></>
          )}
        </div>
      </div>
    </div>
  );
}
