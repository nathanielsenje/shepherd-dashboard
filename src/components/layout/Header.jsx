import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  BellIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  KeyIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Header = ({ setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="bg-white border-b border-neutral-200 z-10 sticky top-0">
      <div className="flex items-center justify-between h-20 px-6">
        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden p-2 rounded-xl text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          onClick={() => setSidebarOpen(true)}
        >
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Search bar */}
        <div className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search for member or candidate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Right side items */}
        <div className="flex items-center space-x-3">
          {/* Date */}
          <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-neutral-50 rounded-xl">
            <CalendarIcon className="h-5 w-5 text-neutral-400" />
            <span className="text-sm text-neutral-600 font-medium">{currentDate}</span>
          </div>

          {/* Create button */}
          <button
            onClick={() => navigate('/members/new')}
            className="hidden md:block btn-primary"
          >
            Create
          </button>

          {/* Notifications */}
          <button
            type="button"
            className="relative p-2.5 rounded-xl text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <BellIcon className="h-6 w-6" aria-hidden="true" />
            <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-accent"></span>
          </button>

          {/* User menu */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-3 p-2 rounded-xl hover:bg-neutral-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20">
              <div className="avatar">
                <span>
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-neutral-900">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-neutral-500">{user?.role?.replace('_', ' ')}</p>
              </div>
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-neutral-200 focus:outline-none overflow-hidden">
                <div className="px-4 py-3 bg-gradient-to-br from-neutral-50 to-white border-b border-neutral-200">
                  <p className="text-sm font-semibold text-neutral-900">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-neutral-500 mt-0.5">{user?.email}</p>
                </div>

                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => navigate('/profile')}
                        className={`${
                          active ? 'bg-neutral-50' : ''
                        } flex w-full items-center px-4 py-2.5 text-sm text-neutral-700 transition-colors`}
                      >
                        <UserCircleIcon className="mr-3 h-5 w-5 text-neutral-400" />
                        Your Profile
                      </button>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => navigate('/change-password')}
                        className={`${
                          active ? 'bg-neutral-50' : ''
                        } flex w-full items-center px-4 py-2.5 text-sm text-neutral-700 transition-colors`}
                      >
                        <KeyIcon className="mr-3 h-5 w-5 text-neutral-400" />
                        Change Password
                      </button>
                    )}
                  </Menu.Item>
                </div>

                <div className="border-t border-neutral-200">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`${
                          active ? 'bg-red-50' : ''
                        } flex w-full items-center px-4 py-2.5 text-sm text-red-600 transition-colors`}
                      >
                        <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5" />
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </header>
  );
};
