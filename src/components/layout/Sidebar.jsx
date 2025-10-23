import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  UsersIcon,
  UserGroupIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon, roles: [] },
  { name: 'Members', href: '/members', icon: UsersIcon, roles: [] },
  { name: 'Unconnected', href: '/members/unconnected', icon: UserGroupIcon, roles: [] },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: ChartBarIcon,
    roles: ['SUPER_ADMIN', 'ADMIN_STAFF']
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Cog6ToothIcon,
    roles: ['SUPER_ADMIN']
  },
];

export const Sidebar = ({ open, setOpen }) => {
  const location = useLocation();
  const { user, hasRole } = useAuth();

  const filteredNavigation = navigation.filter((item) => {
    if (item.roles.length === 0) return true;
    return hasRole(item.roles);
  });

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          open ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-30 w-72 bg-white border-r border-neutral-200 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-20 px-6 border-b border-neutral-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <SparklesIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">Shepherd</h1>
                <p className="text-xs text-neutral-500">Member Management</p>
              </div>
            </div>
          </div>

          {/* Workspaces Section */}
          <div className="px-4 py-4">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider px-3 mb-2">
              Workspaces
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
            {filteredNavigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    isActive
                      ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border-r-3 border-primary'
                      : 'text-neutral-600 hover:bg-neutral-50'
                  } group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200`}
                  onClick={() => setOpen(false)}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      isActive ? 'text-primary' : 'text-neutral-400 group-hover:text-neutral-600'
                    }`}
                    aria-hidden="true"
                  />
                  <span className="flex-1">{item.name}</span>
                  {item.name === 'Unconnected' && (
                    <span className="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-accent/10 text-accent">
                      New
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-neutral-200">
            <div className="flex items-center px-3 py-3 rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100">
              <div className="flex-shrink-0">
                <div className="avatar">
                  <span>
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </span>
                </div>
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-semibold text-neutral-900 truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-neutral-500 truncate">
                  {user?.role?.replace('_', ' ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
