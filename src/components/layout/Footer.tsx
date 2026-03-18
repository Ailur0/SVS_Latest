import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Quality', path: '/quality' },
    { name: 'Customization', path: '/customization' },
    { name: 'Contact', path: '/contact' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms & Conditions', path: '/terms' },
  ];

  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">
              SVS Polymer Industries
            </h3>
            <p className="text-sm opacity-90 mb-4">
              Manufacturer of rigid plastic packaging for paint, food grade, and lubricant sectors.
              Trusted by 200+ customers across India with consistent quality and on-time delivery.
            </p>
            <ul className="space-y-2 mt-4">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm opacity-75 hover:opacity-100 transition-opacity"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm opacity-90 hover:opacity-100 transition-opacity"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">
              Contact
            </h3>
            <div className="space-y-3">
              <a
                href="tel:+919652696819"
                className="flex items-center gap-2 text-sm opacity-90 hover:opacity-100 transition-opacity"
              >
                <Phone className="h-4 w-4 flex-shrink-0" />
                +91 96526 96819
              </a>
              <a
                href="mailto:svspolymerinds@gmail.com"
                className="flex items-center gap-2 text-sm opacity-90 hover:opacity-100 transition-opacity break-all"
              >
                <Mail className="h-4 w-4 flex-shrink-0" />
                svspolymerinds@gmail.com
              </a>
              <div className="flex items-start gap-2 text-sm opacity-90">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  Plot No. 156 &amp; 157, Navodaya Society I.E.<br />
                  Phase-V, IDA, Cherlapally<br />
                  Hyderabad – 500 051
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-accent-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm opacity-90">
            © {currentYear} SVS Polymer Industries. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
