import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  HomeIcon,
  UsersIcon,
  UserGroupIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import { membersAPI } from '../../api/members';
import { Badge, Avatar } from '../ui';
import logoIcon from '../../assets/icon.png';
import logoFull from '../../assets/logo.png';

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

  // Fetch unconnected members count
  const { data: unconnectedData } = useQuery({
    queryKey: ['unconnected-count'],
    queryFn: () => membersAPI.getUnconnected(),
  });

  const unconnectedCount = unconnectedData?.count || 0;

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
        } fixed inset-y-0 left-0 z-30 w-60 bg-neutral-50 border-r border-neutral-200 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center h-16 px-4 border-b border-neutral-200 bg-white">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logoIcon} alt="Shepherd Logo" className="w-7 h-7 rounded-lg" />
              <div>
                <h1 className="text-base font-bold text-neutral-900">Shepherd</h1>
              </div>
            </Link>
          </div>

          {/* Workspaces Section */}
          <div className="px-3 pt-3 pb-1">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider px-2">
              Workspaces
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto py-2">
            {filteredNavigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    isActive
                      ? 'bg-white text-primary font-medium shadow-sm border border-neutral-200'
                      : 'text-neutral-600 hover:bg-white hover:text-neutral-900'
                  } group flex items-center px-3 py-2 text-xs rounded-lg transition-all duration-150`}
                  onClick={() => setOpen(false)}
                >
                  <item.icon
                    className={`mr-2.5 h-4 w-4 flex-shrink-0 ${
                      isActive ? 'text-primary' : 'text-neutral-400 group-hover:text-neutral-600'
                    }`}
                    aria-hidden="true"
                  />
                  <span className="flex-1">{item.name}</span>
                  {item.name === 'Unconnected' && unconnectedCount > 0 && (
                    <Badge variant="danger" size="sm" className="ml-1">
                      {unconnectedCount}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User info */}
          <div className="p-3 border-t border-neutral-200 bg-white">
            <div className="flex items-center px-2 py-2 rounded-lg">
              <Avatar
                name={`${user?.firstName || ''} ${user?.lastName || ''}`}
                size="sm"
                className="flex-shrink-0"
              />
              <div className="ml-2 flex-1 min-w-0">
                <p className="text-xs font-semibold text-neutral-900 truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-neutral-500 truncate uppercase">
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
