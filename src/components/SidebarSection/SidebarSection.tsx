// src/components/SidebarSection/SidebarSection.tsx
import React from 'react';
import { Typography, Divider } from 'antd';
import { SidebarMenuItem, SidebarMenuItemProps } from '../SidebarMenuItem/SidebarMenuItem';
import './SidebarSection.css';

const { Text } = Typography;

export interface MenuItemConfig extends Omit<SidebarMenuItemProps, 'collapsed'> {
  id: string;
}

export interface SidebarSectionProps {
  /** Заголовок секции */
  title?: string;
  /** Элементы меню в секции */
  items: MenuItemConfig[];
  /** Свернутый режим отображения */
  collapsed?: boolean;
  /** Показывать ли разделитель после секции */
  showDivider?: boolean;
  /** Дополнительный CSS класс */
  className?: string;
  /** Обработчик клика по элементу меню */
  onItemClick?: (itemId: string) => void;
}

/**
 * Компонент секции бокового меню
 * Группирует связанные элементы меню под общим заголовком
 */
export const SidebarSection: React.FC<SidebarSectionProps> = ({
  title,
  items,
  collapsed = false,
  showDivider = false,
  className = '',
  onItemClick,
}) => {
  const sectionClass = [
    'sidebar-section',
    collapsed && 'sidebar-section--collapsed',
    className,
  ].filter(Boolean).join(' ');

  const handleItemClick = (itemId: string) => {
    if (onItemClick) {
      onItemClick(itemId);
    }
  };

  return (
    <div className={sectionClass}>
      {title && !collapsed && (
        <div className="sidebar-section__header">
          <Text className="sidebar-section__title">
            {title}
          </Text>
        </div>
      )}
      
      <div className="sidebar-section__items">
        {items.map((item) => (
          <SidebarMenuItem
            key={item.id}
            {...item}
            collapsed={collapsed}
            onClick={() => {
              handleItemClick(item.id);
              if (item.onClick) {
                item.onClick();
              }
            }}
          />
        ))}
      </div>

      {showDivider && !collapsed && (
        <Divider className="sidebar-section__divider" />
      )}
    </div>
  );
};