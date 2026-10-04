import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, User, Building2, Menu, X, LogIn } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';
import { StatusIndicator } from '../ui/StatusIndicator';
import { cn } from '../../lib/utils';

export const Navbar: React.FC = () => {
  const { user, role, setRole, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isPatientRoute = location.pathname.startsWith('/patient');
  const isHospitalRoute = location.pathname.startsWith('/hospital');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E8E2D5] bg-[#F8F5EF]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* MEDIQ Brand Logo */}
          <Link to={ROUTES.HOME} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-[#2B4C3F] flex items-center justify-center text-[#F8F5EF] shadow-sm group-hover:bg-[#1E372D] transition-colors">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-[#252525]">MEDIQ</span>
                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-[#EAF2EC] text-[#2A543B] border border-[#C8DDD0]">
                  Crowd Intel
                </span>
              </div>
              <p className="text-[11px] text-[#5C5852] font-medium tracking-wide">Hospital Crowd Intelligence</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#EFEBE1]/80 p-1.5 rounded-2xl border border-[#E8E2D5]">
            <Link
              to={ROUTES.HOME}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-semibold transition-all',
                location.pathname === '/' ? 'text-[#252525] bg-white shadow-sm' : 'text-[#5C5852] hover:text-[#252525]'
              )}
            >
              Overview
            </Link>
            <Link
              to={ROUTES.PATIENT.DASHBOARD}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5',
                isPatientRoute ? 'text-[#2B4C3F] bg-white shadow-sm' : 'text-[#5C5852] hover:text-[#252525]'
              )}
            >
              <User className="w-3.5 h-3.5 text-[#6F9F82]" />
              Patient Portal
            </Link>
            <Link
              to={ROUTES.HOSPITAL.DASHBOARD}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5',
                isHospitalRoute ? 'text-[#45376B] bg-white shadow-sm' : 'text-[#5C5852] hover:text-[#252525]'
              )}
            >
              <Building2 className="w-3.5 h-3.5 text-[#8574B3]" />
              Hospital Desk
            </Link>
          </nav>

          {/* Right Action Controls & Status */}
          <div className="hidden md:flex items-center gap-3">
            <StatusIndicator />

            {/* Role Toggle Switcher */}
            <div className="flex items-center bg-[#EFEBE1] border border-[#E8E2D5] rounded-xl p-1 text-xs">
              <button
                onClick={() => setRole('patient')}
                className={cn(
                  'px-2.5 py-1 rounded-lg font-semibold transition-all',
                  role === 'patient' ? 'bg-[#2B4C3F] text-white shadow-sm' : 'text-[#5C5852] hover:text-[#252525]'
                )}
              >
                Patient
              </button>
              <button
                onClick={() => setRole('hospital')}
                className={cn(
                  'px-2.5 py-1 rounded-lg font-semibold transition-all',
                  role === 'hospital' ? 'bg-[#8574B3] text-white shadow-sm' : 'text-[#5C5852] hover:text-[#252525]'
                )}
              >
                Hospital Staff
              </button>
            </div>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link to={role === 'patient' ? ROUTES.PATIENT.DASHBOARD : ROUTES.HOSPITAL.DASHBOARD}>
                  <Button variant="outline" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to={ROUTES.LOGIN}>
                  <Button variant="ghost" size="sm" leftIcon={<LogIn className="w-4 h-4" />}>
                    Log In
                  </Button>
                </Link>
                <Link to={ROUTES.SIGNUP}>
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <StatusIndicator />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-[#252525] bg-white border border-[#E8E2D5]"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-[#E8E2D5] bg-[#F8F5EF] p-4 space-y-4">
          <nav className="flex flex-col space-y-2">
            <Link
              to={ROUTES.HOME}
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[#252525] hover:bg-[#EFEBE1]"
            >
              Overview Landing
            </Link>
            <Link
              to={ROUTES.PATIENT.DASHBOARD}
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[#252525] hover:bg-[#EFEBE1] flex items-center gap-2"
            >
              <User className="w-4 h-4 text-[#4A7C59]" />
              Patient Portal
            </Link>
            <Link
              to={ROUTES.HOSPITAL.DASHBOARD}
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[#252525] hover:bg-[#EFEBE1] flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-[#8574B3]" />
              Hospital Staff Desk
            </Link>
          </nav>
          <div className="pt-2 border-t border-[#E8E2D5] flex flex-col gap-2">
            <div className="flex items-center justify-between bg-[#EFEBE1] p-2 rounded-xl text-xs">
              <span className="text-[#5C5852] font-medium">Demo Role:</span>
              <div className="flex gap-1">
                <button
                  onClick={() => {
                    setRole('patient');
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    'px-2.5 py-1 rounded-lg text-xs font-bold',
                    role === 'patient' ? 'bg-[#2B4C3F] text-white' : 'text-[#5C5852]'
                  )}
                >
                  Patient
                </button>
                <button
                  onClick={() => {
                    setRole('hospital');
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    'px-2.5 py-1 rounded-lg text-xs font-bold',
                    role === 'hospital' ? 'bg-[#8574B3] text-white' : 'text-[#5C5852]'
                  )}
                >
                  Staff
                </button>
              </div>
            </div>
            <Link to={ROUTES.LOGIN} onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
