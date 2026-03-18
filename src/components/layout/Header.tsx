import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import logo from '@/assets/logo.png';

const productCategories = [
  { name: 'Paint Containers', path: '/products?category=paint' },
  { name: 'Food Grade', path: '/products?category=food' },
  { name: 'Lubricants', path: '/products?category=lubricants' },
  { name: 'All Products', path: '/products' },
];

const navItems = [
  { name: 'About Us', path: '/about' },
  { name: 'Quality', path: '/quality' },
  { name: 'Customization', path: '/customization' },
  { name: 'Contact Us', path: '/contact' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isHome = location.pathname === '/';
  const transparent = isHome && !isScrolled && !isMobileMenuOpen;

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setProductsOpen(false);
  }, [location.pathname]);

  const isProductsActive = location.pathname === '/products' || location.search.includes('category');

  const linkClass = (active: boolean) =>
    `relative text-sm font-medium transition-colors duration-200 group
     ${transparent
       ? active ? 'text-white' : 'text-white/80 hover:text-white'
       : active ? 'text-primary' : 'text-foreground hover:text-primary'
     }`;

  const underline = (active: boolean) =>
    `absolute -bottom-1 left-0 h-[2px] bg-primary rounded-full transition-all duration-200
     ${active ? 'w-full' : 'w-0 group-hover:w-full'}
     ${transparent ? 'bg-white' : 'bg-primary'}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        transparent
          ? 'bg-transparent'
          : 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-8">
        <nav className="flex items-center justify-between h-[72px]">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <img
              src={logo}
              alt="SVS Polymer Industries"
              className="h-11 w-auto transition-transform duration-200 group-hover:scale-105"
            />
            <div className="hidden xl:block leading-tight">
              <div className={`text-[13px] font-bold tracking-wide ${transparent ? 'text-white' : 'text-foreground'}`}>
                SVS POLYMER
              </div>
              <div className={`text-[11px] ${transparent ? 'text-white/60' : 'text-muted-foreground'}`}>
                Industries
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">

            {/* Products dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProductsOpen(v => !v)}
                className={linkClass(isProductsActive) + ' flex items-center gap-1 py-1'}
              >
                Products
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`} />
                <span className={underline(isProductsActive)} />
              </button>

              {productsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 bg-background border border-border rounded-xl shadow-large overflow-hidden z-50">
                  <div className="py-1.5">
                    {productCategories.map((cat) => (
                      <Link
                        key={cat.name}
                        to={cat.path}
                        onClick={() => setProductsOpen(false)}
                        className={`block px-4 py-2.5 text-sm transition-colors hover:bg-muted hover:text-primary
                          ${cat.name === 'All Products' ? 'border-t border-border mt-1 pt-3 font-medium text-primary' : 'text-foreground'}`}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link key={item.name} to={item.path} className={linkClass(active) + ' py-1'}>
                  {item.name}
                  <span className={underline(active)} />
                </Link>
              );
            })}
          </div>

          {/* Right side controls */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className={`p-2 rounded-full transition-colors ${
                transparent ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {mounted && (theme === 'dark' ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />)}
            </button>

            <Link to="/quote">
              <Button
                size="sm"
                className={`px-5 h-9 font-semibold text-sm transition-all ${
                  transparent
                    ? 'bg-white text-slate-900 hover:bg-white/90'
                    : ''
                }`}
              >
                Request a Quote
              </Button>
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center gap-1">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className={`p-2 rounded-full transition-colors ${
                transparent ? 'text-white/80 hover:text-white' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {mounted && (theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />)}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(v => !v)}
              aria-label="Toggle menu"
              className={`p-2 rounded-full transition-colors ${
                transparent ? 'text-white/80 hover:text-white' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 bg-background/98 backdrop-blur-md border-t border-border ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto px-8 py-4 space-y-1">

          {/* Products accordion */}
          <div>
            <button
              onClick={() => setMobileProductsOpen(v => !v)}
              className={`w-full flex items-center justify-between py-3 px-3 rounded-lg text-sm font-medium transition-colors
                ${isProductsActive ? 'text-primary bg-primary/5' : 'text-foreground hover:bg-muted'}`}
            >
              Products
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileProductsOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-200 ${mobileProductsOpen ? 'max-h-60' : 'max-h-0'}`}>
              <div className="pl-4 py-1 space-y-0.5">
                {productCategories.map((cat) => (
                  <Link
                    key={cat.name}
                    to={cat.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-2.5 px-3 rounded-lg text-sm transition-colors hover:bg-muted
                      ${cat.name === 'All Products' ? 'font-medium text-primary' : 'text-muted-foreground'}`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-3 px-3 rounded-lg text-sm font-medium transition-colors
                  ${active ? 'text-primary bg-primary/5' : 'text-foreground hover:bg-muted'}`}
              >
                {item.name}
              </Link>
            );
          })}

          <div className="pt-3 pb-2">
            <Link to="/quote" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full" size="default">
                Request a Quote
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
