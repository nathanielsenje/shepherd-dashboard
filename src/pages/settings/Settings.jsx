import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, Alert } from '../../components/ui';
import {
  Cog6ToothIcon,
  PaintBrushIcon,
  UsersIcon,
  BellIcon,
} from '@heroicons/react/24/outline';
import { AppSettings } from './AppSettings';
import { SystemUsers } from './SystemUsers';

/**
 * Settings Component
 *
 * Main settings page with tabbed interface
 */
export const Settings = () => {
  const { user, hasRole } = useAuth();
  const [activeTab, setActiveTab] = useState('app');

  const tabs = [
    {
      id: 'app',
      name: 'App Settings',
      icon: PaintBrushIcon,
      roles: [],
    },
    {
      id: 'notifications',
      name: 'Notifications',
      icon: BellIcon,
      roles: [],
    },
    {
      id: 'users',
      name: 'System Users',
      icon: UsersIcon,
      roles: ['SUPER_ADMIN'],
    },
  ];

  // Filter tabs based on user role
  const visibleTabs = tabs.filter((tab) => {
    if (tab.roles.length === 0) return true;
    return hasRole(tab.roles);
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Settings</h1>
        <p className="text-sm text-neutral-600 mt-1">
          Manage your application preferences and system configuration
        </p>
      </div>

      {/* Tabs */}
      <Card padding={false}>
        <div className="border-b border-neutral-200">
          <nav className="flex space-x-4 px-6" aria-label="Settings tabs">
            {visibleTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    isActive
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
                  } flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                >
                  <Icon className="h-5 w-5" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'app' && <AppSettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'users' && <SystemUsers />}
        </div>
      </Card>
    </div>
  );
};

/**
 * NotificationSettings Component
 *
 * Placeholder for notification settings
 */
const NotificationSettings = () => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
          Notification Preferences
        </h3>
        <p className="text-sm text-neutral-600">
          Configure how you receive notifications about member updates and system events.
        </p>
      </div>

      <Alert
        variant="info"
        message="Notification settings will be available in a future update."
      />

      <div className="space-y-4 mt-6">
        <div className="flex items-center justify-between py-3 border-b border-neutral-200">
          <div>
            <p className="text-sm font-medium text-neutral-900">Email Notifications</p>
            <p className="text-xs text-neutral-600">Receive updates via email</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" disabled />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-neutral-200">
          <div>
            <p className="text-sm font-medium text-neutral-900">New Member Alerts</p>
            <p className="text-xs text-neutral-600">Get notified when new members join</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" disabled />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-3">
          <div>
            <p className="text-sm font-medium text-neutral-900">Weekly Reports</p>
            <p className="text-xs text-neutral-600">Receive weekly summary emails</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" disabled />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
};
