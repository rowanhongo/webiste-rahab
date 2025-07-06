import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Crown } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Programs', path: '/#programs' },
    { name: 'Businesses', path: '/#businesses' },
    { name: 'Blog', path: '/#blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleNavClick = (path: string) => {
    if (path.startsWith('/#')) {
      const sectionId = path.substring(2);
      
      // If we're not on the home page, navigate to home first
      if (location.pathname !== '/') {
        navigate('/');
        // Wait for navigation to complete, then scroll to section
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        // If we're already on home page, just scroll to section
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-ivory shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Crown className="w-8 h-8 text-royal-blue" />
            <div>
              <h1 className="text-2xl font-playfair font-bold text-royal-blue">
                Kingdom Business Studio
              </h1>
              <p className="text-xs text-gray-600 font-inter">
                Launch or scale your God-given business with confidence
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              item.path.startsWith('/#') ? (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.path)}
                  className={`font-inter font-medium transition-colors hover:text-royal-blue ${
                    isActive(item.path) ? 'text-royal-blue' : 'text-gray-700'
                  }`}
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`font-inter font-medium transition-colors hover:text-royal-blue ${
                    isActive(item.path) ? 'text-royal-blue' : 'text-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>

          {/* Register Button */}
          <div className="hidden md:block">
            <Link
              to="/register"
              className="bg-royal-blue text-white px-6 py-2 rounded-full font-inter font-medium hover:bg-deep-blue transition-colors"
            >
              Register Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                item.path.startsWith('/#') ? (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.path)}
                    className={`font-inter font-medium transition-colors hover:text-royal-blue text-left ${
                      isActive(item.path) ? 'text-royal-blue' : 'text-gray-700'
                    }`}
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`font-inter font-medium transition-colors hover:text-royal-blue ${
                      isActive(item.path) ? 'text-royal-blue' : 'text-gray-700'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <Link
                to="/register"
                className="bg-royal-blue text-white px-6 py-2 rounded-full font-inter font-medium hover:bg-deep-blue transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Register Now
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;