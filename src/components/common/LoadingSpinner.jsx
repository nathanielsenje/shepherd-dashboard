/**
 * LoadingSpinner Component
 *
 * Display a loading spinner with optional text
 *
 * @param {string} size - Spinner size (sm, md, lg, xl)
 * @param {string} text - Optional loading text to display below spinner
 * @param {string} className - Additional CSS classes
 */
export const LoadingSpinner = ({ size = 'md', text = '', className = '' }) => {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
    xl: 'h-16 w-16 border-4',
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-indigo-600 border-t-transparent ${sizes[size]}`}
        role="status"
        aria-label="Loading"
      ></div>
      {text && <p className="mt-2 text-sm text-neutral-600">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
