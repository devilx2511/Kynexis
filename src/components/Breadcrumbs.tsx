import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  tabId?: string;
  onClick?: () => void;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigateHome: () => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigateHome }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 my-2"
    >
      <ol
        className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 font-medium"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {/* Home Item */}
        <li
          className="flex items-center gap-1"
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1 hover:text-[#D4AF37] transition-colors focus:outline-none focus:ring-1 focus:ring-[#D4AF37] rounded px-1 py-0.5"
            itemProp="item"
          >
            <Home className="w-3.5 h-3.5 text-slate-400" />
            <span itemProp="name">Home</span>
          </button>
          <meta itemProp="position" content="1" />
        </li>

        {/* Dynamic Trail Items */}
        {items.map((item, index) => {
          const position = index + 2;
          const isLast = index === items.length - 1;

          return (
            <li
              key={item.name + index}
              className="flex items-center gap-1.5"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />

              {isLast || !item.onClick ? (
                <span
                  className="text-[#112233] font-semibold px-1 py-0.5 truncate max-w-xs"
                  aria-current="page"
                  itemProp="name"
                >
                  {item.name}
                </span>
              ) : (
                <button
                  onClick={item.onClick}
                  className="hover:text-[#D4AF37] transition-colors focus:outline-none focus:ring-1 focus:ring-[#D4AF37] rounded px-1 py-0.5 truncate max-w-xs"
                  itemProp="item"
                >
                  <span itemProp="name">{item.name}</span>
                </button>
              )}
              <meta itemProp="position" content={String(position)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
