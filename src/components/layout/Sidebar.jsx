import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Image, Sparkles, BookOpen,
  User, Landmark, Settings, HelpCircle,
  ChevronLeft, ChevronRight,
} from 'lucide-react';
import { navItems, artistProfile } from '../../data/sampleData';
import { LotusLogo, SidebarFloral } from '../ui/DecorativeElements';
import { useLanguage } from '../../i18n';
import { useAuth } from '../../context/AuthContext';

const iconMap = {
  LayoutDashboard, Image, Sparkles, BookOpen,
  User, Landmark, Settings, HelpCircle,
};

function NavItem({ item, isActive, isCollapsed, onClick }) {
  const Icon = iconMap[item.icon] || LayoutDashboard;

  return (
    <button
      onClick={() => onClick(item.route)}
      title={isCollapsed ? item.label : undefined}
      className={`nav-item w-full text-left ${isActive ? 'nav-item-active' : ''}`}
    >
      <Icon
        size={17}
        className={`flex-shrink-0 transition-colors ${isActive ? 'text-terracotta' : 'text-brown/45'}`}
      />
      {!isCollapsed && (
        <span className="truncate text-[13px]">{item.label}</span>
      )}
    </button>
  );
}

function SectionLabel({ label, collapsed }) {
  if (collapsed) return null;
  return (
    <p className="text-[9.5px] font-sans font-semibold tracking-[0.12em] uppercase text-brown/32 px-3 mb-1.5 select-none">
      {label}
    </p>
  );
}

function NavDivider({ collapsed }) {
  if (collapsed) return <div className="my-3" />;
  return (
    <div className="flex items-center gap-1.5 px-3 my-3">
      <div className="flex-1 h-px bg-ochre/25" />
      <div className="w-1 h-1 rounded-full bg-ochre/40" />
      <div className="flex-1 h-px bg-ochre/25" />
    </div>
  );
}

export default function Sidebar({ collapsed, onToggle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { user } = useAuth();
  const displayName = user?.name || artistProfile.name;
  const handleNav = (route) => navigate(route);

  const getNavLabel = (item) => {
    switch (item.id) {
      case 'dashboard':
        return t('nav.dashboard', item.label);
      case 'artwork':
        return t('nav.artwork', item.label);
      case 'artstory':
        return t('nav.artstory', item.label);
      case 'catalogue':
        return t('nav.catalogue', item.label);
      case 'portfolio':
        return t('nav.portfolio', item.label);
      case 'heritage':
        return t('nav.heritage', item.label);
      case 'settings':
        return t('nav.settings', item.label);
      case 'help':
        return t('nav.help', item.label);
      default:
        return item.label;
    }
  };

  return (
    <aside
      className={`
        relative flex flex-col flex-shrink-0 h-full
        bg-beige border-r border-beige-dark/55
        shadow-sidebar transition-all duration-300 ease-in-out
        ${collapsed ? 'w-[4.25rem]' : 'w-56'}
      `}
    >
      {/* ── Logo ── */}
      <div
        className={`flex flex-col items-center border-b border-beige-dark/35 ${
          collapsed ? 'pt-5 pb-4 px-2' : 'pt-6 pb-4 px-4'
        }`}
      >
        <LotusLogo size={collapsed ? 30 : 34} />

        {!collapsed && (
          <div className="mt-2.5 text-center">
            <h1 className="font-serif text-brown font-semibold leading-tight" style={{ fontSize: '0.9rem' }}>
              KalaSetu AI
            </h1>
            <p className="text-brown/42 text-[10px] mt-0.5 font-sans tracking-wide">
              {t('nav.tagline', 'Bridging Art and Technology')}
            </p>
          </div>
        )}

        {/* Decorative rule */}
        {!collapsed && (
          <div className="mt-3.5 flex items-center gap-1.5 w-full px-2">
            <div className="flex-1 h-px bg-ochre/30" />
            <div className="w-1 h-1 rounded-full bg-ochre/50" />
            <div className="flex-1 h-px bg-ochre/30" />
          </div>
        )}
      </div>

      {/* ── Navigation – overflow hidden, no visible scrollbar ── */}
      <nav className="flex-1 overflow-y-auto py-3.5 px-2" style={{ scrollbarWidth: 'none' }}>
        <style>{`nav::-webkit-scrollbar { display: none; }`}</style>

        {/* Workspace */}
        <SectionLabel label={t('nav.workspace', 'WORKSPACE')} collapsed={collapsed} />
        <ul className="space-y-0.5">
          {navItems.workspace.map((item) => (
            <li key={item.id}>
              <NavItem
                item={{ ...item, label: getNavLabel(item) }}
                isActive={location.pathname === item.route}
                isCollapsed={collapsed}
                onClick={handleNav}
              />
            </li>
          ))}
        </ul>

        <NavDivider collapsed={collapsed} />

        {/* Preferences */}
        <SectionLabel label={t('nav.preferences', 'PREFERENCES')} collapsed={collapsed} />
        <ul className="space-y-0.5">
          {navItems.preferences.map((item) => (
            <li key={item.id}>
              <NavItem
                item={{ ...item, label: getNavLabel(item) }}
                isActive={location.pathname === item.route}
                isCollapsed={collapsed}
                onClick={handleNav}
              />
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Artist profile ── */}
      <div
        className={`border-t border-beige-dark/45 ${collapsed ? 'p-2' : 'p-3'}`}
      >
        <button
          onClick={() => handleNav('/profile')}
          className={`
            flex items-center rounded-lg hover:bg-beige-dark/35
            transition-colors duration-200 p-2 w-full
            ${collapsed ? 'justify-center' : 'gap-2.5'}
          `}
        >
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-terracotta/15 border border-terracotta/25 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <svg viewBox="0 0 32 32" className="w-full h-full" fill="none">
              <rect width="32" height="32" fill="#F2E0C8" />
              <circle cx="16" cy="13" r="6" fill="#9D4935" opacity="0.55" />
              <ellipse cx="16" cy="26" rx="10" ry="8" fill="#9D4935" opacity="0.4" />
              {/* Bindi */}
              <circle cx="16" cy="9.5" r="1.4" fill="#D5B77A" opacity="0.75" />
            </svg>
          </div>

          {!collapsed && (
            <>
              <div className="flex-1 text-left min-w-0">
                <p className="text-xs font-sans font-semibold text-brown truncate leading-tight">
                  {displayName}
                </p>
                <p className="text-[10px] text-brown/45 truncate mt-0.5">
                  {t('nav.viewProfile', 'View Profile')}
                </p>
              </div>
              <ChevronRight size={13} className="text-brown/30 flex-shrink-0" />
            </>
          )}
        </button>

        {/* Traditional folk floral accent at bottom */}
        {!collapsed && (
          <div className="pt-2 px-1 pointer-events-none overflow-hidden select-none">
            <SidebarFloral className="w-16 h-16 opacity-75 -ml-1" />
          </div>
        )}
      </div>

      {/* ── Collapse toggle ── */}
      <button
        onClick={onToggle}
        className="
          absolute -right-3 top-1/2 -translate-y-1/2
          w-6 h-6 rounded-full bg-beige-light border border-beige-dark/55
          flex items-center justify-center shadow-card
          hover:bg-ivory hover:border-ochre/40 transition-all duration-200 z-10
        "
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed
          ? <ChevronRight size={11} className="text-brown/55" />
          : <ChevronLeft size={11} className="text-brown/55" />
        }
      </button>
    </aside>
  );
}
