import { Link } from 'react-router-dom'
import { Building2 } from 'lucide-react'
import { FaFacebook, FaInstagram, FaGithub } from 'react-icons/fa6'

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-xl font-extrabold text-white">
              <Building2 className="w-6 h-6 text-primary-400" />
              <span>ResideEase</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Find, book, and move into your dream rental home effortlessly. The smart rental ecosystem designed for tenants, owners, and admins.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Discover
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/properties" className="hover:text-primary-400 transition">
                  All Properties
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-primary-400 transition">
                  Top Locations
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-primary-400 transition">
                  Featured Homes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary-400 transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-primary-400 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-primary-400 transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Contact & Socials
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Have questions? Reach us at info@resideease.com
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition" aria-label="X">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition">
                <FaGithub className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; 2026 ResideEase. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/" className="hover:text-gray-400 transition">Terms</Link>
            <Link to="/" className="hover:text-gray-400 transition">Privacy</Link>
            <Link to="/" className="hover:text-gray-400 transition">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
