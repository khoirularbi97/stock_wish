'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  className?: string;
}

const Header = () => {
  const router = useRouter();
  const { user, signOut, loading } = useAuth();
  const [isHydrated, setIsHydrated] = useState(false);
  const [authError, setAuthError] = useState('');
  
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Menu UI state
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const toggleMoreMenu = () => setIsMoreMenuOpen((v) => !v);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((v) => !v);

  // Navigation items (define here to avoid ReferenceError)
  const primaryNavItems = [
    { href: '/interactive-dashboard', label: 'Dasbor', icon: 'ChartBarIcon' },
    { href: '/comparison-matrix', label: 'Bandingkan', icon: 'Squares2X2Icon' },
    { href: '/results-visualization', label: 'Visualisasi', icon: 'ChartPieIcon' },
  ];

  const secondaryNavItems = [
    { href: '/stock-analyzer', label: 'Analyzer', icon: 'Cog6ToothIcon' },
    { href: '/user-workspace', label: 'Workspace', icon: 'UserCircleIcon' },
  ];

  const handleLogout = async () => {
    try {
      setAuthError('');
      const { error } = await signOut();
      if (error) {
        setAuthError(error.message);
        return;
      }
      router.push('/login');
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Failed to sign out');
    }
  };

  if (!isHydrated || loading) {
    return (
      <header className="w-full h-16 md:h-14 sm:h-12 px-8 md:px-6 sm:px-4 flex items-center justify-between bg-card border-b border-border fixed top-0 left-0 right-0 z-50 shadow-sm">
        <div className="animate-pulse flex space-x-4">
          <div className="h-8 w-32 bg-muted rounded"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="w-full h-16 md:h-14 sm:h-12 px-8 md:px-6 sm:px-4 flex items-center justify-between bg-card border-b border-border fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link href="/interactive-dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="6" fill="var(--color-primary)" />
            <path d="M8 16L14 10L18 14L24 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 22L14 16L18 20L24 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
          </svg>
          <span className="text-lg font-semibold text-text-primary hidden sm:block">StockWise Analytics</span>
          <span className="text-lg font-semibold text-text-primary sm:hidden">StockWise</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {primaryNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-muted rounded-md transition-smooth"
            >
              <Icon name={item.icon as any} size={18} />
              <span>{item.label}</span>
            </Link>
          ))}

          {/* More Menu */}
          <div className="relative">
            <button
              onClick={toggleMoreMenu}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-muted rounded-md transition-smooth"
            >
              <Icon name="EllipsisHorizontalIcon" size={18} />
              <span>More</span>
            </button>

            {isMoreMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg py-2 animate-scale-in">
                {secondaryNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMoreMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-muted transition-smooth"
                  >
                    <Icon name={item.icon as any} size={18} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* CTA Button - Desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/stock-analyzer"
            className="px-5 py-2 bg-brand-cta text-white font-semibold text-sm rounded-md hover:opacity-90 transition-smooth shadow-sm"
          >
            Mulai Analisis
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 text-text-secondary hover:text-text-primary hover:bg-muted rounded-md transition-smooth"
          aria-label="Toggle menu"
        >
          <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-surface animate-slide-up">
          <nav className="px-4 py-4 space-y-1">
            {primaryNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-muted rounded-md transition-smooth"
              >
                <Icon name={item.icon as any} size={20} />
                <span>{item.label}</span>
              </Link>
            ))}

            <div className="pt-2 border-t border-border mt-2">
              {secondaryNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-muted rounded-md transition-smooth"
                >
                  <Icon name={item.icon as any} size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/stock-analyzer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center w-full px-5 py-3 bg-brand-cta text-white font-semibold text-sm rounded-md hover:opacity-90 transition-smooth shadow-sm"
              >
                Mulai Analisis
              </Link>
            </div>
          </nav>
        </div>
      )}

      <div className="flex items-center gap-4 md:gap-3 sm:gap-2">
        {user ? (
          <>
            <span className="text-sm text-text-secondary hidden md:inline">
              {user.email}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-brand-primary rounded-lg hover:opacity-90 transition-opacity"
            >
              Keluar
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => router.push('/login')}
              className="px-4 py-2 text-sm font-medium text-text-primary hover:text-brand-primary transition-colors"
            >
              Masuk
            </button>
            <button
              onClick={() => router.push('/register')}
              className="px-4 py-2 text-sm font-medium text-white bg-brand-primary rounded-lg hover:opacity-90 transition-opacity"
            >
              Daftar
            </button>
          </>
        )}
      </div>

      {authError && (
        <div className="absolute top-full left-0 right-0 bg-red-50 border-b border-red-200 px-4 py-2">
          <p className="text-sm text-red-600">{authError}</p>
        </div>
      )}
    </header>
  );
};

export default Header;