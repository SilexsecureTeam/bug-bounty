import { Link } from "react-router-dom";
import Defcomm from "../assets/images/Defcomm-04 2.svg";

export default function Navbar() {
  const navItems = [
    { name: 'Home', to: '/', special: true },
    { name: 'Programme', href: '#hero' },
    { name: 'Highlights', href: '#highlights' },
  { name: 'Sponsors', href: '#sponsors' },
  { name: 'Contact', href: '#contact' },
    { name: 'Registration', to: '/register' }
  ];

  return (
    <nav 
      className="w-full top-0 fixed left-0 z-50"
      style={{
        background: 'linear-gradient(to right, #36460A, #85AB20, #36450D)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="shrink-0">
            <img src={Defcomm} alt="Logo" className="h-8" />
          </div>

          {/* Navigation */}
          <div className="flex items-center">
            <div className="flex space-x-4">
              {navItems.map((item) => (
                item.to ? (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="text-slate-100 hover:bg-[#85AB20] text-sm font-medium transition-all duration-200"
                    style={{
                      padding: '8px 12px',
                      borderRadius: item.special ? '20px' : '6px',
                      ...(item.special && {
                        border: '1px solid white',
                      })
                    }}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-slate-100 hover:bg-[#85AB20] px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                  >
                    {item.name}
                  </a>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}