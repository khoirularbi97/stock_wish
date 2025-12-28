'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      const { error } = await signIn(email, password);
      
      if (error) {
        // Provide more helpful error messages
        if (error.message === 'Failed to fetch') {
          setError('Tidak dapat terhubung ke server. Pastikan Supabase sudah dikonfigurasi dengan benar. Silakan cek file .env.local Anda.');
        } else if (error.message.includes('Invalid login credentials')) {
          setError('Email atau password salah. Silakan coba lagi.');
        } else {
          setError(error.message);
        }
        return;
      }
      
      router.push('/interactive-dashboard');
    } catch (err) {
      // Handle network errors
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        setError('Tidak dapat terhubung ke server. Pastikan Supabase sudah dikonfigurasi dengan benar. Silakan cek file .env.local Anda dan pastikan URL Supabase valid.');
      } else {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-xl border border-border shadow-lg p-8">
          <h1 className="text-2xl font-bold text-text-primary mb-6 text-center">
            Masuk ke Stock Analyzer
          </h1>
          
          {error && (
            <div className="mb-4 p-4 rounded-lg bg-red-50 border border-red-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800 font-medium">{error}</p>
                  {error.includes('Supabase') && (
                    <p className="mt-2 text-xs text-red-600">
                      Lihat{' '}
                      <a 
                        href="https://github.com/khoirularbi97/stock_wish/blob/main/README.md" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="underline hover:text-red-800"
                      >
                        panduan setup
                      </a>
                      {' '}untuk konfigurasi Supabase.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-brand-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Masuk...' : 'Masuk'}
            </button>
          </form>

          <div className="mt-6 text-center">
              <p className="text-sm text-text-secondary">
              Belum punya akun?{' '}
              <Link href="/register" className="text-brand-primary hover:underline font-semibold">
                Daftar
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-xs text-text-secondary font-semibold mb-3 text-center">
              Demo Credentials
            </p>
            <div className="space-y-2 text-xs bg-muted p-3 rounded-lg">
              <div className="flex justify-between">
                <span className="text-text-secondary">Investor:</span>
                <span className="text-text-primary font-mono">investor@example.com / investor123</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Analyst:</span>
                <span className="text-text-primary font-mono">analyst@example.com / analyst123</span>
              </div>
            </div>
            <p className="mt-3 text-xs text-text-secondary text-center">
              <span className="font-medium">Catatan:</span> Demo credentials hanya akan berfungsi setelah{' '}
              <a 
                href="https://github.com/khoirularbi97/stock_wish/blob/main/README.md" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-brand-primary hover:underline"
              >
                Supabase dikonfigurasi
              </a>
              {' '}dan migrations dijalankan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}