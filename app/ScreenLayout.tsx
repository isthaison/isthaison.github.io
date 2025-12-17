import React from 'react';

interface ScreenLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function ScreenLayout({ children, title, subtitle }: ScreenLayoutProps) {
  return (
    <div className="flex flex-col h-full gap-4">
      {(title || subtitle) && (
        <header className="flex flex-col items-center gap-2 py-4 px-2">
          {title && <h1 className="text-2xl font-bold m-0 text-gray-800">{title}</h1>}
          {subtitle && <p className="text-base text-gray-600 m-0 font-medium">{subtitle}</p>}
        </header>
      )}
      <div className="flex-1 flex flex-col gap-6 py-2 px-2 items-stretch">{children}</div>
    </div>
  );
}
