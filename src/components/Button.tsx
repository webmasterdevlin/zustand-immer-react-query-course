import clsx from 'clsx';
import React from 'react';

type Props = {
  children: React.ReactNode;
  color?: 'default' | 'primary' | 'secondary';
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

/* creating a shareable button component is better than using @apply of
TailwindCSS because it will be easier to maintain and add new styles */

export default function Button({ disabled, color = 'default', ...rest }: Props) {
  const defaultClasses = 'mr-2 mb-2 rounded-lg px-5 py-2.5 text-center text-sm font-medium capitalize';
  let colorClasses = '';

  switch (color) {
    case 'default':
      colorClasses = `text-black ${disabled ? 'text-gray-400' : ''}`;
      break;
    case 'primary':
      colorClasses = `bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:text-gray-300 dark:shadow-lg dark:shadow-blue-800/80 dark:focus:ring-blue-800  ${
        disabled ? 'text-gray-400' : ''
      }`;
      break;
    case 'secondary':
      colorClasses = `bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/50 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-purple-300 disabled:text-gray-300 dark:shadow-lg dark:shadow-purple-800/80 dark:focus:ring-purple-800  ${
        disabled ? 'text-gray-400' : ''
      }`;
      break;
  }

  const className = clsx(defaultClasses, colorClasses, '', '');

  return (
    <button className={className} {...rest}>
      {rest.children}
    </button>
  );
}
