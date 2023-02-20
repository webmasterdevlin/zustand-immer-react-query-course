import React from 'react';

type Props = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export default function Card({ children, ...rest }: Props) {
  return (
    <div
      className={'mb-4 rounded bg-slate-800 px-8 pt-6 pb-8 text-white shadow-md dark:bg-gray-100 dark:text-slate-900'}
      {...rest}
    >
      {children}
    </div>
  );
}
