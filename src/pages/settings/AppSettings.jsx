import { useState, useEffect } from 'react';
import { Button, Select, Alert } from '../../components/ui';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

/**
 * AppSettings Component
 *
 * Application-wide settings like theme, language, etc.
 */
export const AppSettings = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );
  const [dateFormat, setDateFormat] = useState(
    localStorage.getItem('dateFormat') || 'MMM dd, yyyy'
  );
  const [itemsPerPage, setItemsPerPage] = useState(
    localStorage.getItem('itemsPerPage') || '20'
  );

  const handleSaveSettings = () => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('dateFormat', dateFormat);
    localStorage.setItem('itemsPerPage', itemsPerPage);

    toast.success('Settings saved successfully');

    // Apply theme immediately (would need implementation)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System Default' },
  ];

  const dateFormatOptions = [
    { value: 'MMM dd, yyyy', label: 'Jan 15, 2024' },
    { value: 'dd/MM/yyyy', label: '15/01/2024' },
    { value: 'MM/dd/yyyy', label: '01/15/2024' },
    { value: 'yyyy-MM-dd', label: '2024-01-15' },
  ];

  const itemsPerPageOptions = [
    { value: '10', label: '10 items' },
    { value: '20', label: '20 items' },
    { value: '50', label: '50 items' },
    { value: '100', label: '100 items' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
          Application Settings
        </h3>
        <p className="text-sm text-neutral-600">
          Customize how the application looks and behaves for you.
        </p>
      </div>

      {/* Theme Selection */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-900 mb-3">
            Theme
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setTheme('light')}
              className={`${
                theme === 'light'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                  : 'border-neutral-200 text-neutral-700 hover:border-neutral-300'
              } flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-all`}
            >
              <SunIcon className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">Light</span>
            </button>

            <button
              onClick={() => setTheme('dark')}
              className={`${
                theme === 'dark'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                  : 'border-neutral-200 text-neutral-700 hover:border-neutral-300'
              } flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-all`}
            >
              <MoonIcon className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">Dark</span>
            </button>

            <button
              onClick={() => setTheme('system')}
              className={`${
                theme === 'system'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                  : 'border-neutral-200 text-neutral-700 hover:border-neutral-300'
              } flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-all`}
            >
              <ComputerDesktopIcon className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">System</span>
            </button>
          </div>
          <p className="text-xs text-neutral-500 mt-2">
            {theme === 'system'
              ? 'Theme will match your system preferences'
              : `Using ${theme} theme`}
          </p>
        </div>

        <Alert
          variant="info"
          message="Dark mode is currently in development. Light theme will be used by default."
        />
      </div>

      {/* Date Format */}
      <div>
        <Select
          label="Date Format"
          value={dateFormat}
          onChange={(e) => setDateFormat(e.target.value)}
          options={dateFormatOptions}
          helpText="Choose how dates are displayed throughout the application"
        />
      </div>

      {/* Items Per Page */}
      <div>
        <Select
          label="Default Items Per Page"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(e.target.value)}
          options={itemsPerPageOptions}
          helpText="Default number of items to show in lists and tables"
        />
      </div>

      {/* Other Settings */}
      <div className="space-y-3 pt-4 border-t border-neutral-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-900">Compact View</p>
            <p className="text-xs text-neutral-600">Use smaller spacing for lists</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-900">Show Member Photos</p>
            <p className="text-xs text-neutral-600">Display avatars in member lists</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-900">Auto-refresh Data</p>
            <p className="text-xs text-neutral-600">Automatically update member data every 5 minutes</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4 border-t border-neutral-200">
        <Button variant="primary" onClick={handleSaveSettings}>
          Save Settings
        </Button>
      </div>
    </div>
  );
};
